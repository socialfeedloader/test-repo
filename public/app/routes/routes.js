socialmedia.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/partials/home.html',
            //controller: 'loginController'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/partials/login.html',
            //controller: 'loginController'
        })
        .state('register', {
            url: '/registration',
            templateUrl: '/partials/registration.html',
            controller: 'registrationController'
        })
        .state('forgotpass', {
            url: '/reset_password',
            templateUrl: '/partials/forgot_password.html'
        })
        .state('create-user-password', {
            url: '/create-user-password/:token',
            templateUrl: '/partials/create_user_password.html'
        })
}]);