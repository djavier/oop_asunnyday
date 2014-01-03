'use strict';

var app = angular.module('oopApp', [
  'ngResource',
  'ngRoute'
])
  .config(function ($routeProvider, $httpProvider) {
    
    //$httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = '*'
    //$httpProvider.defaults.headers.common["Access-Control-Allow-Headers"] = 'origin, x-requested-with, content-type, accept'
    //$httpProvider.defaults.headers.common["Access-Control-Allow-Method"] = 'GET, POST, PUT, DELETE, OPTIONS'
    //$httpProvider.defaults.headers.get = "GET";


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Heroes', {
        templateUrl: 'views/heroes.html',
        controller: 'HeroListCtrl'
      })
      .when('/Weapons', {
        templateUrl: 'views/weapons.html',
        controller: 'WeaponCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


app.factory("HeroResource", function ($resource) {
    return $resource(
        "http://0.0.0.0:4567/api/v1/heroes/:id",
        {Id: "@Id" },
        {  
            "update": {method: "PUT"}
        }
    );
});

app.factory("WeaponResource", function ($resource) {
    return $resource(
        "http://0.0.0.0:4567/api/v1/weapons/:id",
        null,
        {
            "update": {method: "PUT"} 
        }
    );
});

app.factory("JobResource", function ($resource) {
    return $resource(
        "http://0.0.0.0:4567/api/v1/jobs/:id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"} 
        }
    );
});

app.factory("RaceResource", function ($resource) {
    return $resource(
        "http://0.0.0.0:4567/api/v1/races/:id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"} 
        }
    );
});
