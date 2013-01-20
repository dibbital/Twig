<script type = "text/javascript">
	$(".dial").knob();
	$(window).bind('resize', function(){
		$(".dial").knob();
	});
</script>
<?php

// Plant profile page

require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DatabaseLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DashboardLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../users/models/config.php");

$plantData = getPlantData($_REQUEST['uid'], $_REQUEST['plantID']);
?>

<div id="data" data-name="<?php echo $plantData['name'] ?>"></div>
<div class="hero">
	<?php if(isset($plantData['imgPath'])){ ?>
		<img src="<?php echo $plantData['imgPath']; ?>" />
	<?php }else{ ?>
	 	<img src="images/500.jpeg" />
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
			<li><input id="waterGuage" type="text" class="dial" data-min="0" data-max="100" value="58"  data-width= "84" data-height= "84" data-transparent="true" data-readOnly=true>Water Levels</input></li>
			<li><input id="lightGuage" type="text" class="dial" data-min="0" data-max="10" value="4" data-width="84" ="true" data-height= "84" data-transparent="true" data-readOnly=true/>Light Levels</li>
			<li><input id="tempGuage" type="text" class="dial" data-min="0" data-max="100" value="85" data-width="84"  data-height= "84" data-transparent="true" data-readOnly=true/>Temperature</li>
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