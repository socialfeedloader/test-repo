socialmedia.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',

            templateUrl: '/partials/login.html',
            // controller: 'loginController'
        })

    .state('register', {
        url: '/registration',
        templateUrl: '/partials/registration.html'
    })

    .state('login', {
            url: '/',
            templateUrl: '/partials/login.html'

        })
        .state('forgotpass', {
            url: '/reset_password',
            templateUrl: '/partials/forgot_password.html'

        })
}]);