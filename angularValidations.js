var app = angular.module('validationApp',[]);

app.directive('pincode',function() {
	var dir = {require:'ngModel',
			  link:function(scope,ielem,iattrs,ctrl){
			  	console.log(ctrl);
				ctrl.$parsers.unshift(checkPincode);
				var r = /^\d\d{4}\d$/;
				console.log(ctrl.$modelValue);
				console.log(ctrl.$viewValue);
				function checkPincode(viewValue) {
					if(r.test(viewValue)){
						ctrl.$setValidity('validpincode',true);
						return viewValue;
					}
					else {
					ctrl.$setValidity('validpincode',false);
					return undefined;
					}
					
				}			  	
			  }};
	return dir;
});
