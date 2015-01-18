/**
 * Created by Zem on 2014-11-10.
 */
var app = angular.module('Application',['ngRoute', 'uiGmapgoogle-maps',  'ngImgCrop']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: '/views/home.html'
        }).
        when('/contact', {
            templateUrl: '/views/contact.html',
            controller: 'ContactController'
        }).
        when('/about', {
            templateUrl: '/views/about.html'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBS5asJJWOEQLIr3K7vj_8LWd0tmmgqlhQ',
        v: '3.17',
        libraries: 'weather,geometry,visualization,places'
    });
})
