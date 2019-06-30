    var socialmedia = angular.module('mysocialmedia', [
        'ui.router'
    ]);

    socialmedia.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    })