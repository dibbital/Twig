<?php

//Lego for Notification helpers

require_once("DatabaseLego.php");
if($GLOBALS['CONNECTION'] == null)
{
	ConnectDB();
}

function setAlertType($type)
{

	if($GLOBALS['CONNECTION'] == null){
		ConnectDB();
	}

	$pattern = "/[^(\d)]/";
	$replacement = '';

	$userID = $_REQUEST['uid'];
	$pID = $_REQUEST['pid'];

	$query = mysql_query("SELECT * FROM `user_plant_settings` WHERE `key` = 'Alert' AND `uid` =  $userID AND `pid` = $pID");
	if(mysql_num_rows($query) == 0){
		$insertSQL = mysql_query("INSERT INTO `user_plant_settings` (`uid`, `pid`, `key`, `value`) VALUES ('" . $userID . "', '" . $pID . "', 'Alert', '" . $type . "')");
		if($type == 'text'){
			$carrier = $_REQUEST['carrier'];
			$phoneNum = preg_replace($pattern,$replacement, $_REQUEST['num']);

			$updateQuery = mysql_query('UPDATE `'.$GLOBALS['DB'].'`.`uc_users` SET `phone_number` = '.$phoneNum. ', `carrier` = "'. $carrier . '"WHERE `id` = '. $userID);
			
		}
	}else{
		$updateQuery = mysql_query("UPDATE `user_plant_settings` SET `key` = 'Alert',`value` = '".$type."' WHERE `uid` = $userID AND `pid` = $pID");
		if($type == 'text'){
			$carrier = $_REQUEST['carrier'];
			$phoneNum = preg_replace($pattern,$replacement, $_REQUEST['num']);

			$updateQuery = mysql_query('UPDATE `'.$GLOBALS['DB'].'`.`uc_users` SET `phone_number` = '.$phoneNum. ', `carrier` = "'. $carrier . '" WHERE `id` = '. $userID);
			
		}
	}

}

function sendAlert($userID,$pid,$temp,$moisture,$light){
	$type = '';

	$alertQuery = mysql_query("SELECT `value` FROM `user_plant_settings` WHERE `key` = 'Alert' AND `uid` =  $userID AND `pid` = $pid");
	if($result = mysql_fetch_assoc($alertQuery)){
		$type = $result['value'];
		
		if($type == 'text'){
			$phoneQuery = mysql_query("SELECT `display_name`,`phone_number`, `carrier` FROM `uc_users` WHERE `id` = $userID");
			while($results = mysql_fetch_assoc($phoneQuery)){
				$to = $results['phone_number'] . "@" . $results['carrier'];
				$name = $results['display_name'];
			}
		}

		if($type == 'email'){
			$emailQuery = mysql_query("SELECT `email`,`display_name` FROM `uc_users` WHERE `id` = $userID");
			while($results = mysql_fetch_assoc($emailQuery)){
				$to = $results['email'];
				$name = $results['display_name'];
			}
		}

		if($temp == 'good' && $moisture == 'good' && $light == 'good'){

		}else{

			$message = "Hey $name! Just to update you on your plant:";
		
			switch($temp){
				case 'low': $message .= " - The temperature of your plant is a little low.\n";
							break;
				case 'high': $message .= " - The temperature of your plant is a little high.\n";
							 break;
				case 'good': break;
			}

			switch($moisture){
				case 'low':	$message .= " - Your plant's soil is too dry.\n";
							break;
				case 'high': $message .= " - Your plant's soil is too moist.\n";
							 break;
				case 'good': break;
			}

			switch($light){
				case 'low': $message .= " - Your plant needs more light.\n";
							break;
				case 'high': $message .= " - Your plant needs more shade.\n";
							break;
				case 'good': break;
			}


		$message = wordwrap( $message, 70 );
		@mail($to, 'Your Plant\'s in Need!', $message);
		echo "Message Sent";
	}
 
	}else{
		echo "Alert preference not set";
	}
}

?>