(function () {
  "use strict";

  angular.module("app").component("home", {
    templateUrl: "app/components/home/home.template.html",
    controller: function (apiService) {
      const vm = this;
      vm.loading = false;
      vm.tasks = [];
      vm.showAdd = false;
      vm.newTitle = "";
      vm.error = null;

      vm.$onInit = function () {
        vm.fetch();
      };

      vm.fetch = function () {
        vm.loading = true;
        apiService
          .list()
          .then((data) => {
            vm.tasks = data;
          })
          .catch(setError)
          .finally(() => (vm.loading = false));
      };

      vm.toggle = function (t) {
        apiService
          .update(t.id, { completed: !t.completed })
          .then((updated) => {
            t.completed = updated.completed;
          })
          .catch(setError);
      };

      vm.delete = function (t) {
        if (!confirm("Delete task?")) return;
        apiService
          .remove(t.id)
          .then(() => {
            vm.tasks = vm.tasks.filter((x) => x.id !== t.id);
          })
          .catch(setError);
      };

      vm.openAdd = () => {
        vm.newTitle = "";
        vm.showAdd = true;
        vm.error = null;
      };

      vm.create = function () {
        if (!vm.newTitle.trim()) return;
        apiService
          .create(vm.newTitle.trim())
          .then((task) => {
            vm.tasks.push(task);
            vm.showAdd = false;
            vm.newTitle = "";
          })
          .catch(setError);
      };

      function setError(e) {
        vm.error = (e && e.data && e.data.message) || e.message || "Error";
      }
    },
  });
})();
