var app = angular.module('FiltVarApp',[]);
app.filter('joiner',function(){
	return function(item,symbol) {
		return item.join(symbol);
	}
});
var symbolController = app.controller('JoinerController',function($scope){
	$scope.symbol = ",";
	$scope.name="Box";
	$scope.items = ['Ants','Apples','Oranges','Potato','Ropes','Ballon'];
	$scope.itemAppender = function(item) {
		$scope.items.push(item);	
	};
});