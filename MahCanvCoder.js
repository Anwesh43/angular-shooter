var canvas,video,context;
var rects = [];
var worker;
window.onload = function() {
	alert('2');
	canvas = document.createElement('canvas');
	video = document.createElement('video');
	canvas.width = 500;
	canvas.height = 500;
	canvas.style.border = '1px solid black';
	context = canvas.getContext('2d');

	video.width = 500;
	video.height = 500;
	video.autoplay = true;
	video.style.visibility = 'hidden';
	document.body.appendChild(canvas);
	document.body.appendChild(video);

	navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	navigator.getUserMedia({video:true,audio:false},success,error);
	
};
window.onmousedown = function(event) {
	var x = event.pageX,y = event.pageY,deg = 0,rot = 20;
	var rect = {x:x,y:y,deg:deg,rot:rot};
	rects.push(rect);
};
window.onkeydown = function(event) {
	if(event.keyCode == 32) {
		$.ajax({url:'imageSaver.php',data:{imageData:canvas.toDataURL()},type:'post'}).success(function(data){
			console.log(data);
		});
	}	
};
function update() {
	worker = new Worker('MahWorker.js');
	worker.onmessage = function(event) {
		console.log('e');
		context.clearRect(0,0,500,500);
		context.drawImage(video,0,0,500,500);
		context.strokeStyle = 'yellowgreen';
		for(var i=0;i<rects.length;i++) {
			context.save();
			context.translate(rects[i].x,rects[i].y);
			context.rotate(rects[i].deg*Math.PI/180);
			context.strokeRect(-50,-50,100,100);
			context.restore();
			rects[i].deg += rects[i].rot;
		}	
	};
}
function success(stream) {
	video.src = window.URL.createObjectURL(stream);
	update();
}
function error(err) {
	alert(err);
}