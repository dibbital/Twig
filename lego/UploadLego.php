<?php

//Lego for handling file uploads

// Upload function, pass in $_FILES["fileName"] as arg
function upload($file_) {
	$uploadDir = realpath( dirname( __FILE__ )  . "/../uploads/");
	$file = $file_;
	$allowedExts = array("jpg", "jpeg", "gif", "png");
	$explode = explode(".", $file["name"]);
	$extension = end($explode);

	if((($file["type"] == "image/gif") || ($file["type"] == "image/jpeg") || ($file["type"] == "image/png") || ($file["type"] == "image/pjpeg")) && in_array(strtolower($extension), $allowedExts)) {
		if(($file["size"] > 5000000 || $file["size"] <= 0)){
			echo "ERROR! File too big or empty " . $file["size"];
			return;
		}
		if($file["error"] > 0) {
			echo "ERROR! ".$file["error"]."<br />";
		} else {
			if(file_exists($uploadDir . $file["tmp_name"])) {
				echo "ERROR! ".$file["tmp_name"]." already exists. ";
			} else {
				$newName = $explode[0] . "-". time() . "." .$extension;
				move_uploaded_file($file["tmp_name"], $uploadDir . "/" . $newName);

				
				echo  "uploads/" . $newName;
			}
		}
	}else{
		echo json_encode($file);
	}
}

?>