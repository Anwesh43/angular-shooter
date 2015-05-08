<script src="..angular.min.js">
</script>
<script>
	var app = angular.module('iscoApp',[]);
	var isController = app.controller('iscoController',function($scope){
		$scope.anwesh = {name:'Anwesh',age:22};
		$scope.sureesh = {name:'Suresh',age:42};
 	});
	app.directive('empDir',function(){
		var dir = {};
		dir.scope = {empInfo:'=info'};
		dir.templateUrl:'empInformation.html'
		return dir;
	})
</script>
<div ng-app="iscoApp">
	<div ng-controller="iscoController">
		<emp-dir info="anwesh">
		</emp-dir>
	</div>
</div>