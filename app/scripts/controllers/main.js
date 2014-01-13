'use strict';

angular.module('oopApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        // alert(viewLocation)
        // alert($location.path())
        return viewLocation === $location.path();
    };
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

angular.module('oopApp')
  .controller('HeroCtrl', function ($scope, $routeParams, $location, HeroResource, WeaponResource, JobResource, RaceResource, MessageFactory) {
    
    $scope.heroesTmp=[];
    $scope.weaponTmp=[];
    $scope.jobTmp=[];
    $scope.raceTmp=[];
    $scope.addMode = false;
    $scope.params = $routeParams;

    $scope.heroes = HeroResource.query(function(heroes) {

        $scope.weapons = WeaponResource.query(function(data) {     
            initializeSubEntity(data,'hero.weapon_id',$scope.weaponTmp,$scope.job);        
        });         
            
        $scope.jobs = JobResource.query(function(data) { 
            initializeSubEntity(data,'hero.job_id',$scope.jobTmp,$scope.job);
        });
        $scope.races =  RaceResource.query(function(data) { 
            initializeSubEntity(data,'hero.race_id',$scope.raceTmp,$scope.race);
        }); 
        
        var hero;

        if ($scope.params.id == null)
        {
            hero = heroes[0]
            hero.first=true;         
        }
        else
        {
            var theHero = heroes.filter(function(element) { return element.id == $scope.params.id })
            if (theHero.length > 0) {
                hero = theHero[0]
            }
            else
            {
                $location.path("/404");
            }
        }
        
        $scope.heroesTmp.unshift(hero);
        $scope.hero = hero


    });



    var initializeSubEntity = function (data, propertyWatch, tempList, obj){
        $scope.$watch(propertyWatch, function(newVal) {
            var entity = data.filter(function(element) { return element.id === newVal })[0]
            tempList.pop()
            tempList.unshift(entity);
            obj = entity;
            if (data.indexOf(entity) == 0)
                obj.first = true;
        });
    }


    $scope.selectRace = function(id) {
        $scope.hero.race_id = id;
    }
    $scope.selectJob = function(id) {
        $scope.hero.job_id = id;
    }
    $scope.selectWeapon = function(id) {
        $scope.hero.weapon_id = id;
    }


    $scope.getImage = function(object){
        if (object == null || object.image == null)
            
            return "images/not_available_image.jpg"
        else
            return object.image
    }

    $scope.toggleAddMode = function () { 
            $scope.heroCopy =  angular.copy($scope.hero)
            $scope.addMode = !$scope.addMode; 
            if ($scope.addMode){
                $scope.hero = {};
            }
            else{
                $scope.hero = $scope.heroes[0]
                $scope.heroesTmp.pop(); 
                $scope.heroesTmp.unshift($scope.hero);    
            }

    }; 

    $scope.getNextHero = function (id){ 
        var currentHero = $scope.heroes.filter(function(element) { return element.id === id })[0]
        var nextItemIndex = $scope.heroes.indexOf(currentHero) + 1

        if (nextItemIndex <= $scope.heroes.length-1 )
        {
            $scope.heroesTmp.unshift($scope.heroes[nextItemIndex])
            $scope.heroesTmp.pop();
            $scope.hero = $scope.heroes[nextItemIndex];
            if (nextItemIndex == $scope.heroes.length-1)
                $scope.hero.last = true;
        }
    }

    $scope.getPreviousHero = function (id){
        var currentHero = $scope.heroes.filter(function(element) { return element.id === id })[0]
        var previousItemIndex = $scope.heroes.indexOf(currentHero) - 1

        if (previousItemIndex >= 0)
        {
            $scope.heroesTmp.unshift($scope.heroes[previousItemIndex])
            $scope.heroesTmp.pop();
            $scope.hero = $scope.heroes[previousItemIndex];
            if (previousItemIndex == 0)
                $scope.hero.first = true;
        }
    }

    $scope.getNextWeapon = function(id) {
        var currentWeapon = $scope.weapons.filter(function(element) { return element.id === id })[0]
        var nextItemIndex = $scope.weapons.indexOf(currentWeapon) + 1

        if (nextItemIndex <= $scope.weapons.length-1 )
        {
            $scope.weaponTmp.unshift($scope.weapons[nextItemIndex])
            $scope.weaponTmp.pop();
            $scope.weapon = $scope.weapons[nextItemIndex];
            if (nextItemIndex == $scope.weapons.length-1)
                $scope.weapon.last = true;
        }
        
    };

    $scope.getPreviousWeapon = function(id) {
        var currentWeapon = $scope.weapons.filter(function(element) { return element.id === id })[0]
        var previousItemIndex = $scope.weapons.indexOf(currentWeapon)-1

        if (previousItemIndex >= 0 )
        {
            $scope.weaponTmp.unshift($scope.weapons[previousItemIndex])
            $scope.weaponTmp.pop();
            $scope.weapon = $scope.weapons[previousItemIndex];
            if (previousItemIndex == 0)
                $scope.weapon.first = true;
        }
        
    };

    $scope.getNextJob = function(id) {
        var currentJob = $scope.jobs.filter(function(element) { return element.id === id })[0]
        var nextItemIndex = $scope.jobs.indexOf(currentJob) + 1

        if (nextItemIndex <= $scope.jobs.length-1 )
        {
            $scope.jobTmp.unshift($scope.jobs[nextItemIndex])
            $scope.jobTmp.pop();
            $scope.job = $scope.jobs[nextItemIndex];
             if (nextItemIndex == $scope.jobs.length-1)
                $scope.job.last = true;
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
            if (previousItemIndex == 0)
                $scope.job.first = true;
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
            if (nextItemIndex == $scope.races.length-1)
                $scope.race.last = true;
        }
        
    };

    $scope.getPreviousRace = function(id) {
        var currentRace = $scope.races.filter(function(element) { return element.id === id })[0]
        var previousItemIndex = $scope.races.indexOf(currentRace) -1
        
        if (previousItemIndex >= 0 )
        {
            $scope.raceTmp.unshift($scope.races[previousItemIndex])
            $scope.raceTmp.pop();
            $scope.race = $scope.races[previousItemIndex];
            if (previousItemIndex == 0)
                $scope.race.first = true;
        }
        
    };


    $scope.getHeroes = function(data){
        if (data != null) {
            $scope.heroes = HeroResource.query(function(heroesList) {
                    var hero = heroesList.filter(function(element) { return element.id === data.id })[0]
                    $scope.heroesTmp.pop(); 
                    $scope.heroesTmp.unshift(hero);    
                    $scope.hero = hero;
                    $scope.addMode = false;   
                
            });
        }
        else
        {
            $scope.heroes = HeroResource.query(function(heroesList) {
                    var hero = heroesList[0]
                    $scope.heroesTmp.pop(); 
                    $scope.heroesTmp.unshift(hero);    
                    $scope.hero = hero;
                    $scope.addMode = false;   
                
            });
        }
        
    }

    $scope.saveHero = function(){
        if ($scope.hero.id == null)
        {
            HeroResource.save($scope.hero, function(data) {$scope.getHeroes(data)})   
        } else
        {
            HeroResource.update({id: $scope.hero.id}, $scope.hero, function(){HeroResource.query()})
        }
    }


    $scope.deleteHero = function(){
        HeroResource.delete({id: $scope.hero.id}, function(){$scope.getHeroes()}, function(error) { MessageFactory.error(error.data);})
    }
    
    

  })
    .controller('WeaponCtrl', function ($scope, $routeParams, $location, WeaponResource, MessageFactory) {

        $scope.toggleAddMode = function () { 
            $scope.addMode = !$scope.addMode; 
        }; 

        $scope.toggleEditMode = function (weapon) { 
            weapon.editMode = !weapon.editMode; 
        }; 

        var getWeapons = function(){
            $scope.weapons = WeaponResource.query();
        }

        $scope.addWeapon = function () { 
            WeaponResource.save($scope.weapon, function(){ 
                $scope.toggleAddMode(); 
                $scope.weapon = {}; 
                getWeapons();
            });
            
        }; 

        $scope.deleteWeapon = function (weapon) { 
            WeaponResource.delete(  {id: weapon.id}, 
                                    function(){getWeapons(); MessageFactory.success("Weapon Deleted");}, 
                                    function(error){MessageFactory.error(error.data)});
        }; 

        $scope.updateWeapon = function (weapon) { 
            WeaponResource.update({id: weapon.id}, weapon, function(){getWeapons()}); 
        }

        $scope.weapons = WeaponResource.query();
        $scope.addMode = false; 
    });



angular.module('oopApp')
  .controller('RaceCtrl', function ($scope, $routeParams, $location, RaceResource, MessageFactory) {

        $scope.toggleAddMode = function () { 
            $scope.addMode = !$scope.addMode; 
        }; 

        $scope.toggleEditMode = function (race) { 
            race.editMode = !race.editMode; 
        }; 

        var getRaces = function(){
            $scope.races = RaceResource.query();
        }

        $scope.addRace = function () { 
            RaceResource.save($scope.race, function(){ 
                $scope.toggleAddMode(); 
                $scope.race = {}; 
                getRaces();
            });

        }; 

        $scope.deleteRace = function (race) { 
            RaceResource.delete({id: race.id}, 
                                function(){getRaces(); MessageFactory.success("Race Deleted");}, 
                                function(error){MessageFactory.error(error.data)})
        };

        $scope.updateRace = function (race) { 
            RaceResource.update({id: race.id}, race, function(){getRaces()})
        }; 

        $scope.races = RaceResource.query();
        $scope.addMode = false; 
    });


angular.module('oopApp')
  .controller('JobCtrl', function ($scope, $routeParams, $location, JobResource, MessageFactory) {
       

        $scope.toggleAddMode = function () { 
            $scope.addMode = !$scope.addMode; 
        }; 

        $scope.toggleEditMode = function (job) { 
            job.editMode = !job.editMode; 
        }; 

        var getJobs = function(){
            $scope.jobs = JobResource.query();
        }

        $scope.addJob = function () { 
            JobResource.save($scope.job, function(){ 
                $scope.toggleAddMode(); 
                $scope.job = {}; 
                getJobs();
            });

        }; 

        $scope.deleteJob = function (job) { 
            JobResource.delete({id: job.id}, 
                                function(){ 
                                            getJobs(); 
                                            MessageFactory.success("Job Deleted");
                                          }, 
                                function(error){MessageFactory.error(error.data)}
                );
        };

        $scope.updateJob = function (job) { 
            JobResource.update({id: job.id}, job, function(){getJobs()})
        }; 

        $scope.jobs = JobResource.query();
        $scope.addMode = false; 
    });