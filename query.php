<?php
require_once("models/config.php");
require_once("models/header.php");
require_once("lego/DatabaseLego.php");
ConnectDB();

switch($_REQUEST['a']){
	case 'addColor':
		addColor($_REQUEST['id'], $_REQUEST['color']);
		break;
	default:
		var_dump($_REQUEST);
		break;
}

function addColor($id, $colorArg){
	$color = $colorArg;
	writeDB('posts', 'color', $color, $id);
	return $color;
}

?>