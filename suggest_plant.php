<?php
require_once('lego/DatabaseLego.php');
ConnectDB();
 
// if the 'term' variable is not sent with the request, exit
if ( !isset($_REQUEST['term']) )
	exit;
 
// connect to the database server and select the appropriate database for use
// $dblink = mysql_connect('localhost', 'root', 'root') or die( mysql_error() );
// mysql_select_db('dibbital');
 
// query the database table for zip codes that match 'term'
$rs = mysql_query("SELECT * FROM `plants` WHERE (`key` = 'common_name' OR `key` = 'latin_name') AND (`value` LIKE '". mysql_real_escape_string($_REQUEST['term']) ."%') ORDER BY `value` ASC LIMIT 0, 10");

	// SELECT id, key, value FROM plants WHERE key = "common_name" AND value LIKE "'. mysql_real_escape_string($_REQUEST['term']) .'%" order by key asc limit 0,10', $dblink);
 
// loop through each zipcode returned and format the response for jQuery
$data = array();
if ( $rs && mysql_num_rows($rs) )
{
	while( $row = mysql_fetch_array($rs, MYSQL_ASSOC) )
	{
		$data[] = array(
			'label' => $row['value'] ,
			'value' => $row['pid']
		);
	}
}
 
// jQuery wants JSON data
echo json_encode($data);
flush();
?>