<?php

require_once(realpath( dirname( __FILE__ ) ) . "/lego/DatabaseLego.php");

if($GLOBALS['CONNECTION'] == null){
	ConnectDB();
}

$temp = $_REQUEST['temp'];
$light = $_REQUEST['light'];
$device = $_REQUEST['device'];

// Get plant id based on device

$getPlantSQL = "SELECT `id` FROM `". $GLOBALS['DB']."`.`user_plants` WHERE `device` = '" . $device . "'";
$getQuery = mysql_query($getPlantSQL) or die('Error getting plant ' . mysql_error());
$plantID = -1;
while($getResults = mysql_fetch_assoc($getQuery)){
	$plantID = $getResults["id"];
}

if($plantID == -1){
	die();
}

$lightSQL = "INSERT INTO `" . $GLOBALS['DB'] . "`.`user_plant_stats` (`pid`, `key`, `value`, `timestamp`) VALUES ('" . $plantID . "', 'light', '" . $light . "', CURRENT_TIMESTAMP);";
mysql_query($lightSQL) or die('Died writing light ' . mysql_error());
$tempSQL = "INSERT INTO `" . $GLOBALS['DB'] . "`.`user_plant_stats` (`pid`, `key`, `value`, `timestamp`) VALUES ('" . $plantID . "', 'temperature', '" . $temp . "', CURRENT_TIMESTAMP);";
mysql_query($tempSQL) or die('Died writing temp ' . mysql_error());


// Check status here

// ?>