<?php
	if(isset($_POST['imageData'])) {
		$data = $_POST['imageData'];
		$arr_data = explode(",",$data);
		$base_data = base64_decode($arr_data[1]);
		file_put_contents("brit.png",$base_data);
		echo 'successfully created image';
	}
?>