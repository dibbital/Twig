<?php

//Lego for Dashboard helpers

require_once("DatabaseLego.php");
if($GLOBALS['CONNECTION'] == null){
	ConnectDB();
}

function getPlants($user)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$getQuery = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`user_plants` WHERE `uid` = '" . $user . "' LIMIT 0, 50";
	$getSQL = mysql_query($getQuery) or die("Error getting plants: " . mysql_error());
	$sallGoodBaby = true;
	while($result = mysql_fetch_assoc($getSQL)){
		$sallGoodBaby = false;
		$info = array();

		$info["plantid"] = $result["id"];
		$info["typeid"] = $result["type"];
		$info["created"] = $result["timestamp"];
		$info["name"] = $result["name"];

		$deepSQL = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = '" . $info["typeid"] . "' AND (`key` = 'common_name' OR `key` = 'latin_name')";
		$deepQuery = mysql_query($deepSQL) or die("Error getting deep plant info " . mysql_error());
		while($deepResults = mysql_fetch_assoc($deepQuery)){
			$key = $deepResults["key"];
			$val = $deepResults["value"];
			$info[$key] = $val;
		}


		$deeperSQL = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`user_plant_stuff` WHERE `pid` = '" . $info["plantid"] . "' AND `uid` = '" . $user . "'";
		$deeperQuery = mysql_query($deeperSQL) or die("Error getting deeper dashboard info " . mysql_error());
		while($deeperResults = mysql_fetch_assoc($deeperQuery)){
			$key = $deeperResults["key"];
			$val = $deeperResults["value"];
			$info[$key] = $val;
		}
		printPlant($info);
	}

	if($sallGoodBaby){
		echo "<h2>What the heck? You ain't got none plants!</h2>";
	}
	//echo json_encode($info);
}


function printPlant($data)
{
	// var_dump($data);
	$name = $data['name'];
	$plantType = (array_key_exists('common_name', $data) ? $data['common_name'] : $data['latin_name']);
	$plantID = $data['plantid'];
	$created = date("F j, Y, g:i a", strtotime($data['created']));
	$img = "http://placekitten.com/150/150";
	if(!empty($data['imgPath'])){
		$img = $data['imgPath'];
	}
	echo "
	<li data-plant-id=\"" . $plantID . "\" data-plant-name=\"" . ($data['latin_name'] ? $data['latin_name'] : $plantType) . "\"><img src=\"" . $img . "\" />";

	if(empty($name)){
		echo "<h2>" . $plantType . "</h2>";
		echo "<h3>" . $created . "</h3>";
	}else{
		echo "<h2>" . $name . "</h2>";
		echo "<h3>" . $plantType . "</h3>";
	}
	echo "
		<p class=\"status good\">Good</p>
	</li>
	";
}

function getPlantData($user, $id){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$getQuery = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`user_plants` WHERE `uid` = '" . $user . "' AND `id` = '" . $id . "' LIMIT 0, 50";
	$getSQL = mysql_query($getQuery) or die("Error getting plants: " . mysql_error());
	while($result = mysql_fetch_assoc($getSQL)){
		$info = array();

		$info["plantid"] = $result["id"];
		$info["typeid"] = $result["type"];
		$info["created"] = $result["timestamp"];
		$info["name"] = $result["name"];

		$deepSQL = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = '" . $info["typeid"] . "' AND (`key` = 'common_name' OR `key` = 'latin_name')";
		$deepQuery = mysql_query($deepSQL) or die("Error getting deep plant info " . mysql_error());
		while($deepResults = mysql_fetch_assoc($deepQuery)){
			$key = $deepResults["key"];
			$val = $deepResults["value"];
			$info[$key] = $val;
		}


		$deeperSQL = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`user_plant_stuff` WHERE `pid` = '" . $info["plantid"] . "' AND `uid` = '" . $user . "'";
		$deeperQuery = mysql_query($deeperSQL) or die("Error getting deeper dashboard info " . mysql_error());
		while($deeperResults = mysql_fetch_assoc($deeperQuery)){
			$key = $deeperResults["key"];
			$val = $deeperResults["value"];
			$info[$key] = $val;
		}
		// printPlant($info);
		return $info;
	}
}

?>