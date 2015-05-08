var app = angular.module('filterApp',[]);
app.value('decoration',{symbol:'*'});
app.filter('myFilter',function(decoration){
	var decoratedFilter = function(item) {
		return	item+decoration.symbol+item;
	};
	decoratedFilter.$stateful = true;
	return decoratedFilter;
});
var controller = app.controller('filterController',function($scope,decoration){
		$scope.name = "Anwesh";
		$scope.decoration = decoration;
});
