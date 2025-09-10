Hai! Kami ingin tes ini dari Anda.
Anda dapat menggunakan alat apa pun (termasuk AI) dalam pengkodean.

Tugas pengujian: "Pelacak Tugas Mini"

Tujuan: Membuat aplikasi satu halaman sederhana (SPA) untuk mengelola daftar tugas. Tugas harus disimpan di server dan menampilkan data di klien menggunakan tabel PrimeNG.

Bagian 1: Backend (Node.js + Express) (~60-70 menit)
Tugas:

1. Membuat aplikasi Express sederhana.

2. Menjalankan server HTTP.

REST API untuk tugas (CRUD):

1. GET /api/tasks - mengembalikan array berisi semua tugas.

2. POST /api/tasks - membuat tugas baru. Isi permintaan: { "title": string, "completed": boolean }. Server harus menghasilkan ID unik (Anda dapat menggunakan uuid atau int).

3. PATCH /api/tasks/:id - memperbarui tugas (misalnya, menandai sebagai selesai). Isi permintaan mungkin berisi beberapa kolom ({ "completed": true }).

4. DELETE /api/tasks/:id - menghapus tugas.

Bagian 2: Frontend (Angular) (~50-60 menit)
Tugas:

1. Implementasikan tabel menggunakan PrimeNG dengan kolom (ID Tugas, Judul, Status)

2. Implementasikan kotak centang di tabel: ketika ditekan, tugas ditandai sebagai selesai (Permintaan dikirim ke backend), ketika tidak ditekan, tugas ditandai sebagai belum selesai (Permintaan dikirim ke backend)

3. Implementasikan tombol ikon "Hapus" di tabel: ketika ditekan, permintaan dikirim ke backend dan entri dihapus dari tabel

4. Implementasikan jendela modal "Tambah tugas": memiliki satu kolom "Judul" dan tombol "Buat" - ketika ditekan, permintaan dikirim ke backend untuk dibuat, tugas baru akan muncul di tabel

Anda tidak perlu terlalu repot dengan desainnya
Gunakan PrimeNG dengan cara yang sama
