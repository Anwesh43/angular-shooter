var app = angular.module('gameApp',[]);
app.factory('gameObjectFactory',function($document){
	var w = $document[0].body.clientWidth;
	var h = $document[0].body.clientHeight;
	var shooterPoints = [{x:w/2-30,y:h/2-10},{x:w/2-10,y:h/2-60},{x:w/2+10,y:h/2-60},{x:w/2+30,y:h/2-10}];
	
	var factoryObj = {
		getShooterPoints:function(){
			return shooterPoints;
		},
		getBall:function() {
		var ballObj = {
			x:w/2,
			y:h/2-60,
			r:10,
			color:'red',
			speedy:-20,
			draw:function(ctx){
				ctx.fillStyle = 'red';
				ctx.beginPath();
				ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
				ctx.fill();
			},
			move:function() {
				this.y+=this.speedy;
			}
		};
		return ballObj;
		},
		getBrick:function(x,y,color) {
		var brick = {
			x:x,
			y:y,
			w:100,
			h:20,
			speedx:20,
			speedy:0,
			color:color,
			draw:function(ctx){
			ctx.fillStyle=this.color;
			ctx.fillRect(this.x,this.y,this.w,this.h)
			},
			move:function(){
				this.x+=this.speedx;
			}
		};
		return brick;
		}
	};
	return factoryObj;
});
var controller = app.controller('gameController',function($scope,$document,gameObjectFactory,$interval){
	$scope.colors = ['#F5DEB3','#FA8072','#98FB98','#FFEBCD'];
    $scope.score = 0;
    $scope.miss = 0;
    $scope.balls = [];
    $scope.bricks = [];
    $scope.width = $document[0].body.clientWidth;
    $scope.height = $document[0].body.clientHeight;
    $scope.highestScore = 0;
    $scope.shooterPoints = gameObjectFactory.getShooterPoints();
    $document.find('canvas').attr('width',$scope.width);
    $document.find('canvas').attr('height',$scope.height/2);
    $scope.ctx = $document.find('canvas')[0].getContext('2d');
    if(window.localStorage) {
    	if(window.localStorage.highestScore) {
    		$scope.highestScore = window.localStorage.highestScore;
    	}
    }
    $scope.restart = function() {
    	$("#myModal").modal({show:false});
    	window.location.reload();	
    };
    $scope.gameOver = function() {
    	console.log($scope.interval);
    	$interval.cancel($scope.interval);

    	if($scope.score>=$scope.highestScore) {    
    		$scope.highestScore = $scope.score;
    		window.localStorage.highestScore = $scope.highestScore;
    	}	
    	$("#myModal").modal({show:true});
    	
    };
    $scope.insertBricks = function() {
    	for(var i=0;i<140;i++) {
    		var availablePosition = [0,20,40,60];
    		var totalBricks = Math.floor(Math.random()*5);
    		if(totalBricks !=0) {
    			for(var j=0;j<totalBricks-1;j++) {
    				var yindex = Math.floor(Math.random()*(4-j));
    				var x = -(140-i)*100;
    				var y = availablePosition[yindex];
    				var color = $scope.colors[yindex]; 
    				$scope.bricks.push(gameObjectFactory.getBrick(x,y,color));
    				availablePosition.splice(yindex,1);
    			}
    		}	
    	}
 
    };
    $scope.time = 0;
    $scope.insertBall = function() {
    	$scope.balls.push(gameObjectFactory.getBall());
    };
    $scope.drawShooter = function() {
    	var shooterPoints = gameObjectFactory.getShooterPoints();
    	$scope.ctx.fillStyle= 'black';
    	$scope.ctx.beginPath();
    	$scope.ctx.moveTo(shooterPoints[0].x,shooterPoints[0].y);
    	for(var i=1;i<shooterPoints.length;i++) {
    		$scope.ctx.lineTo(shooterPoints[i].x,shooterPoints[i].y);
    	}
    	$scope.ctx.lineTo(shooterPoints[0].x,shooterPoints[0].y);
    	$scope.ctx.fill();
    }
    $scope.checkCollision = function(brick,ball,index) {
    	if(brick.x+100>=ball.x-10 && brick.x<=ball.x+10 && brick.y+20 >= ball.y-10 && brick.y<=ball.y+10) {
    		$scope.score++;
    		return true;
    	}

    	return false;
    };
    $scope.update = function() {
    	$scope.ctx.clearRect(0,0,$scope.width,$scope.height);
    	if($scope.time == 0) {
    		$scope.insertBricks();
    	}
    	var index = 0;
    	for(var i=0;i<$scope.bricks.length;i++) {
    		var brick = $scope.bricks[i];
    		$scope.ctx.fillStyle='black';
    		brick.draw($scope.ctx);
    		brick.move();
    		if(brick.x >= $scope.width) {
    			$scope.bricks.splice(i,1);
    		}
    		for(var j=0;j<$scope.balls.length;j++) {
    			if($scope.checkCollision(brick,$scope.balls[j],i)) {
    				$scope.balls.splice(j,1);
    				$scope.bricks.splice(i,1);
    				console.log($scope.balls);
    				i--;
    			}
    			else if($scope.balls[0].y<=0){
    				$scope.balls.splice(0,1);
    				$scope.miss ++;
    			}
    				
    		}
    	}
    	for(var i=0;i<$scope.balls.length;i++) {
    		var ball = $scope.balls[i];
    		$scope.ctx.fillStyle='red';
    		ball.draw($scope.ctx);
    		ball.move();
    	}
    	
    	$scope.drawShooter();
    	if($scope.bricks.length == 0) {
    		$scope.gameOver();
    	}
    	$scope.time++;
    }
});
var uiController = app.controller('uiController',function($scope){
	$scope.shoot = function() {
		$scope.$parent.insertBall();
	};
});
app.directive('shootCanv',function($interval){
	var dir = {};
	dir.restrict = 'AEC';
	dir.controller = 'gameController';
	dir.link = function(scope,elem,attrs){
		scope.interval = $interval(function(){scope.update();},100);
	};
	return dir;
});