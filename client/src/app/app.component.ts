import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from './task.service';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';

type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    TagModule,
    TooltipModule,
    SkeletonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private api = inject(TaskService);

  // data
  tasks = signal<Task[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // ui state
  showAdd = signal(false);
  newTitle = '';
  creating = false;
  darkMode = signal(false);

  // filter + sort
  filterTerm = signal('');
  sortField = signal<keyof Task>('id');
  sortDir = signal<SortDir>('asc');

  // derived
  filtered = computed(() => {
    const term = this.filterTerm().trim().toLowerCase();
    if (!term) return this.tasks();
    return this.tasks().filter((t) => t.title.toLowerCase().includes(term));
  });

  sortedFiltered = computed(() => {
    const list = [...this.filtered()];
    const field = this.sortField();
    const dir = this.sortDir();
    list.sort((a: any, b: any) => {
      const av = a[field];
      const bv = b[field];
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (dir === 'asc' ? 1 : -1);
    });
    return list;
  });

  totalCount = computed(() => this.tasks().length);
  completedCount = computed(
    () => this.tasks().filter((t) => t.completed).length
  );
  completionPct = computed(() =>
    this.totalCount() === 0
      ? 0
      : Math.round((this.completedCount() / this.totalCount()) * 100)
  );

  ngOnInit() {
    // preference load
    const stored = localStorage.getItem('mt_dark');
    if (stored !== null) {
      this.darkMode.set(stored === '1');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode.set(true);
    }
    this.load();
    // persist
    effect(() => {
      localStorage.setItem('mt_dark', this.darkMode() ? '1' : '0');
    });
  }

  toggleDark() {
    this.darkMode.update((v) => !v);
  }

  setSort(field: keyof Task) {
    if (this.sortField() === field) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortField.set(field);
      this.sortDir.set('asc');
    }
  }

  sortIcon(field: keyof Task) {
    if (this.sortField() !== field) return 'pi pi-sort-alt';
    return this.sortDir() === 'asc'
      ? 'pi pi-sort-amount-up-alt'
      : 'pi pi-sort-amount-down';
  }

  load() {
    this.error.set(null);
    this.loading.set(true);
    this.api.list().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e.message || 'Failed to load tasks');
        this.loading.set(false);
      },
    });
  }

  openAdd() {
    this.newTitle = '';
    this.creating = false;
    this.showAdd.set(true);
  }

  create() {
    if (this.creating) return;
    const title = this.newTitle.trim();
    if (!title) return;
    this.creating = true;
    this.api.create(title).subscribe({
      next: (task) => {
        this.tasks.update((a) => [...a, task]);
        this.showAdd.set(false);
        this.creating = false;
        this.newTitle = '';
      },
      error: (e) => {
        this.error.set(e.message || 'Create failed');
        this.creating = false;
      },
    });
  }

  toggle(task: Task) {
    this.api.update(task.id, { completed: !task.completed }).subscribe({
      next: (updated) =>
        this.tasks.update((a) =>
          a.map((t) => (t.id === updated.id ? updated : t))
        ),
      error: (e) => this.error.set(e.message || 'Update failed'),
    });
  }

  remove(task: Task) {
    this.api.remove(task.id).subscribe({
      next: () => this.tasks.update((a) => a.filter((t) => t.id !== task.id)),
      error: (e) => this.error.set(e.message || 'Delete failed'),
    });
  }

  clearFilter() {
    this.filterTerm.set('');
  }
}
