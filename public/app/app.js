    var socialmedia = angular.module('mysocialmedia', [
        'ui.router', 'angular-loading-bar', 'ngAnimate'
    ]);

    socialmedia.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    })