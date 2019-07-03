socialmedia.controller('registrationController', ['$scope', '$state', 'mainService', function($scope, $state, mainService) {
    $scope.hideError = function(){
        var emailError = document.getElementById('email-error');
        emailError.style.display = "none";
    }
    $scope.saveRegistration = function(registrationData) {
        //console.log('from ctrl', registrationData);
        mainService.saveRegistration(registrationData)
        .then(function(response) {
            console.log('response-from-server',response); //Response(error codes) from the server for db operations
            if(response.error!=11000){
                $state.go('home');
            }
            else{
                var emailError = document.getElementById('email-error');
                emailError.style.display = "block";
            }
        })
        .catch(function(error) {
        })
    }

}])

socialmedia.controller('mainController', ['$scope', 'getUserList', 'mainService', function($scope, getUserList) {
    $scope.userList = getUserList.data.result;
    console.log(getUserList);
}])