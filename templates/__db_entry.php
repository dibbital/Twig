<?php

// Plant profile page

require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DatabaseLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DashboardLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../users/models/config.php");

$plantData = getPlantData($_REQUEST['uid'], $_REQUEST['plantID']);
?>

<div id="data" data-name="<? echo $plantData['name'] ?>"></div>
<div class="hero">
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

		<div class="header">
			<h2>Notifications</h2>
			<!-- <span>2</span> -->
		</div>
		<ul class="notifications">
			<li>Level Alert - Water requirement not filled</li>
			<li>Level Alert - Water requirement not filled</li>
		</ul>
	</div>

	<!-- Progress -->
	<div id="progress">
		<div class="stage">
			<div class="sprouting">
				<h2>Sprouting</h2>
				<h3>Week 3-4</h3>
				<p>Sprouting is an important part in a plants life cycle. Buds begin to sprout as the plant prepares to flower.</p>
			</div>
			<ul class="stageProgress">
				<li><h2>1</h2><span>wks.</span></li>
				<li><h2>2</h2><span>1.5</span></li>
				<li><h2>3</h2><span>3.5</span></li>
				<li><h2>4</h2><span>4.5</span></li>
			</ul>
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