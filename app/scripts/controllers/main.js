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
  .controller('HeroCtrl', function ($scope, $routeParams, $location, HeroResource) {
	$scope.heroes = HeroResource.query();
  });

angular.module('oopApp')
	.directive("weapons", function() {
		return {
			restrict: "E",
			templateUrl: "/views/partials/weaponList.html"
		};
	})
	.directive("jobs", function() {
		return {
			restrict: "E",
			templateUrl: "/views/partials/jobList.html"
		};
	})
	.directive("races", function() {
		return {
			restrict: "E",
			templateUrl: "/views/partials/raceList.html"
		};
	})
    .controller('WeaponCtrl', function ($scope, $routeParams, $location, WeaponResource) {
	//$scope.heroes = HeroResource.query();

	        

        //$scope.getWeapons();

        $scope.toggleAddMode = function () { 
            $scope.addMode = !$scope.addMode; 
        }; 

        $scope.toggleEditMode = function (weapon) { 
            weapon.editMode = !weapon.editMode; 
        }; 

        // var errorCallback = function (data, status, headers, config) { 
        //     notificationFactory.error(data.ExceptionMessage); 
        // }; 

			var getWeapons = function(){
        		$scope.weapons = WeaponResource.query();
        	}

        $scope.addWeapon = function () { 
            WeaponResource.save($scope.weapon, function(){ 
	            $scope.toggleAddMode(); 
	            $scope.weapon = {}; 
	            getWeapons();
            });
            
        	//getWeapons();
        }; 

        $scope.deleteWeapon = function (weapon) { 
            WeaponResource.delete({id: weapon.id}, function(){getWeapons()})
        }; 

        $scope.updateWeapon = function (weapon) { 
            WeaponResource.update({id: weapon.id}, weapon, function(){getWeapons()})
        }; 

        $scope.weapons = WeaponResource.query();
        $scope.addMode = false; 
    });



angular.module('oopApp')
  .controller('RaceCtrl', function ($scope, $routeParams, $location, RaceResource) {
	//$scope.heroes = HeroResource.query();

	        

        //$scope.getRaces();

        $scope.toggleAddMode = function () { 
            $scope.addMode = !$scope.addMode; 
        }; 

        $scope.toggleEditMode = function (race) { 
            race.editMode = !race.editMode; 
        }; 

        // var errorCallback = function (data, status, headers, config) { 
        //     notificationFactory.error(data.ExceptionMessage); 
        // }; 

			var getRaces = function(){
        		$scope.races = RaceResource.query();
        	}

        $scope.selectItem = function(id) {
        	//$scope.$parent.hero.race_id = id;
        	alert($scope.$parent.$parent);
        }

        $scope.addRace = function () { 
            RaceResource.save($scope.race, function(){ 
	            $scope.toggleAddMode(); 
	            $scope.race = {}; 
	            getRaces();
            });
            
        	//getRaces();
        }; 

        $scope.deleteRace = function (race) { 
            RaceResource.delete({id: race.id}, function(){getRaces()})
        }; 

        $scope.updateRace = function (race) { 
            RaceResource.update({id: race.id}, race, function(){getRaces()})
        }; 

        $scope.races = RaceResource.query();
        $scope.addMode = false; 
    });


angular.module('oopApp')
  .controller('JobCtrl', function ($scope, $routeParams, $location, JobResource) {
	//$scope.heroes = HeroResource.query();

	        

        //$scope.getJobs();

        $scope.toggleAddMode = function () { 
            $scope.addMode = !$scope.addMode; 
        }; 

        $scope.toggleEditMode = function (job) { 
            job.editMode = !job.editMode; 
        }; 

        // var errorCallback = function (data, status, headers, config) { 
        //     notificationFactory.error(data.ExceptionMessage); 
        // }; 

			var getJobs = function(){
        		$scope.jobs = JobResource.query();
        	}

        $scope.addJob = function () { 
            JobResource.save($scope.job, function(){ 
	            $scope.toggleAddMode(); 
	            $scope.job = {}; 
	            getJobs();
            });
            
        	//getJobs();
        }; 

        $scope.deleteJob = function (job) { 
            JobResource.delete({id: job.id}, function(){getJobs()})
        }; 

        $scope.updateJob = function (job) { 
            JobResource.update({id: job.id}, job, function(){getJobs()})
        }; 

        $scope.jobs = JobResource.query();
        $scope.addMode = false; 
    });