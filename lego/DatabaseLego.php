<?php

//Lego for database connection
if($_SERVER['SERVER_NAME'] == 'localhost'){
	$GLOBALS['HOST'] = "localhost";
	$GLOBALS['DB'] = "dibbital";
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

	$insertSQL = "INSERT INTO `" . $GLOBALS['DB'] . "`.`user_plants` (`uid`, `type`, `name`) VALUES ('" . $userID . "', '" . $plantTypeID . "', '" . $plantNickname . "')";
	$insertQuery = mysql_query($insertSQL) or die("Error in insertQuery: " . mysql_error());

	$plantID = mysql_insert_id();
	$response = array();
	$response['return'] = "success";
	$response['id'] = $plantID;
	echo json_encode($response);

	// other stuff would be inserted to `user_plant_stuff`
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