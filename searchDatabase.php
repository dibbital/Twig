<?php

	require_once('lego/DatabaseLego.php');
	ConnectDB();

	$count = 9;
	$page = $_REQUEST['page'];
	$offset = ($page - 1)*$count;

	$plantName = strtolower(mysql_real_escape_string($_GET['plantName']));

	$query = mysql_query("SELECT * FROM  `plants` WHERE  `key` =  'common_name' AND  `value` LIKE  '%$plantName%'");
	$num_rows = mysql_num_rows($query);

	$totalPages = ceil($num_rows/$count);

	$query = mysql_query("SELECT * FROM  `plants` WHERE  `key` =  'common_name' AND  `value` LIKE  '%$plantName%' LIMIT $offset,$count");

	$num_rows = mysql_num_rows($query);
	$plants = array('page'=>$page, 'total_pages'=>$totalPages, 'num_rows'=>$num_rows, 'plants'=>array());

	if($num_rows != 0){

		while($result = mysql_fetch_assoc($query)){
			$plant = array();
			$plantQuery = mysql_query('SELECT * FROM plants WHERE pid='.$result['pid']);
			while($plantResults = mysql_fetch_assoc($plantQuery)){
				$plant[$plantResults['key']] = $plantResults['value'];
			}
			array_push($plants['plants'],$plant);
		}

		if(array_key_exists('plantSize', $_REQUEST)){
			$index = -1;
			foreach($plants['plants'] as $plant){
				$index++;
				//echo $index;
				$size = strtolower($_REQUEST['plantSize']);
				if(array_key_exists('height', $plant)){
					if($index < 0) $index = 0;
					$plantSize = $plant['height'];
					switch($size){
						case 'small': if($plantSize > 10){
							array_splice($plants['plants'], $index,1);
							$plants['num_rows'] = $plants['num_rows'] - 1;
							$index--;
						} 
							break;
						case 'medium': if($plantSize < 10 || $plantSize > 30){
							array_splice($plants['plants'], $index,1);
							$plants['num_rows'] = $plants['num_rows'] - 1;
							$index--;
						}
							break;

						case 'large': if($plantSize < 30){
							array_splice($plants['plants'], $index,1);
							$plants['num_rows'] = $plants['num_rows'] - 1;
							$index--;
						}
							break;

						default:    array_splice($plants['plants'], $index,1);
									break;
					}
				}
			}
		}

		if(array_key_exists('plantType', $_REQUEST)){
			$index = -1;
			foreach($plants['plants'] as $plant){
				$index++;
				//echo $index;
				$type = $_REQUEST['plantType'];
				if(array_key_exists('family', $plant)){
					if($index < 0) $index = 0;
					$plantType = $plant['family'];
					if($plantType != $type){
						array_splice($plants['plants'], $index,1);
						$plants['num_rows'] = $plants['num_rows'] - 1;
						$index--;
					}
				}else{
					array_splice($plants['plants'], $index,1);
					$plants['num_rows'] = $plants['num_rows'] - 1;
					$index--;
				}
			}
		}

		if(array_key_exists('plantMaintenance', $_REQUEST)){
			$index = -1;
			foreach($plants['plants'] as $plant){
				$index++;
				//echo $index;
				$level = strtolower($_REQUEST['plantMaintenance']);
				if(array_key_exists('soil', $plant)){
					if($index < 0) $index = 0;
					$soilLevel = $plant['soil'];
					switch($level){
						case 'low': //echo $soilLevel;
									if(strlen($soilLevel) != 1){
										array_splice($plants['plants'], $index,1);
										$plants['num_rows'] = $plants['num_rows'] - 1;
										$index--;
									}
									break;

						case 'medium': 
									if(strlen($soilLevel) != 2){
										array_splice($plants['plants'], $index,1);
										$plants['num_rows'] = $plants['num_rows'] - 1;
										$index--;
									}
									break;

						case 'high': 
									if(strlen($soilLevel) != 3){
										array_splice($plants['plants'], $index,1);
										$plants['num_rows'] = $plants['num_rows'] - 1;
										$index--;
									}
									break;
					}
				}else{
					array_splice($plants['plants'], $index,1);
					$plants['num_rows'] = $plants['num_rows'] - 1;
					$index--;
				}
			}
		}

		echo json_encode($plants);

	}else{
		echo json_encode($plants);
	}

	

?>