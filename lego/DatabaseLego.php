<?php

//Lego for database connection
if($_SERVER['SERVER_NAME'] == 'localhost'){
	$GLOBALS['HOST'] = "localhost";
	$GLOBALS['DB'] = "twig";
	$GLOBALS['DB_USER'] = "root";
	$GLOBALS['DB_PASS'] = "root";
}else{
	$GLOBALS['HOST'] = "cias.rit.edu";
	$GLOBALS['DB'] = "twig";
	$GLOBALS['DB_USER'] = "twig";
	$GLOBALS['DB_PASS'] = "geoZ3t00dom";
}
	
$GLOBALS['CONNECTION'] = null;
date_default_timezone_set('America/New_York');
function ConnectDB()
{
	$GLOBALS['CONNECTION'] = mysql_connect($GLOBALS['HOST'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS']);
	mysql_select_db($GLOBALS['DB'], $GLOBALS['CONNECTION']) or die("Error connecting to DB - " . mysql_error());
}

function newPlant($data){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}
	$data = json_decode($data);
	// What the hell is this bracket shit? Welcome to PHP
	$userID = $data->{'uid'};
	$plantTypeID = $data->{'plantTypeID'};
	$plantNickname = $data->{'name'};
	$deviceID = $data->{'device'};

	$insertSQL = "INSERT INTO `" . $GLOBALS['DB'] . "`.`user_plants` (`uid`, `type`, `name`, `device`) VALUES ('" . $userID . "', '" . $plantTypeID . "', '" . $plantNickname . "', '" . $deviceID . "')";
	$insertQuery = mysql_query($insertSQL) or die("Error in insertQuery: " . mysql_error());

	$plantID = mysql_insert_id();

	$plantImg = $data->{'plantImg'};

	if(!empty($plantImg)){
		$moreSQL = "INSERT INTO `" . $GLOBALS['DB'] . "`.`user_plant_stuff` (`uid`, `pid`, `key`, `value`) VALUES ('" . $userID . "', '" . $plantID . "', 'imgPath', '" . $plantImg . "')"; 
		$moreQuery = mysql_query($moreSQL) or die("Error inserting more: " . mysql_error());
	}
	$response = array();
	$response['return'] = "success";
	$response['id'] = $plantID;
	echo json_encode($response);

}


function getCurrentPlantStats($plantID){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$info = array();


	// Temperature
	$tempSQL = "SELECT * FROM `user_plant_stats` WHERE `pid` = '" . $plantID . "' AND `key` LIKE 'temperature' ORDER BY `timestamp` DESC LIMIT 1 ";
	$tempQuery = mysql_query($tempSQL) or die("Error getting temperature: " . mysql_error());

	while($tempResults = mysql_fetch_assoc($tempQuery)){
		$key = $tempResults["key"];
		$val = $tempResults["value"];
		$info["temp"] = $val;
	}

	// Light
	$lightSQL = "SELECT * FROM `user_plant_stats` WHERE `pid` = '". $plantID ."' AND `key` LIKE 'light' ORDER BY `timestamp` DESC LIMIT 1 ";
	$lightQuery = mysql_query($lightSQL) or die("Error getting light: " . mysql_error());

	while($lightResults = mysql_fetch_assoc($lightQuery)){
		$key = $lightResults["key"];
		$val = $lightResults["value"];
		$info["light"] = $val;
	}
/*
	// Moisture
	$moistSQL = "SELECT * FROM `user_plant_stats` WHERE `pid` = 11 AND `key` LIKE 'moisture' LIMIT 1 ";
	$moistQuery = mysql_query($moistSQL) or die("Error getting moisture: " . mysql_error());

	while($moistResults = mysql_fetch_assoc($moistQuery)){
		$key = $moistResults["key"];
		$val = $moistResults["value"];
		$info[$key] = $val;
	}*/

	echo json_encode($info);

	//$sql = "SELECT * FROM `user_plant_stats` WHERE `pid` = 11 AND `key` LIKE \'temperature\' LIMIT 0, 30 ";

}
/*

## Outdated - used for generating database
function writePlantDB($pid, $key, $value){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$create = "INSERT INTO `" . $GLOBALS['DB'] . "`.`plants` (`id`, `pid`, `key`, `value`, `timestamp`) VALUES (NULL, '" . $pid . "', '" .$key . "', '" . mysql_real_escape_string($value) . "', NULL);";
	$sql = mysql_query($create) or die("Error creating in writePlantDB:" . mysql_error() . " - query: " . $create);
}
*/


?>