<?php

//Lego for database connection
if($_SERVER['SERVER_NAME'] == 'localhost'){
	$GLOBALS['HOST'] = "localhost";
	$GLOBALS['DB'] = "LOL";
	$GLOBALS['TABLE'] = "LOL";
	$GLOBALS['DB_USER'] = "root";
	$GLOBALS['DB_PASS'] = "root";
}else{
	$GLOBALS['HOST'] = "50.63.236.61";
	$GLOBALS['DB'] = "arm9167lol";
	$GLOBALS['TABLE'] = "arm9167lol";
	$GLOBALS['DB_USER'] = "arm9167lol";
	$GLOBALS['DB_PASS'] = "Hunter2!";
}
	
$GLOBALS['CONNECTION'] = null;

function ConnectDB()
{
	// $GLOBALS['CONNECTION'] = mysql_connect("50.63.236.61","arm9167lol","Hunter2!") or die("Can not connect to server. - " . mysql_error());
	// $GLOBALS['CONNECTION'] = mysql_connect("localhost", "root", "root") or die("no db");
	$GLOBALS['CONNECTION'] = mysql_connect($GLOBALS['HOST'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS']);
	mysql_select_db($GLOBALS['DB'], $GLOBALS['CONNECTION']) or die("Error connecting to DB - " . mysql_error());
}

function writeDB($postType, $key, $value, $entryID)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$kind = "#";
	$idType = "id";
	switch($postType){
		case 'posts':
			$kind = "post_things";
			break;
		case 'post_things':
			$kind = "post_things";
			$idType = "pid";
			break;
		case 'users':
		case 'user_things':
			$kind = "users";
			break;
		default:
			return false;
			break;
	}


	//If there's an entry for this already, modify the query to update instead of insert
	$update = false;
	$check = "SELECT id FROM `" . $GLOBALS['TABLE'] . "`.`" . $kind . "` WHERE `" . $idType . "` = '" . $entryID . "' AND `key` = '" . $key . "'";
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

		$sql = "UPDATE `" . $GLOBALS['TABLE'] . "`.`" . $kind . "` SET `key` =" . $key . "` = '" . $value . "' WHERE `" . $kind . "`.`id` = " . $entryID;
	}else{
		$sql = "INSERT INTO `" . $GLOBALS['TABLE'] . "`.`" . $kind . "` (`id`, `pid`, `key`, `value`) VALUES (NULL, '" . $entryID . "', '" . $key . "', '" . $value . "')";
		// $sql = "INSERT INTO `" . $GLOBALS['TABLE'] . "`.`" . $kind . "` (`" . $key . "`) VALUES ('" . $value . "')";
	}

	mysql_query($sql) or die("Error with query : " . mysql_error() . " - query: " . $sql);
}

function readDB($kind, $id, $key)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$sql = "SELECT " . $key . " FROM `" . $kind . "` WHERE `id` = " . $key . " LIMIT 1 ";
	mysql_query($sql) or die("Error readDB: " . mysql_error());
}

// Extended helper functions --------------------------
function createNewPost($authID, $imgPath)
{
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}
	$create = "INSERT INTO `" . $GLOBALS['TABLE'] . "`.`posts` (`id`, `uid`) VALUES (NULL, '" . $authID . "');";
	$sql = mysql_query($create) or die("Error posting in createNewPost:" . mysql_error() . " - query: " . $create);
	$insertedID = mysql_insert_id();

	$insert = "INSERT INTO `" . $GLOBALS['TABLE'] . "`.`post_things` (`id`, `pid`, `key`, `value`) VALUES (NULL, '" . $insertedID . "', 'path', '" . $imgPath . "')";
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
        . " FROM `" . $GLOBALS['TABLE'] . "`.`posts` ORDER BY `id` DESC LIMIT 0, " . $num;
        // . " JOIN `" . $GLOBALS['TABLE'] . "`.`post_things`
	$selectQuery = mysql_query($select) or die("Error in getPosts: " . mysql_error());
	while($results = mysql_fetch_array($selectQuery)){
		$info = array();
		$info['time'] = $results['time'];
		$userSQL = "SELECT `display_name` FROM `" . $GLOBALS['TABLE'] . "`.`uc_users` WHERE `id` = " . $results['uid'];
		$userQuery = mysql_query($userSQL) or die("Error getting user: " . mysql_error());
		while($userResults = mysql_fetch_assoc($userQuery)){
			$info["user"] = $userResults["display_name"];
		}
	
		$more = "SELECT * FROM `" . $GLOBALS['TABLE'] . "`.`post_things` WHERE `pid` = " . $results['id'] . "";
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

?>