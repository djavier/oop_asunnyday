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
	.directive("weapons", function() {
		return {
			restrict: "E",
			templateUrl: "/views/partials/weaponList.html"
		};
	})
	// .directive("weaponItem", function() {
	// 	return {
	// 		restrict: "E",
	// 		template: '<div>{{weapon.id}}. {{weapon.name}}</div>',
	// 		link: function(scope, element, attrs){
	// 			scope.$watch("scope.hero.weapon_id", function(value) {
	 //            	if (attrs.id === value) {
	 //            		console.log(value);
	 //                	element.toggleClass("alert-box alert");
	 //            	}
	 //        	})
	// 		}
	// 	};
	// })
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
	});

angular.module('oopApp')
  .controller('HeroCtrl', function ($scope, $routeParams, $location, HeroResource, WeaponResource, JobResource, RaceResource) {
	
	$scope.weaponTmp=[];
	$scope.jobTmp=[];
	$scope.raceTmp=[];

    $scope.selectRace = function(id) {
    	$scope.hero.race_id = id;
    }
    $scope.selectJob = function(id) {
    	$scope.hero.job_id = id;
    }
    $scope.selectWeapon = function(id) {
    	$scope.hero.weapon_id = id;
    }

    $scope.isHeroWeapon =  function (weapon) {
    	return $scope.hero.weapon_id === weapon.id;
    }

    $scope.isHeroJob =  function (job) {
    	return $scope.hero.job_id === job.id;
    }
    $scope.isHeroRace =  function (race) {
    	return $scope.hero.race_id === race.id;
    }

    $scope.getNextWeapon = function(id) {
    	var currentWeapon = $scope.weapons.filter(function(element) { return element.id === id })[0]
    	var nextItemIndex = $scope.weapons.indexOf(currentWeapon) + 1

    	if (nextItemIndex <= $scope.weapons.length-1 )
    	{
    		$scope.weaponTmp.unshift($scope.weapons[nextItemIndex])
    		$scope.weaponTmp.pop();
    		$scope.weapon = $scope.weapons[nextItemIndex];
    	}
    	
    };

    $scope.getPreviousWeapon = function(id) {
    	var currentWeapon = $scope.weapons.filter(function(element) { return element.id === id })[0]
    	var previousItemIndex = $scope.weapons.indexOf(currentWeapon) - 1

    	if (previousItemIndex >= 0 )
    	{
    		$scope.weaponTmp.unshift($scope.weapons[previousItemIndex])
    		$scope.weaponTmp.pop();
    		$scope.weapon = $scope.weapons[previousItemIndex];
    	}
    	
    };

    $scope.getNextJob = function(id) {
    	var currentJob = $scope.weapons.filter(function(element) { return element.id === id })[0]
    	var nextItemIndex = $scope.jobs.indexOf(currentJob) + 1

    	if (nextItemIndex <= $scope.jobs.length-1 )
    	{
    		$scope.jobTmp.unshift($scope.jobs[nextItemIndex])
    		$scope.jobTmp.pop();
    		$scope.job = $scope.jobs[nextItemIndex];
    	}
    	
    };

    $scope.getPreviousJob = function(id) {
    	var currentJob = $scope.jobs.filter(function(element) { return element.id === id })[0]
    	var previousItemIndex = $scope.jobs.indexOf(currentJob) - 1

    	if (previousItemIndex >= 0 )
    	{
    		$scope.jobTmp.unshift($scope.jobs[previousItemIndex])
    		$scope.jobTmp.pop();
    		$scope.job = $scope.jobs[previousItemIndex];
    	}
    };

    $scope.getNextRace = function(id) {
    	var currentRace = $scope.races.filter(function(element) { return element.id === id })[0]
    	var nextItemIndex = $scope.races.indexOf(currentRace) + 1

    	if (nextItemIndex <= $scope.races.length-1 )
    	{
    		$scope.raceTmp.unshift($scope.races[nextItemIndex])
    		$scope.raceTmp.pop();
    		$scope.race = $scope.races[nextItemIndex];
    	}
    	
    };

    $scope.getPreviousRace = function(id) {
    	var currentRace = $scope.races.filter(function(element) { return element.id === id })[0]
    	var nextItemIndex = $scope.races.indexOf(currentRace) - 1

    	if (previousItemIndex >= 0 )
    	{
    		$scope.raceTmp.unshift($scope.races[previousItemIndex])
    		$scope.raceTmp.pop();
    		$scope.race = $scope.races[previousItemIndex];
    	}
    	
    };

    $scope.heroes = HeroResource.query(function() {

		//$scope.hero = HeroResource.get({id: 1}, function() {
			$scope.hero = $scope.heroes[0]
			$scope.weapons = WeaponResource.query(function(data) { 
				var wpn = data.filter(function(element) { return element.id === $scope.hero.weapon_id })[0]
				$scope.weaponTmp.unshift(wpn);
				$scope.weapon = wpn;

			});			
				
			$scope.jobs = JobResource.query(function(data) { 
				var job = data.filter(function(element) { return element.id === $scope.hero.job_id })[0]
				$scope.jobTmp.unshift(job);
				$scope.job = job;

			});
			$scope.races =  RaceResource.query(function(data) { 
				var race = data.filter(function(element) { return element.id === $scope.hero.race_id })[0]
				$scope.raceTmp.unshift(race);
				$scope.race = race;

			});			
			
		//})
	});

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