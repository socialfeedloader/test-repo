socialmedia.controller('registrationController', ['$scope', '$state', 'toaster', 'mainService', function($scope, $state, toaster, mainService) {
    var isErrorHidden = true;
    $scope.hideError = function() {
        var emailError = document.getElementById('email-error');
        var emailBox = document.getElementById('email');
        if (!isErrorHidden) {
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
                console.log('response-from-server', response); //Response(error codes) from the server for db operations
                if (response.error != 11000) {
                    toaster.pop('success', "user created", "Check you email");
                    //$state.go('login');
                } else {
                    isErrorHidden = false;
                    var emailError = document.getElementById('email-error');
                    emailError.style.display = "block";
                    toaster.pop('error', "error", "Enter another email");
                }
            })
            .catch(function(error) {})
    }
}])

socialmedia.controller('createPasswordController', ['$state', '$scope', 'toaster', '$stateParams', 'commonService', function($state, $scope, toaster, $stateParams, commonService) {
    $scope.createPassword = function(data) {
        //console.log('userPassword:',data.password);
        //console.log('userConfirmPassword:',data.confirmPassword);
        console.log('passord:', $stateParams);
        if (data.password == data.confirmPassword) {
            data.token = $stateParams.token;
            commonService.savePassword(data)
                .then(function(response) {
                    toaster.pop('success', 'password saved successfully', 'Now you could login');
                    $state.go('login');
                    //console.log('password saved:', response);
                })
                .catch(function(error) {
                    toaster.pop('error', 'password was not saved', 'Please register again');
                    //console.log('password does not match:', error);
                });
        } else {
            toaster.pop('error', 'password does not match', 'Please enter matching password');
            console.log('password does not match');
        }
    }
}])

socialmedia.controller('loginController', ['$state', '$scope', 'mainService', 'toaster', 'userAuth', function($state, $scope, mainService, toaster, userAuth) {
    $scope.login = function(data) {
        mainService.login(data)
            .then(function(response) {
                console.log(response);
                toaster.pop('success', 'logged in', 'As ' + response.username);
                var user = {};
                user.access_token = response.token;
                userAuth.setCurrentUser(user);
                $state.go('dashboard.home');
            })
            .catch(function(error) {
                console.log('login-error', error);
                toaster.pop('error', 'login error', error.message);
            });
    }
}])

socialmedia.controller('mainController', ['$scope', 'getUserList', 'mainService', function($scope, getUserList) {
    $scope.userList = getUserList.data.result;
    console.log(getUserList);
}])