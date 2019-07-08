(function() {
    'use strict';

    socialmedia.factory('commonService', Service)

    function Service($http, $q) {
        var service = {};
        service.savePassword = savePassword;
        service.changePassword = changePassword;

        return service;

        function savePassword(data) {
            return $http.post('/savePassword', data).then(handleSuccess, handleError);
        }
        function changePassword(data){
            return $http.post('/adminApi/changePassword', data).then(handleSuccess, handleError);
        }
        function handleSuccess(res) {
            return res.data;
        }
        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();