<?php
	
	error_reporting(E_ALL);
 	ini_set("display_errors", 1);


	require_once(realpath( dirname( __FILE__ ) ) . "/lego/PlantLego.php");

	$page = $_REQUEST['page'];
	echo getAllPlants($page);

?>