(function() {
    'use strict';

    socialmedia.factory('mainService', Service)

    function Service($http, $q) {
        var service = {};
        service.saveRegistration = saveRegistration;
        service.login = login;

        return service;

        function saveRegistration(data) {
            console.log('from service', data);
            return $http.post('/saveRegistration', data).then(handleSuccess, handleError);
        }

        function login(data) {
            return $http.post('/login', data).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }
        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();