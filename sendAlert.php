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
	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$users = array();
	$initQuery = mysql_query("SELECT `id` FROM `uc_users`");
	while($result = mysql_fetch_assoc($initQuery)){
		//echo ($result['id'] . "\n");
		array_push($users, $result['id']);
	}

	$plants = array();

	foreach($users as $user){
		$getPlants = mysql_query("SELECT `id` FROM `user_plants` WHERE `uid` = $user");
		while($result = mysql_fetch_assoc($getPlants)){
			//echo($result['id']."\n");
			array_push($plants, array($user => $result['id']));
			
		}
	}

	//print_r($plants);

	foreach($plants as $plant){
		reset($plant);
		$uid = key($plant);
		$pid = current($plant);
		echo("THIS IS USER: $pid\n");
		checkStats($pid);
		$notifications = getNotifications($pid);

		$light = 'good';
		$temp = 'good';
		$moisture = 'good';

		foreach($notifications as $notif){
			reset($notif);
			switch(key($notif)){
				case 'light': $light = current($notif);
							  break;

				case 'temp': $temp = current($notif);
								break;

				case 'moisture': $moisture = current($notif);
								break;

			}
		}

		sendAlert($uid,$pid,$light,$temp,$moisture);

	}

?>