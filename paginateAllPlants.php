<?php
	
	include('getAllPlants.php');

	$page = $_REQUEST['page'];
	echo getAllPlants($page);

?>