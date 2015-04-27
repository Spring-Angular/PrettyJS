'use strict';


// Declare app level module which depends on filters, and services

var demoApp = angular.module('demoApp', [
    'ui.router',
    'coreDirective',
    'coreService',
    'coreController',
    'coreFilter'

]);

demoApp.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

demoApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "dashboard.html"
        })
        .state("dashboard.detail", {
            url:"/api/:type",
            templateUrl: function(params) {
                return "directiveAPI/"+ params.type +".html";
            }
        })
}]);


