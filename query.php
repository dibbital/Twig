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
	default:
		var_dump($_REQUEST);
		break;
}
?>
