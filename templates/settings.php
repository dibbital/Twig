<?php

// 'Settings' page

error_reporting(E_ALL);
 ini_set("display_errors", 1);
require_once(realpath( dirname( __FILE__ ) ) . "/../lego/UserCakeLego.php");
require_once(realpath( dirname( __FILE__ ) ) . "/../lego/SettingsLego.php");

?>


<ul id="settings">

	<?php getAndPrintSettings(getCurrentUserID()); ?>

	<!--

	<li><h2 class="name button">Frederick <span>(Tomato)</span></h2>
		<ul class="sub">
			<li>Alert Type<span class="value">Vibrate</span></li>
			<li>Alert Sensitivity<span class="value">Low</span></li>
			<li>Edit Progress<span class="value">2</span></li>
			<li>Change photo<span class="value">…</span></li>
		</ul>
	</li>

	<li><h2 class="name button">Frederick <span>(Tomato)</span></h2>
		<ul class="sub">
			<li>Alert Type<span class="value">Vibrate</span></li>
			<li>Alert Sensitivity<span class="value">Low</span></li>
			<li>Edit Progress<span class="value">2</span></li>
			<li>Change photo<span class="value">…</span></li>
		</ul>
	</li>

	<li><h2 class="name button">Frederick <span>(Tomato)</span></h2>
		<ul class="sub">
			<li>Alert Type<span class="value">Vibrate</span></li>
			<li>Alert Sensitivity<span class="value">Low</span></li>
			<li>Edit Progress<span class="value">2</span></li>
			<li>Change photo<span class="value">…</span></li>
		</ul>
	</li>

-->

</ul>