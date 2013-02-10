<?php

	require_once('lego/DatabaseLego.php');
	ConnectDB();
	
	function getAllPlants(){

		$query = mysql_query('SELECT * FROM plants GROUP BY pid');/*Limit for right now*/
		$plants = array();

		while($result = mysql_fetch_assoc($query)){
			$plant = array();
			$plantQuery = mysql_query('SELECT * FROM plants WHERE pid='.$result['pid']);
			while($plantResults = mysql_fetch_assoc($plantQuery)){
				$plant[$plantResults['key']] = $plantResults['value'];
			}
			array_push($plants,$plant);
		}

		$index = -1;
		foreach($plants as $plant){
			$index++;
			if(!array_key_exists('common_name', $plant) || !array_key_exists('latin_name', $plant)){
				array_splice($plants, $index,1);
				$index--;
			}
		}

		$html = "";
		$img = "<img src='http://placekitten.com/150/150' />";
		foreach($plants as $plant){
			$name = $plant['common_name'];
			$type = $plant['latin_name'];

			$html .= "<li>
						$img
						<h2>$name</h2>
						<h3>$type</h3>
					 </li>";
		}

		$html.="</ul>";

		echo $html;
	}

	function getFamilyTypes(){
		$query = mysql_query('SELECT * FROM plants GROUP BY pid');/*Limit for right now*/
		$plants = array();

		while($result = mysql_fetch_assoc($query)){
			$plant = array();
			$plantQuery = mysql_query('SELECT * FROM plants WHERE pid='.$result['pid']);
			while($plantResults = mysql_fetch_assoc($plantQuery)){
				$plant[$plantResults['key']] = $plantResults['value'];
			}
			array_push($plants,$plant);
		}

		$types = array();
		foreach($plants as $plant){
			if(array_key_exists('family',$plant)){
				$type = $plant['family'];
				array_push($types,$type);
			}
		}

		$types = array_unique($types);
		print_r($types);

		$html = "<option value='-'></option>";

		foreach($types as $type){
			$html .= "<option value='".$type."'>$type</option>";
		}

		echo $html;

	}

?>