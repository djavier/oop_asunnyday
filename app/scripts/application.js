var app = angular.module('aohApp',['ngRoute','ngResource'])


app.factory("HeroResource", function ($resource) {
    return $resource(
        "http://0.0.0.0:4567/api/v1/heroes/:Id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"} 
        }
    );
});

app.factory("WeaponResource", function ($resource) {
    return $resource(
        "http://0.0.0.0:4567/api/v1/weapons/:Id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"} 
        }
    );
});

app.factory("JobResource", function ($resource) {
    return $resource(
        "http://0.0.0.0:4567/api/v1/jobs/:Id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"} 
        }
    );
});

app.factory("RaceResource", function ($resource) {
    return $resource(
        "http://0.0.0.0:4567/api/v1/races/:Id",
        {Id: "@Id" },
        {
            "update": {method: "PUT"} 
        }
    );
});




function MainCtrl($scope, $http, $routeParams, HeroResource) {
	$scope.heroes = HeroResource.query();
}

function HeroCtrl($scope, $http, $routeParams, HeroResource) {
    $scope.hero = HeroResource.get({id: $routeParams.id}, function(hero){
        $scope.message = "Hero Fetch";
        return hero;
    })
}

app.config(function($routeProvider, $locationProvider){
    //$locationProvider.html5mode(true);
    $routeProvider
    .when('heroes',
     {
        templateUrl: 'Heroes.html',
        controller: 'MainCtrl'
     })
    .when('hero/:id', {
        templateUrl: 'Hero.html',
        controller: 'HeroCtrl'
    }).
    when('/', {
        templateUrl: 'Main.html',
        controller: 'MainCtrl'
    });
});