<?php

// 'Facts n Tips' page

require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DatabaseLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DashboardLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../lego/PlantLego.php");

$plantData = getPlantData($_REQUEST['uid'], $_REQUEST['pid']);

$typeID = $plantData['typeid'];

// Call fun facts here

printFunFacts($typeID);
?>

