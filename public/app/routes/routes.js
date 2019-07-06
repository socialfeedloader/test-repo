socialmedia.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/partials/home.html',
            //controller: 'loginController'
        })
        .state('dashboard', {
            url: '/dashboard',
            template: '<h3>DASHBOARD</h3>'
        })
        .state('register', {
            url: '/registration',
            templateUrl: '/partials/registration.html',
            controller: 'registrationController'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/partials/login.html',
            controller: 'loginController',
            resolve: {
                userBeforeLogin: userBeforeLogin
            }
        })
        .state('forgotpass', {
            url: '/reset_password',
            templateUrl: '/partials/forgot_password.html'
        })
        .state('create-user-password', {
            url: '/create-user-password/:token',
            templateUrl: '/partials/create_user_password.html',
            controller: 'createPasswordController',
            resolve: {
                checkCreateUserPassword: checkCreateUserPassword
            }
        })
}]);


function checkCreateUserPassword($q, $http, $stateParams) {
    var deferred = $q.defer($http, $q, $stateParams);
    $http({
        method: 'get',
        url: '/create-user-password/?token=' + $stateParams.token
    }).then(function successCallback(response) {
        if (response.data.result) {
            console.log(response.data.result);
            deferred.resolve(response.data);
        } else {
            console.log(response.data);
            deferred.reject({ tokenExpired: true });
        }
    }, function errorCallback(error) {
        console.log(error);
        deferred.reject({ tokenExpired: true });
    });
    return deferred.promise;
}

function userBeforeLogin($q, userAuth, $state) {
    var deferred = $q.defer($q, userAuth);
    var currentUser = userAuth.getCurrentUser();
    access_token = currentUser ? currentUser.access_token : null;
    console.log("access-token:", access_token);
    if (access_token) {
        deferred.reject({ session: true, role: 'admin' });
        //$toaster.pop('error','login error','user already logged in');
        $state.go('register');
    } else {
        deferred.resolve();
    }
    return deferred.promise;
}