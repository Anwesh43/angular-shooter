var app = angular.module('myto',[]);
app.factory('myoto',function(){
	var jozz = function() {
		alert('Iakel');	
	};
	var plit = function() {
		alert('trip');
	};
	return {jozz:jozz,plit:plit};
});
app.service('meraService',function(){
	this.addKar = function(a,b) {
		return a+b;	
	};
	this.kuchTokar = function() {
		alert('what will i do');	
	};
	this.yehKar = function(func,params) {
		alert(func(params.a,params.b));
	};
});
var divController = app.controller('divController',function($scope,myoto,meraService){
	myoto.jozz();
	myoto.plit();
	meraService.kuchTokar();
	meraService.yehKar(meraService.addKar,{a:60,b:50});
});


