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
                toaster.pop('success', 'logged in', 'logged in as ' + response.username);
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

socialmedia.controller('alreadyloggedin', ['$state', '$scope','userAuth','toaster',function($state, $scope, userAuth, toaster){
    // $scope.logout = function(){
    //     console.log('logging out');
    //     userAuth.setCurrentUser(null);
    //     toaster.pop('success','logged out', 'user logged out');
    //     $state.go('login');
    // }
    // $scope.gotoDashboard = function(){
    //     console.log('dashboard');
    //     $state.go('dashboard.home');
    // }
    $state.go('dashboard.home');
}])


socialmedia.controller('changePasswordController',['toaster', '$state', '$scope', '$http', 'commonService', 'userAuth', function(toaster, $state, $scope,  $http, commonService, userAuth){
    $scope.changePassword = function (data) {
        var user = userAuth.getCurrentUser('feedback');
        data.token = user.access_token;
        console.log('client-access-token:',data.token);
        if (data.password == data.confirmpassword) {
            //data.token = $stateParams.token;
            commonService.changePassword(data)
            // UserService.changePassword(passwords.newPassword)
            .then(function(response) {
                toaster.pop('success','password saved','new password saved successfully');
            //  $scope.passwords = {};
            })
            .catch(function(error) {
                toaster.pop('error','password was not saved','new password was not saved');
            });
        } else {
            toaster.pop('error','password mismatch','password does not match');
            //data.confirmPassword = data.password;
        }
    }
}])

socialmedia.controller('dashboardController', ['$state', '$scope','userAuth','toaster',function($state, $scope, userAuth, toaster){
    $scope.logout = function(){
        console.log('logging out');
        userAuth.setCurrentUser(null);
        toaster.pop('success','logged out', 'user logged out');
        $state.go('login');
    }
}])

socialmedia.controller('mainController', ['$scope', 'getUserList', 'mainService', function($scope, getUserList) {
    $scope.userList = getUserList.data.result;
    console.log(getUserList);
}])