<?php

//Lego for handling file uploads

// Upload function, pass in $_FILES["fileName"] as arg
function upload($file_) {
	$file = $file_;
	$allowedExts = array("jpg", "jpeg", "gif", "png");
	$extension = end(explode(".", $file["name"]));
	if((($file["type"] == "image/gif") || ($file["type"] == "image/jpeg") || ($file["type"] == "image/png") || ($file["type"] == "image/pjpeg")) && ($file["size"] < 20000) && in_array($extension, $allowedExts)) {
		if($file["error"] > 0) {
			echo "ERROR! ".$file["error"]."<br />";
		} else {
			if(file_exists("uploads/".$file["tmp_name"])) {
				echo $file["tmp_name"]." already exists. ";
			} else {
				move_uploaded_file($file["tmp_name"], "uploads/".$file["tmp_name"]);
				echo "Saved in: "."uploads/".$file["tmp_name"];
			}
		}
	}
}

?>