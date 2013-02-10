<!DOCTYPE html>
<?php require_once('lego/DatabaseLego.php'); ?>
<html lang="en" class="nojs">
	<head>

		<title></title>
<link href="stylesheets/plugins/ui-lightness/jquery-ui-1.9.2.custom.css" rel="stylesheet">
	</head>
	<body>
		<!-- BEGIN: section_main -->
		<div id="section_main">
			
<form action="search.php" method="post">
	Enter a plant name:
	<input type="text" id="plantsearch" />

</form>
		</div>

		<script src="javascripts/lib/jquery.min.js"></script>
		<script src="javascripts/plugins/jquery-ui-1.9.2.custom.min.js"></script>

		<script>
		$(document).ready(function(){
			$('#plantsearch').autocomplete({source:'suggest_plant.php', minLength:1});
		});
		</script>
	</body>
</html>
