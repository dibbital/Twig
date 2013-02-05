<?php

//Lego for Notification helpers

require_once("DatabaseLego.php");
if($GLOBALS['CONNECTION'] == null)
{
	ConnectDB();
}

function getPlantRightValues($plantID)
{
	if($GLOBALS['CONNECTION'] == null)
	{
		ConnectDB();
	}

	$info = array();


	// light
	$lightRightSQL = "SELECT * FROM `plants` WHERE `pid` = '" . $plantID . "' AND `key` LIKE 'Shade' LIMIT 1 ";
	$lightRightQuery = mysql_query($lightRightSQL) or die("Error getting light: " . mysql_error());

	while($lightRightResults = mysql_fetch_assoc($lightRightQuery))
	{
		$key = $lightRightResults["key"];
		$val = $lightRightResults["value"];
		$info["lightRight"] = $val;
	}

	// Temp
	$tempRightSQL = "SELECT * FROM `plants` WHERE `pid` = '". $plantID ."' AND `key` LIKE 'hardyness' LIMIT 1 ";
	$tempRightQuery = mysql_query($tempRightSQL) or die("Error getting light: " . mysql_error());

	while($tempRightResults = mysql_fetch_assoc($tempRightQuery)){
		$key = $tempRightResults["key"];
		$val = $tempRightResults["value"];
		$info["tempRight"] = $val;
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