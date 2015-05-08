var app = angular.module('controllerApp',[]);
app.factory('footballFactory',function(){
	var footballers = [{name:'Mesut Ozil',age:26,club:'Arsenal'},{name:'Alexis Sanchez',age:26,club:'Arsenal'},{name:'Danny Wellbeck',age:24,club:'Arsenal'},{name:'Wayne Rooney',age:30,club:'Manchester United'}];
	var factoryMethods = {getAllByName:function(){
		var names = []; 
		footballers.forEach(function(val){
			names.push(val.name);
		});
		return names;
		},
		getNameByAge:function(ageVal){
			var names  = [];
			var agedFootballers = footballers.filter(function(val){
				return val.age == ageVal;
			});
			agedFootballers.forEach(function(val){
				names.push(val.name);
			});
			return names;
		}
	};
	return factoryMethods;
});
app.factory('cricketFactory',function(){
	var cricketers = [{name:'Virat Kohli',age:27,team:'Indian'},{name:'AB Devillers',age:29,team:'South Africa'},{name:'Chris Gayle',age:34,team:'West Indies'},{name:'Rohit Sharma',age:27,team:'India'}];
	var factoryMethods = {getAllByName:function(){
		var names = []; 
		cricketers.forEach(function(val){
			names.push(val.name);
		});
		return names;
		}
	};
	return factoryMethods;
});
var cricketerController = app.controller('cricketerController',function($scope,cricketFactory){
	$scope.names = cricketFactory.getAllByName();
});
var footballController  = app.controller('footballerController',function($scope,footballFactory){
	$scope.names = footballFactory.getAllByName();
});
var footballAgeController = app.controller('footballerAgeController',function($scope,footballFactory,$routeParams){
	$scope.age = $routeParams.ageId;
	$scope.names = footballFactory.getNameByAge($scope.age);	
});
