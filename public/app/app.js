    var socialmedia = angular.module('mysocialmedia', [
        'ui.router', 'angular-loading-bar', 'toaster', 'ngAnimate', 'angular-storage'
    ]);

    socialmedia.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    })