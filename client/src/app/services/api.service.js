(function () {
  "use strict";

  angular.module("app").factory("apiService", function ($http) {
    const BASE = "http://localhost:3000/api/task";
    console.log("Using API BASE:", BASE);

    function list() {
      return $http.get(BASE).then((r) => r.data);
    }
    function create(title) {
      return $http.post(BASE, { title, completed: false }).then((r) => r.data);
    }
    function update(id, payload) {
      return $http.patch(`${BASE}/${id}`, payload).then((r) => r.data);
    }
    function remove(id) {
      return $http.delete(`${BASE}/${id}`).then((r) => r.data);
    }

    return { list, create, update, remove };
  });

  fetch("http://localhost:3000/api/task")
    .then((r) => [r.status, r.url, r.headers.get("content-type")])
    .then(console.log);
})();
