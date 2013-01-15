<?php
/*
UserCake Version: 2.0.1
http://usercake.com
*/

//Database Information
if($_SERVER['SERVER_NAME'] == 'localhost'){
	$db_host = "localhost"; //Host address (most likely localhost)
	$db_name = "dibbital"; //Name of Database
	$db_user = "root"; //Name of database user
	$db_pass = "root"; //Password for database user
}else{
	$db_host = "cias.rit.edu"; //Host address (most likely localhost)
	$db_name = "twig"; //Name of Database
	$db_user = "twig"; //Name of database user
	$db_pass = "geoZ3t00dom"; //Password for database user
}


$db_table_prefix = "uc_";


GLOBAL $errors;
GLOBAL $successes;

$errors = array();
$successes = array();

/* Create a new mysqli object with database connection parameters */
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
GLOBAL $mysqli;

if(mysqli_connect_errno()) {
	echo "Connection Failed: " . mysqli_connect_errno();
	exit();
}

//Direct to install directory, if it exists
if(is_dir("install/"))
{
	header("Location: install/");
	die();

}

?>