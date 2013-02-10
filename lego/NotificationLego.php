<?php

//Lego for Notification helpers

require_once("DatabaseLego.php");
if($GLOBALS['CONNECTION'] == null)
{
	ConnectDB();
}

function getOptimalSettings($plantID)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$info = array();


	// convert user plant id to plant type id
	$getQuery = "SELECT `type` FROM `" . $GLOBALS['DB'] . "`.`user_plants` WHERE `id` = '" . $plantID . "' LIMIT 1";
	$getSQL = mysql_query($getQuery) or die("Error getting plants: " . mysql_error());
	while($result = mysql_fetch_assoc($getSQL)){
		$plantType = $result["type"];
	}

	// light
	$optLightSQL = "SELECT `value` FROM `plants` WHERE `pid` = '" . $plantType . "' AND `key` LIKE 'shade' LIMIT 1 ";
	$optLightQuery = mysql_query($optLightSQL) or die("Error getting light: " . mysql_error());

	while($optLightResults = mysql_fetch_assoc($optLightQuery))
	{
		$info["light"] = $optLightResults["value"];
	}

	// Temp
	$optTempSQL = "SELECT `value` FROM `plants` WHERE `pid` = '". $plantType ."' AND `key` LIKE 'hardyness' LIMIT 1 ";
	$optTempQuery = mysql_query($optTempSQL) or die("Error getting temp: " . mysql_error());

	while($optTempResults = mysql_fetch_assoc($optTempQuery))
	{
		$info["temp"] = $optTempResults["value"];
	}



	// Water
	$optMoistureSQL = "SELECT `value` FROM `plants` WHERE `pid` = '". $plantType ."' AND `key` LIKE 'moisture' LIMIT 1 ";
	$optMoistureQuery = mysql_query($optMoistureSQL) or die("Error getting temp: " . mysql_error());

	while($optMoistureResults = mysql_fetch_assoc($optMoistureQuery))
	{
		$info["moisture"] = $optMoistureResults["value"];
	}

	// Moisture
	/*$moistSQL = "SELECT * FROM `plants` WHERE `pid` =  '". $plantID ."' AND `key` LIKE 'moisture' LIMIT 1 ";
	$moistQuery = mysql_query($moistSQL) or die("Error getting moisture: " . mysql_error());

	while($moistResults = mysql_fetch_assoc($moistQuery)){
		$key = $moistResults["key"];
		$val = $moistResults["value"];
		$info[$key] = $val;
	}
	*/

	echo json_encode($info);

	//$sql = "SELECT * FROM `user_plant_stats` WHERE `pid` = 11 AND `key` LIKE \'temperature\' LIMIT 0, 30 ";

}

?>