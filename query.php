<?php
require_once(realpath( dirname( __FILE__ ) ) . "/users/models/config.php");
// require_once("users/models/header.php");
require_once(realpath( dirname( __FILE__ ) ) . "/lego/DatabaseLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/lego/UserCakeLego.php");
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
	default:
		var_dump($_REQUEST);
		break;
}

?>