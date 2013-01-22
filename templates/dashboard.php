<?php
	require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DatabaseLego.php");
	require_once(realpath( dirname( __FILE__ ) ) . "/../users/models/config.php");
	require_once(realpath( dirname( __FILE__ ) ) . "/../lego/DashboardLego.php");
	require_once(realpath( dirname( __FILE__ ) ) . "/../lego/UserCakeLego.php");
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