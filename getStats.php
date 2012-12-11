<?php

// $connection = mysql_connect("50.63.108.149","dibbital","Hunter2!") or die("Couldn't connect");
$connection = mysql_connect("localhost","root","root") or die("Couldn't connect");
mysql_select_db("dibbital", $connection) or die('no db');


$sql = "SELECT * FROM `dibbital`.`stats` WHERE `pid` = 1 LIMIT 0, 30 ";
$query = mysql_query($sql) or die("Error selecting stats");


$info = array();
while($results = mysql_fetch_assoc($query)){
	$key = $results["key"];
	$value = $results["value"];
	$info[$key] = $value;
}

echo json_encode($info);
?>
