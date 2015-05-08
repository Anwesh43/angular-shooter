var serviceApp = angular.module('serviceApp',[]);
serviceApp.service('getFootballers',function(){
	var strikers = ['Leo Messi','Gonzalo Higuain','Danny Wellbeck','Robin Van Persie'];
	var defenders = ['Laurent Koscileny','Per Mertesacker','Thomas Vermalen','Gerard Pique'];
	var midfielders = ['Yaya Toure','Kolo Toure','Jack Wilshere'];
	this.getStrikers = function() {
		return strikers.join(',');	
	};
	this.getDefenders = function() {
		return defenders.join(',');
	};	
	this.getMidfielders = function() {
		return midfielders.join(',');	
	};
});
