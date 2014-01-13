'use strict';

var apiHostUrl = "http://0.0.0.0:4567";

var app = angular.module('oopApp', [
  'ngResource',
  'ngRoute',
  'ngAnimate'
])
  .config(function ($routeProvider, $httpProvider, $locationProvider ) {
    
    //$locationProvider.html5Mode(true)
    //$httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    //$httpProvider.defaults.headers.put["Content-Type"] = "application/json";

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Heroes', {
        templateUrl: 'views/heroes.html',
        controller: 'HeroCtrl'
      })
      .when('/Heroes/:id', {
        templateUrl: 'views/heroes.html',
        controller: 'HeroCtrl'
      })
      .when('/Weapons', {
        templateUrl: 'views/weapons.html',
        controller: 'WeaponCtrl'
      })
      .when('/Races', {
        templateUrl: 'views/races.html',
        controller: 'RaceCtrl'
      })
       .when('/Jobs', {
        templateUrl: 'views/jobs.html',
        controller: 'JobCtrl'
      })
       .when('/404', {
        templateUrl: '404.html'
       })
      .otherwise({
        redirectTo: '/'
      });
  });

app.factory("MessageFactory", function(){

    toastr.options = {
      "closeButton": false,
      "debug": false,
      "positionClass": "toast-bottom-full-width",
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "500",
      "timeOut": "3000",
      "extendedTimeOut": "500",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }

    return {
          success: function(message)
          {
            toastr.success(message);
          },
          error: function(message)
          {
            toastr.error(message);
          },
          warning: function(message)
          {
            toastr.warning(message);
          }
    }
});

app.factory("HeroResource", function ($resource) {
    return $resource(
        apiHostUrl+"/api/v1/heroes/:id",
        {Id: "@Id" },
        {  
            "update": {method: "PUT"}
        }
    );
});

app.factory("WeaponResource", function ($resource) {
    return $resource(
        apiHostUrl+"/api/v1/weapons/:id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"} 
        }
    );
});

app.factory("JobResource", function ($resource) {
    return $resource(
        apiHostUrl+"/api/v1/jobs/:id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"} 
        }
    );
});

app.factory("RaceResource", function ($resource) {
    return $resource(
        apiHostUrl+"/api/v1/races/:id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"} 
        }
    );
});
