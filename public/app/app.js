/**
 * Created by Zem on 2014-11-10.
 */
var app = angular.module('Application',['ngRoute', 'ngImgCrop']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: '/views/home.html'
        }).
        when('/login', {
            templateUrl: '/views/login.html',
            controller: 'LoginController'
        }).
        when('/admin', {
            templateUrl: '/views/admin.html',
            controller: 'AdminController'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);
