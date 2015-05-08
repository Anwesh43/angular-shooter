(function($){
$.extend({imagified:function(data){
		var url = data.url|| 'http://www.gmbitcoin.com/images/image-not-found.png';
		var x = data.x||0;
		var y = data.y||0;
		var time = data.time || 100;
		var color = data.color || 'black';
		var strokeSize = data.strokeSize || 10; 
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 200;
		canvas.style.border = '1px solid black';
		canvas.style.position = 'absolute';
		canvas.style.left = x;
		canvas.style.top = y;
		document.body.appendChild(canvas);
		var ctx = canvas.getContext('2d');
		ctx.strokeStyle = color;
		ctx.lineWidth = strokeSize;
		var deg = 0;
		var isLoading = true;
		var interval = setInterval(function(){
		ctx.clearRect(0,0,200,200);
		ctx.save();
		ctx.translate(100,100);
		ctx.rotate(deg*Math.PI/180);
		ctx.beginPath();
		ctx.moveTo(30,0);
		for(var i=0;i<=60;i++) {
			ctx.lineTo(30*Math.cos(i*Math.PI/180),30*Math.sin(i*Math.PI/180));
		}
		ctx.stroke();
		ctx.restore();
		deg+=10;
		if(deg == 720) {
			var image = new Image();
			image.src = url;
			image.onload = function(data) {
				canvas.width = 200;
				canvas.height = 200*image.height/image.width;
				ctx.clearRect(0,0,canvas.width,canvas.height);
				var w = 200,h = 200*image.height/image.width;
				ctx.drawImage(image,0,0,w,h);
				clearInterval(interval);	
			};
		}
	},time);	
}});
	
})(jQuery);