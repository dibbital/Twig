<?php
// Plant lego

error_reporting(E_ALL);
 ini_set("display_errors", 1);


require_once(realpath( dirname( __FILE__ ) ) . "/DatabaseLego.php");


/* # Not Used */
function getDefaultPhotos($name)
{
	$name = str_replace(" ", "%20", $name);
	// Get default from plants.usda.gov
	$dom = new domDocument;

	$string = file_get_contents('http://plants.usda.gov/java/imageGallery?txtparm=' . $name . '&familycategory=all&sort=comname&viewsort=100&stateSelect=all&location=all&submit.y=10&submit.x=24&origin=all&growthhabit=all&copyright=all&cite=all&duration=all&category=sciname&page=1&wetland=all&artist=all&imagetype=all');

	/*** load the html into the object ***/
	$dom->loadHTML($string);
	/*** discard white space ***/
	$dom->preserveWhiteSpace = false;
	$images = $dom->getElementsByTagName('img');
	$i = 0;
	$returnArray = array();
	foreach($images as $img)
	{

		$url = $img->getAttribute('src');	
		$alt = $img->getAttribute('alt');	
		echo "Title: $alt<br>$url<br>";
		$returnArray[$i]["url"] = 'http://plants.usda.gov/' . $url;
		$returnArray[$i]["alt"] = $alt;
		$i += 1;
	}
	echo json_encode($returnArray);
}



function getDefaultPhotosString($name)
{
	$name = str_replace(" ", "%20", $name);
	$dom = new domDocument;
	// Returns the search page html
	$string = file_get_contents('http://plants.usda.gov/java/imageGallery?txtparm=' . $name . '&familycategory=all&sort=comname&viewsort=100&stateSelect=all&location=all&submit.y=10&submit.x=24&origin=all&growthhabit=all&copyright=all&cite=all&duration=all&category=sciname&page=1&wetland=all&artist=all&imagetype=all');
	echo $string;
}

function getScientificName($pid){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$deepQuery = mysql_query("SELECT * FROM `plants` WHERE `pid` = '" . $pid . "' AND `key` LIKE 'latin_name' LIMIT 0, 5 ") or die('error getting scientific name: ' . mysql_error());
	while ($result = mysql_fetch_array($deepQuery)){
		echo $result["value"];
	}
}

function getCommonName($pid){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$deepQuery = mysql_query("SELECT * FROM `plants` WHERE `pid` = '" . $pid . "' AND `key` LIKE 'common_name' LIMIT 0, 5 ") or die('error getting common name: ' . mysql_error());
	while ($result = mysql_fetch_array($deepQuery)){
		return $result["value"];
	}
}

function getAllPlants($page){
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}
		$query = mysql_query("SELECT `key` FROM `plants` WHERE `key` = 'common_name' GROUP BY pid");
		$num_rows = mysql_num_rows($query);

		$count = 15;
		$offset = ($page - 1)*$count;
		$totalPages = ceil($num_rows/$count);

		$query = mysql_query("SELECT `key`,`pid`, `value` FROM `plants` WHERE `key` = 'common_name' GROUP BY pid LIMIT $offset ,$count");/*Limit for right now*/
		$plants = array();

		while($result = mysql_fetch_assoc($query)){
			//echo mysql_num_rows($query);
			$plant = array();
			$plant['pid'] = $result['pid'];
			$plant['common_name'] = $result['value'];
			$plantQuery = mysql_query('SELECT `value` FROM plants WHERE `key` = "latin_name" AND pid='.$result['pid']);
			while($plantResults = mysql_fetch_assoc($plantQuery)){
				$plant['latin_name'] = $plantResults['value'];
			}
			array_push($plants,$plant);
		}

		//print_r($plants);

		$html = "";
		$img = "<img src='http://placekitten.com/150/150' />";
		foreach($plants as $plant){
			$name = $plant['common_name'];
			$type = $plant['latin_name'];
			$id = $plant['pid'];

			$html .= "<li data-page='$page' data-plant-id='$id' data-total='$totalPages'>
						$img
						<h2>$name</h2>
						<h3>$type</h3>
					 </li>";
		}

		echo $html;
	}

	function getFamilyTypes(){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}
	
		$query = mysql_query('SELECT `key`,`value` FROM plants WHERE `key` = "family" GROUP BY pid');/*Limit for right now*/
		$types = array();

		while($result = mysql_fetch_assoc($query)){
			$type = $result['value'];
			array_push($types, $type);
		}

		$types = array_unique($types);
		//print_r($types);

		$html = "<option value='-'></option>";

		foreach($types as $type){
			$html .= "<option value='".$type."'>$type</option>";
		}

		echo $html;

	}


	function getFunFacts($pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$funSQL = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`plants` WHERE (`key` = 'uses_notes' OR `key` = 'synonyms' OR `key` = 'edible_uses') AND `pid` = '" . $pid . "'";
		$info = array();
		$funQuery = mysql_query($funSQL) or die('Error getting fun: ' . mysql_error());
		while($funResults = mysql_fetch_assoc($funQuery)){
			$key = $funResults["key"];
			$value = $funResults["value"];
			$info[$key] = $value;
		}

		return $info;
	}

	function printFunFacts($pid){
		$info = getFunFacts($pid);

		foreach($info as $key => $value){
			$key = str_replace("_", " ", $key);
			if($value != "None known")
			{
				echo "<li><span>$key</span> - $value</li>";
			}
		}
	}

	function deletePlant($uid, $pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$deleteSQL = "DELETE FROM `" . $GLOBALS['DB'] . "`.`user_plants` WHERE `user_plants`.`uid` = '" . $uid . "' AND `user_plants`.`id` = '" . $pid . "'";
		$deleteQuery = mysql_query($deleteSQL) or die('Error deleting: ' . mysql_error());

		echo "success";
	}


?>
