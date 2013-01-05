<?php
require_once("users/models/config.php");
// require_once("users/models/header.php");
require_once("lego/DatabaseLego.php");
ConnectDB();

switch($_REQUEST['a']){
	case 'newPlant':
		newPlant($_REQUEST['data']);
		break;
	default:
		var_dump($_REQUEST);
		break;
}

?>