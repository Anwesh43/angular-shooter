var mainApp = angular.module('mainApp',['serviceApp']);
var controller = mainApp.controller('mainController',function($scope,getFootballers){
	$scope.strikers = getFootballers.getStrikers();
	$scope.defenders = getFootballers.getDefenders();
	$scope.midfielders = getFootballers.getMidfielders();
});