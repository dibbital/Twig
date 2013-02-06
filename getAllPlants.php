<?php

	require_once('lego/DatabaseLego.php');
	ConnectDB();
	
	function getAllPlants($page){
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
		$query = mysql_query('SELECT `key`,`value` FROM plants WHERE `key` = "family" GROUP BY pid');/*Limit for right now*/
		$types = array();

		while($result = mysql_fetch_assoc($query)){
			echo "YES";
			$type = $result['value'];
			array_push($types, $type);
		}

		$types = array_unique($types);
		

		$html = "<option value='-'></option>";

		foreach($types as $type){
			$html .= "<option value='".$type."'>$type</option>";
		}

		echo $html;

	}

?>