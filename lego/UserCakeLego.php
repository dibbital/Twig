<?php

//UserCake lego
//Handles UserCake functions, as well as general user functions (such as picking out favorites and saved location)


	//Stuff needed by UserCake
	// echo("looking for " .$_SERVER['DOCUMENT_ROOT'] . '/users/models/config.php');
	require_once(realpath( dirname( __FILE__ ) ) . '/../users/models/config.php');
	
	
	//Checks login in header


	function getUser($id)
	{
		if(is_int($id)){
			$sql = "SELECT * FROM userCake_Users
					WHERE 
					User_ID = '".$id."'
					LIMIT 1";
		
			$result = mysql_query($sql) or die(mysql_error());
		
			//$row = mysql_fetch_row($result);
			
			$row = mysql_fetch_assoc($result);
		
			return($row);
			
		}else{
			die("Error getting user from getUser");	
		}
	}
	
	function getUserName($id)
	{
		//if(!ctype_digit($id)){
			$sql = "SELECT `Username` FROM userCake_Users
					WHERE 
					User_ID = '$id'
					LIMIT 1";
			$result = mysql_query($sql) or die(mysql_error());
		
			//$row = mysql_fetch_row($result);
			
			$row = mysql_fetch_assoc($result);
			
			return($row['Username']);
			
		//}else{
		//	die("Error getting user from getUserName");	
		//}	
	}
	
	function getCurrentUserName()
	{	
		$loggedInUser =  $_SESSION["userCakeUser"];
		//echo($loggedInUser->display_username);
		return($loggedInUser->username);
	}

	function getCurrentDisplayName()
	{
		$loggedInUser =  $_SESSION["userCakeUser"];
		return($loggedInUser->displayname);
	}
	
	function getCurrentUserID()
	{
		$loggedInUser =  $_SESSION["userCakeUser"];
		return($loggedInUser->user_id);	
	}
	
	
	function getUserFavorites($id)
	{
		$sql = "SELECT `parties`.* FROM `redcupsdb`.`parties` INNER JOIN `redcupsdb`.`user_favorites` ON `user_favorites`.`party_id` = `parties`.`id` WHERE user_id = '$id' LIMIT 25";
		
		
		//$sql = "SELECT `party_id` from `redcupsdb`.`user_favorites` WHERE user_id = '$id' LIMIT 25";
		$result = mysql_query($sql) or die("Error getting favorites: " . mysql_error());	
		
		return ($result);	
	}
	
	function addUserFavorite($id, $pid)
	{
		
		$sql = "INSERT INTO `redcupsdb`.`user_favorites` (`user_id`, `party_id`) VALUES ('$id', '$pid')";
		$result = mysql_query($sql) or die("Error adding to favorites: " . mysql_error());
	}
	
	function removeUserFavorite($id, $pid)
	{
		$sql = "DELETE FROM `redcupsdb`.`user_favorites` WHERE `user_id` = '$id' AND `party_id` = '$pid'";
		mysql_query($sql) or die("Error removing from favorites:" . mysql_error());
	}
	
	function isFavorite($id, $pid)
	{
		$sql = "SELECT id FROM `redcupsdb`.`user_favorites` WHERE user_id = '$id' LIMIT 1";
		$result = mysql_query($sql) or die("Error checking favorite: " . mysql_error());
		
		$idCheck = mysql_fetch_assoc($result);
		if(empty($idCheck)){
			return false;	
		}else{
			return true;	
		}
	}
	
	function setPartyState($pid, $uid, $status)
	{
		
		$checkSQL = mysql_query("SELECT `id`, COUNT(*) FROM `user_attending` WHERE `uid`='". $uid ."' AND `pid`='" . $pid . "' GROUP BY id");
		$checkSQL = mysql_fetch_assoc($checkSQL);
		if(empty($checkSQL))
		{
			$sql = "INSERT INTO `redcupsdb`.`user_attending` (`uid`, `pid`, `status`) VALUES ('". $uid ."', '" . $pid . "', '". $status ."')";
			mysql_query($sql) or die("Error setting party state: " . mysql_error());
		}else{
			$sql = "UPDATE `redcupsdb`.`user_attending` SET `status`='" . $status . "' WHERE `pid`='". $pid ."' AND `uid`='" . $uid ."'";
			mysql_query($sql) or die("Error updating party state: " . mysql_error());
		}
	}
	
	function getPartyState($pid, $uid)
	{
		$sql = "SELECT status FROM `redcupsdb`.`user_attending` WHERE `pid` = '" . $pid . "' AND `uid` = '" . $uid . "'";
		$result = mysql_query($sql) or die("Error getting party state: " . mysql_error());
		
		return mysql_fetch_assoc($result);
	}
	
	
	
?>
