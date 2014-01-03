'use strict';

angular.module('oopApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

angular.module('oopApp')
  .controller('HeroListCtrl', function ($scope, $routeParams, HeroResource) {
	$scope.heroes = HeroResource.query();
  });