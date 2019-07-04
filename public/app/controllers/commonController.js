socialmedia.controller('registrationController', ['$scope', '$state', 'mainService', function($scope, $state, mainService) {
    var isErrorHidden = true;
    $scope.hideError = function(){
        var emailError = document.getElementById('email-error');
        var emailBox = document.getElementById('email');
        if(!isErrorHidden){
            emailBox.value = '';
        }
        emailError.style.display = "none";
        isErrorHidden = true;
    }
    $scope.saveRegistration = function(registrationData) {
        //console.log('from ctrl', registrationData);
        registrationData.email = registrationData.email.toLowerCase();
        mainService.saveRegistration(registrationData)
        .then(function(response) {
            console.log('response-from-server',response); //Response(error codes) from the server for db operations
            if(response.error!=11000){
                $state.go('home');
            }
            else{
                isErrorHidden = false;
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