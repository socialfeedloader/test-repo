(function() {
    'use strict';

    socialmedia.factory('commonService', Service)

    function Service($http, $q) {
        var service = {};
        service.savePassword = savePassword;

        return service;

        function savePassword(data) {
            console.log('from-common-service', data);
            return $http.post('/savePassword', data).then(handleSuccess, handleError);
        }
        function handleSuccess(res) {
            return res.data;
        }
        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();