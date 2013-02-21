<?php

error_reporting(E_ALL);
 ini_set("display_errors", 1);
require_once(realpath( dirname( __FILE__ ) ) . "/users/models/config.php");
// require_once("users/models/header.php");
require_once(realpath( dirname( __FILE__ ) ) . "/lego/DatabaseLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/lego/UserCakeLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/lego/UploadLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/lego/PlantLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/lego/NotificationLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/lego/AlertLego.php");
ConnectDB();
switch($_REQUEST['a']){
	case 'newPlant':
		newPlant($_REQUEST['data']);
		break;
	case 'getUserStuff':
		$userStuff = array();
		$userStuff['displayName'] = getCurrentDisplayName();
		$userStuff['userName'] = getCurrentUserName();
		$userStuff['userID'] = getCurrentUserID();
		echo json_encode($userStuff);
		break;
	case 'silentUpload':
		upload($_FILES['plantPhoto']);
		break;
	case 'recentStats':
		getAveragePlantStats($_REQUEST['plantID']);
		break;
	case 'currentStats':
		getCurrentPlantStats($_REQUEST['plantID']);
		break;
	case 'getDefaultPhotos':
		getDefaultPhotos($_REQUEST['name']);
		break;
	case 'getDefaultPhotosString':
		getDefaultPhotosString($_REQUEST['name']);
		break;
	case 'savePhoto':
		if (!is_dir(realpath(dirname( __FILE__ )).'/plants/')) {
		    mkdir(realpath( dirname( __FILE__ ) ).'/plants/');
		}
		copy($_REQUEST['fileUrl'], realpath( dirname( __FILE__ ) ).'/plants/' . $_REQUEST['fileName']);
		echo ('/plants/' . $_REQUEST['fileName']);
		break;
	case 'paginateAllPlants':
		$page = $_REQUEST['page'];
		echo getAllPlants($page);
		break;
	case 'getMoreTypes':
		$start = $_REQUEST['start'];
		echo getMoreTypes($start);
		break;
	case 'searchDatabase':
		$page = $_REQUEST['page'];
		echo searchDatabase($page);
		break;
	case 'getCommonName':
		getCommonName($_REQUEST['pid']);
		break;
	case 'getScientificName':
		getScientificName($_REQUEST['pid']);
		break;
	case 'deletePlant':
		deletePlant($_REQUEST['uid'], $_REQUEST['pid']);
		break;
	case 'getOptimalSettings':
		getOptimalSettings($_REQUEST['plantID']);
		break;
	case 'setAlertType':
		$type = $_REQUEST['alert'];
		setAlertType($type);
		break;
	case 'sendAlert':
		$userID = $_REQUEST['uid'];
		$pid = $_REQUEST['pid'];
		$temp = $_REQUEST['temp'];
		$moisture = $_REQUEST['moisture'];
		$light = $_REQUEST['light'];
		sendAlert($userID,$pid,$temp,$moisture,$light);
		break;
	case 'getStatsHistory':
		$info = array();
		$i = 0;
		$query = mysql_query("SELECT `key`, `value`, `timestamp` FROM `user_plant_stats` WHERE (`pid` = 3 AND `key` = 'light' AND `id` % 9 = 0) ORDER BY `timestamp` DESC") or die('error querying:' . mysql_error()); // 
		while($result = mysql_fetch_assoc($query)){
			$info[$i]['key'] = $result['key'];
			$info[$i]['value'] = $result['value'];
			$info[$i]['timestamp'] = $result['timestamp'];
			$i += 1;
		}
		echo json_encode($info);
		break;
	default:
		var_dump($_REQUEST);
		break;
}
?>
