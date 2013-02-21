<?php
// Settings pane lego

error_reporting(E_ALL);
 ini_set("display_errors", 1);


require_once(realpath( dirname( __FILE__ ) ) . "/DatabaseLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/PlantLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/UserCakeLego.php");

	function getAndPrintSettings($uid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}
		
		$getQuery = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`user_plants` WHERE `uid` = '" . $uid . "' LIMIT 0, 50";
		$getSQL = mysql_query($getQuery) or die("Error getting plants: " . mysql_error());
		$sallGoodBaby = true;
		while($result = mysql_fetch_assoc($getSQL)){
			$info = array();
			printSettings($uid, $result["id"], $result["name"], $result["type"]);	
		}
	}

	function getSettings($uid, $pid){
		if($GLOBALS['CONNECTION'] == null){
			ConnectDB();
		}

		$settingsSQL = "SELECT * FROM `" . $GLOBALS['DB'] . "`.`user_plant_settings` WHERE `pid` = '" . $pid . "' AND `uid` = '" . $uid . "'";
		$info = array();
		$setQuery = mysql_query($settingsSQL) or die('Error getting fun: ' . mysql_error());
		while($setResults = mysql_fetch_assoc($setQuery)){
			$key = $setResults["key"];
			$value = $setResults["value"];
			$info[$key] = $value;
		}

		return $info;
	}

	function printSettings($uid, $pid, $name, $typeid){
		
		echo "
		<li class=\"plant\" data-uid=\"" . $uid . "\" data-pid=\"" . $pid . "\" data-plant-nickname=\"" . $name . "\" data-plant-type=\"" .  getCommonName($typeid) . "\"><h2 class=\"name button\">" . $name . " <span>(" . getCommonName($typeid) . ")</span></h2>
			<ul class=\"sub\">";

			$info = getSettings($uid, $pid);

			foreach($info as $key => $value){
				$key = str_replace("_", " ", $key);
				echo "<li class='plant$key'><span class='key'>" . $key . "</span><span class=\"value\">" . ucfirst($value) . "</span></li>";
			}

		echo "
			<li data-value=\"alert\" class=\"button green \">Set Alert Type</li>
			<li class=\"button red\">Delete</li>
			</ul>
		</li>
		";
	}

?>
