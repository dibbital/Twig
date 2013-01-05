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

		$deepSQL = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE `pid` = '" . $info["typeid"] . "'";
		$deepQuery = mysql_query($deepSQL) or die("Error getting deep plant info");
		while($deepResults = mysql_fetch_assoc($deepQuery)){
			$key = $deepResults["key"];
			$val = $deepResults["value"];
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

	echo "
	<li data-plant-id=\"" . $plantID . "\"><img src=\"http://placekitten.com/150/150\" />";

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
/*

function writePlantDB($pid, $key, $value){
	

	if(empty($value) || $key == "created_at" || $key == "author" || $key == "updated_at" || $key == "record_checked"){
		return;
	}

	$create = "INSERT INTO `" . $GLOBALS['DB'] . "`.`plants` (`id`, `pid`, `key`, `value`, `timestamp`) VALUES (NULL, '" . $pid . "', '" .$key . "', '" . mysql_real_escape_string($value) . "', NULL);";
	$sql = mysql_query($create) or die("Error creating in writePlantDB:" . mysql_error() . " - query: " . $create);
} 

function writeDB($assetType, $key, $value, $entryID)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$table = "#";
	$idType = "id";
	// By default, $idType is 'id'
	// However, in some instances we may need to reference pid instead
	switch($assetType){
		case 'user_plants':
			$table = "user_plants";
			$idType = "pid";
			break;
		case 'plants':
			$table = "plants";
			break;
		default:
			return false;
			die();
			break;
	}


	//If there's an entry for this already, modify the query to update instead of insert
	$check = "SELECT id FROM `" . $GLOBALS['DB'] . "`.`" . $table . "` WHERE `" . $idType . "` = '" . $entryID . "' AND `key` = '" . $key . "'";
	$query = mysql_query($check) or die("Died checking 1: " . mysql_error() . " - query: " . $check);
	$update = false;
	while($update = mysql_fetch_assoc($query)){
		if($update['id'] != null){
			$update = true;
		}else{
			$update = false;
		}
	}

	if($update){

		$sql = "UPDATE `" . $GLOBALS['DB'] . "`.`" . $table . "` SET `key` =" . $key . "` = '" . $value . "' WHERE `" . $table . "`.`id` = " . $entryID;
	}else{
		if($table == "plants"){
			// $sql = "INSERT INTO `" . $GLOBALS['DB'] . "`.`" . $table . "` (`id`, `pid`, `key`, `value`, `timestamp`) VALUES (NULL, '" . $entryID . "', '" . $key . "', '" . $value . "')";
		}else if($table == "user_plants"){

		}
		echo "died cause this isn't a new update";
		die();
		// $sql = "INSERT INTO `" . $GLOBALS['TABLE'] . "`.`" . $table . "` (`" . $key . "`) VALUES ('" . $value . "')";
	}

	mysql_query($sql) or die("Error with query : " . mysql_error() . " - query: " . $sql);
}

function readDB($table, $id, $key)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$sql = "SELECT " . $key . " FROM `" . $table . "` WHERE `id` = " . $key . " LIMIT 1 ";
	mysql_query($sql) or die("Error readDB: " . mysql_error());
}

// Extended helper functions --------------------------
// $userID = user who owns the plant
// $type = plant ID from the plant database
function createNewPlant($userID, $type)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}
	$create = "INSERT INTO `" . $GLOBALS['DB'] . "`.`user_plants` (`id`, `uid`, `type`, `timestamp`) VALUES (NULL, '" . $userID . "', '" . $type ."', );";
	$sql = mysql_query($create) or die("Error creating in createNewPlant:" . mysql_error() . " - query: " . $create);
	$insertedID = mysql_insert_id();

	$insert = "INSERT INTO `" . $GLOBALS['DB'] . "`.`plant_things` (`id`, `pid`, `key`, `value`) VALUES (NULL, '" . $insertedID . "', 'path', '" . $imgPath . "')";
	mysql_query($insert) or die("Error inserting in createNewPlant:" . mysql_error() . " - query: " . $insert);

	return $insertedID;
}



function createNewPost($authID, $imgPath)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}
	$create = "INSERT INTO `" . $GLOBALS['DB'] . "`.`posts` (`id`, `uid`) VALUES (NULL, '" . $authID . "');";
	$sql = mysql_query($create) or die("Error posting in createNewPost:" . mysql_error() . " - query: " . $create);
	$insertedID = mysql_insert_id();

	$insert = "INSERT INTO `" . $GLOBALS['DB'] . "`.`post_things` (`id`, `pid`, `key`, `value`) VALUES (NULL, '" . $insertedID . "', 'path', '" . $imgPath . "')";
	mysql_query($insert) or die("Error inserting in createNewPost:" . mysql_error() . " - query: " . $insert);

	return $insertedID;
}

function getPosts($num = 25)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}
	// $select = "SELECT `id` FROM `" . $GLOBALS['TABLE'] . "`.`posts` LIMIT " . $num;


	$select = "SELECT *"
        . " FROM `" . $GLOBALS['DB'] . "`.`posts` ORDER BY `id` DESC LIMIT 0, " . $num;
        // . " JOIN `" . $GLOBALS['TABLE'] . "`.`post_things`
	$selectQuery = mysql_query($select) or die("Error in getPosts: " . mysql_error());
	while($results = mysql_fetch_array($selectQuery)){
		$info = array();
		$info['time'] = $results['time'];
		$userSQL = "SELECT `display_name` FROM `" . $GLOBALS['DB'] . "`.`uc_users` WHERE `id` = " . $results['uid'];
		$userQuery = mysql_query($userSQL) or die("Error getting user: " . mysql_error());
		while($userResults = mysql_fetch_assoc($userQuery)){
			$info["user"] = $userResults["display_name"];
		}
	
		$more = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`post_things` WHERE `pid` = " . $results['id'] . "";
		$moreQuery = mysql_query($more) or die("Error getting more: " . mysql_error());
		
		while($resultsAgain = mysql_fetch_assoc($moreQuery)){
			$key = $resultsAgain["key"];
			$val = $resultsAgain["value"];
			$info[$key] = $val;
		}
		printPost($info);
	}

	mysql_free_result($selectQuery);

	//return as json_encoded array?
	//or just print and then let js take over templating?
}

function printPost($data)
{
	$imgPath = $data['path'];
	$exif = $data['exif'];
	$user = $data['user'];
	$time = $data['time'];

	$colors = $data['color'];

	echo "
	<div class=\"thing\">
		<div class=\"info\">
		<h2>" . $user . "</h2>
			<span class=\"date\">$time</span>
			
		</div>
		<div class=\"content\">
			<img src=\"". $imgPath  . "\" data-exif=\"" . $exif . "\"";

	if($data['color'] != null){
			$newColors = json_decode($data['color']);
			for($i = 0; $i < count($newColors,0); $i++){
				echo " data-color" . ($i+1) . "=\"" . $newColors[$i][0] . "," . $newColors[$i][1] . "," . $newColors[$i][2] . "\"";
			}
			echo " data-count=\"" . count($newColors, 0) . "\"";
		}

			echo "/>
			<div class=\"location\">
				<div class=\"map\" data-loc=\"" . $exif . "\"></div>
			</div>
		</div>
	</div>
	";
}
*/
?>