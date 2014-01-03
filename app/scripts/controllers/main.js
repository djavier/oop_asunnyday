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

angular.module('oopApp')
  .controller('WeaponCtrl', function ($scope, $routeParams, WeaponResource) {
	//$scope.heroes = HeroResource.query();

	        $scope.weapons = []; 
            $scope.addMode = false; 
  
            $scope.toggleAddMode = function () { 
                $scope.addMode = !$scope.addMode; 
            }; 
  
            $scope.toggleEditMode = function (weapon) { 
                weapon.editMode = !weapon.editMode; 
            }; 

            // var errorCallback = function (data, status, headers, config) { 
            //     notificationFactory.error(data.ExceptionMessage); 
            // }; 
  
  
            $scope.weapons = WeaponResource.query();
  
            $scope.addWeapon = function () { 
                WeaponResource.save($scope.weapon);
                $scope.toggleAddMode(); 
                $scope.weapon = {}; 
                $location.path('/weapons')
            }; 
  
            $scope.deleteWeapon = function (weapon) { 
                WeaponResource.delete(weapon.id)
                $scope.weapons = WeaponResource.query();
            }; 
  
            $scope.updateWeapon = function (weapon) { 
                WeaponResource.update({id: weapon.id}, weapon)
                $scope.weapons = WeaponResource.query();
            }; 
        });