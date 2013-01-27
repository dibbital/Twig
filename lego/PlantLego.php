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

?>
