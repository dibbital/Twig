<?php

// Plant profile page

require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DatabaseLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../lego/PlantLego.php");

$pid = $_REQUEST['plantID'];

?>

<div id="data" data-common="<?php echo getCommonName($pid) ?>" data-latin="<?php echo getScientificName($pid) ?>"</div>
<div class="hero">
	<!--<?php if(isset($plantData['imgPath'])){ ?>
		<img src="<?php echo $plantData['imgPath']; ?>" />
	<?php }else{ ?>-->
	 	<img src="<?php echo("http://lorempixel.com/" . rand(500,700) . "/" . rand(300,500) . "/nature/"); ?>" />
	<!--<?php } ?>-->
</div>

<ul class="plantDBNav">
	<li><a href="#" data-section="habitat">Habitat</a></li>
	<li><a href="#" data-section="stages">Stages</a></li>
	<li><a href="#" data-section="info">Info</a></li>
	<li><a href="#" data-section="buy">Buy</a></li>
</ul>

<div class="plantDBContent">


	<!-- State -->
	<div id="habitat" class="active">
		<div class="overview">
			<div class='main'>
				<div>
					<h1>Habitat</h1>
					<h2>For <strong><?php echo getCommonName($pid) ?></strong></h2>
				</div>
			</div>
			<div class='side'>
				<ul class='divs'>
					<li class='moisture'>High</li>
					<li class='light'><?php echo getLightValue($pid) ?></li>
					<li class='temp'><?php echo getTempValue($pid) ?></li>
				</ul>
			</div>
		</div>

		<div class='content'>
			<div class="lightInfo">
				<h3>Light</h3>
				<p><?php echo getDetails($pid, 'light')?></p>
			</div>

			<div class="moistureInfo">
				<h3>Moisture</h3>
				<p><?php echo getDetails($pid, 'moisture') ?></p>
			</div>

			<div class="tempInfo">
				<h3>Temperature</h3>
				<p><?php echo getDetails($pid, 'temp') ?></p>
			</div>
		</div>
	</div>

	<!-- Progress -->
	<div id="stages">
		<div class="content">
			<p><?php echo getSeedPropagation($pid)?></p>
		</div>
	</div>

	<div id="info">
		<div class="overview">
			<div class='main'>
				<div>
					<h1>Information</h1>
					<h2>More on <strong><?php echo getCommonName($pid) ?></strong></h2>
				</div>
			</div>
			<div class='side'>
				<div class='stats'>
					<div class='growHeight'><?php echo getHeightInfo($pid) ?></div>
				</div>
			</div>
		</div>
		<div class='content'>
			<ul class='info'>
				<li data-name='origins'><h2 class='label fold'>Natural Habitat</h2><div class='sub'><?php echo getNaturalRegion($pid) ?></div></li>
				<li data-name='history'><h2 class='label fold'>Common Uses</h2><div class='sub'><?php echo getUses($pid) ?></div></li>
				<li data-name='facts'><h2 class='label fold'>Medicinal Properties</h2><div class='sub'><?php echo getMedicinalUses($pid) ?><div></li>
				<li data-name='diet'><h2 class='label fold'>Known Hazards</h2><div class='sub'><?php echo getKnownHazards($pid) ?></div></li>
			</ul>
		</div>
	</div>

	<div id="buy">
		<div class="button"><a href="#">Tutorial</a></div>
	</div>

</div>