<?php
	require_once("../lego/DatabaseLego.php");
	require_once("../users/models/config.php");
	require_once("../lego/DashboardLego.php");
	require_once("../lego/UserCakeLego.php");
// Dashboard page

?>

<ul class="dashboard">
	<?
	getPlants($loggedInUser->user_id);

	/*
	<li><img src="http://placekitten.com/150/150" />
		<h2>Frederick</h2>
		<h3>Tomato Plant</h3>
		<p class="status good">Good</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Seymour</h2>
		<h3>Tomato Plant</h3>
		<p class="status meh">Meh</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Herp</h2>
		<h3>Tomato Plant</h3>
		<p class="status poor">Poor</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Derp</h2>
		<h3>Tomato Plant</h3>
		<p class="status meh">Meh</p>
	</li>
	*/ ?>
	
	
<? /*
	<li><img src="http://placekitten.com/150/150" />
		<h2>Frederick</h2>
		<h3>Tomato Plant</h3>
		<p class="status good">Good</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Seymour</h2>
		<h3>Tomato Plant</h3>
		<p class="status good">Good</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Herp</h2>
		<h3>Tomato Plant</h3>
		<p class="status meh">Meh</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Derp</h2>
		<h3>Tomato Plant</h3>
		<p class="status good">Good</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Frederick</h2>
		<h3>Tomato Plant</h3>
		<p class="status good">Good</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Seymour</h2>
		<h3>Tomato Plant</h3>
		<p class="status poor">Poor</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Herp</h2>
		<h3>Tomato Plant</h3>
		<p class="status meh">Meh</p>
	</li>

	<li><img src="http://placekitten.com/150/150" />
		<h2>Derp</h2>
		<h3>Tomato Plant</h3>
		<p class="status poor">Poor</p>
	</li>

	*/ ?>
	
</ul>