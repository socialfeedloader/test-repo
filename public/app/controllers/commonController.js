socialmedia.controller('registrationController', ['$scope', '$state', 'mainService', function($scope, $state, mainService) {

    $scope.saveRegistration = function(registrationData) {
        console.log('from ctrl', registrationData);
        mainService.saveRegistration(registrationData)
        .then(function(response) {
            console.log('response-from-server',response);
            $state.go('home');
        })
        .catch(function(error) {
        })
    }

}])

socialmedia.controller('mainController', ['$scope', 'getUserList', 'mainService', function($scope, getUserList) {
    $scope.userList = getUserList.data.result;
    console.log(getUserList);
}])