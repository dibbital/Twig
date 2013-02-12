<?php

// Plant profile page

require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DatabaseLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DashboardLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../users/models/config.php");

$plantData = getPlantData($_REQUEST['uid'], $_REQUEST['plantID']);
?>

<div id="data" data-name="<?php echo $plantData['name'] ?>"></div>
<div id="swipe" class="hero" data-next="<?php echo $plantData['next'] ?>" data-prev="<?php echo $plantData['prev'] ?>">
	<?php if(isset($plantData['imgPath'])){ ?>
		<img src="<?php echo $plantData['imgPath']; ?>" />
	<?php }else{ ?>
	 	<img src="<?php echo("http://lorempixel.com/" . rand(500,700) . "/" . rand(300,500) . "/nature/"); ?>" />
	<?php } ?>
</div>

<ul class="profileNav">
	<li><a href="#" data-section="state">State</a></li>
	<li><a href="#" data-section="progress">Progress</a></li>
	<li><a href="#" data-section="help">Help?</a></li>
</ul>

<div class="profileContent">


	<!-- State -->
	<div id="state" class="active">
		<ul class="guages">
			<li><input id="waterGuage" type="text" class="dial" data-min="0" data-max="100" value="0" data-width="100" data-readOnly=true data-displayPrevious=true data-transparent="true">Water Levels</li>
			<li><input id="lightGuage" type="text" class="dial" data-min="0" data-max="10" value="0" data-width="100" data-readOnly=true data-displayPrevious=true data-transparent="true">Light Levels</li>
			<li><input id="tempGuage" type="text" class="dial" data-min="0" data-max="100" value="0" data-width="100" data-readOnly=true data-displayPrevious=true data-transparent="true">Temperature</li>
		</ul>

		<div id="notificationCenter">
			
		</div>
	</div>

	<!-- Progress -->
	<div id="progress">
		
		<div class="stage">
			<h2>Light Levels<h2>
		</div>

		<div class="facts">
			<h2>Facts &amp; Tips</h2>
			<ul id="factsNtips">
				
			</ul>
		</div>
	</div>

	<!-- Help -->
	<div id="help">
		<div class="button"><a href="#">Tutorial</a></div>
		<ul class="faq">
			<li>Sensor not responding?</li>
			<li>Plant looking dead?</li>
			<li>Plant not growing?</li>
		</ul>
	</div>

</div>