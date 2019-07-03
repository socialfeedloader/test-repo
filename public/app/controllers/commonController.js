socialmedia.controller('registrationController', ['$scope', '$state', 'mainService', function($scope, $state, mainService) {

    $scope.saveRegistration = function(registrationData) {
        console.log('hello');
        console.log(registrationData);
        // mainService.saveRegistration(registrationData)
        //     .then(function(response) {
        //         $state.go('home');

        //     })
        //     .catch(function(error) {

        //     })
    }

}])


socialmedia.controller('mainController', ['$scope', 'getUserList', 'mainService', function($scope, getUserList) {
    $scope.userList = getUserList.data.result;
    console.log(getUserList);
}])