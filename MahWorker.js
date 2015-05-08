var i = 0;
update();
function update() {
	postMessage(i);
	i++;
	setTimeout("update()",100);	
}
