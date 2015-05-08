var app = angular.module('controllerApp',[]);
app.controller('booksController',function($scope){
	$scope.books = ['jungleBook','harryPorter','secretsOfNaga','chroniclesOfNarnia','oliverTwist','olympia'];
});
app.controller('fruitsController',['$scope','$routeParams',function($scope,$routeParams){
		$scope.fruits = ['apple','orange','banana','pear','pineapple','appricot','custard apple'];
		$scope.fruitName = $routeParams.name;
	}]);
	
