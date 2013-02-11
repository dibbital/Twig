<?php

// 'Add Plant' page

?>

<ul id="newPlantForm">
	<li><input type="text" placeholder="Plant Nickname" id="nickname"></input></li>
	<li><input type="text" id="plantSearch" placeholder="Plant Type"></input></li>
	<li><input type="hidden" id="plantType"></input></li>
	<!-- <li><div class="button" id="notSure"><a href="#">Not sure?</a></div></li> -->
	<li><input type="text" id="device" placeholder="Twig Device ID" id="device"></input></li>
	<!--<li><label class="left">Seedling</label> <label class="right">Mature</label></li>
	 <li><span class="seed">Seed</span><span class="mid">Pre-Mature</span><span class="mature">Mature</span>
		<input type="range" min="0" max="5" step="1" value="0" id="plant_age" name="plant_age"></input>
	</li> -->
	
</ul>
<form action="query.php" method="post" target="frameLoader" id="uploadForm" name="uploadForm" enctype="multipart/form-data">
<input type="hidden" id="a" name="a" value="silentUpload" />

<h2>Plant Photo</h2>
<img id="imgThumb" />
<p>Use your own photo</p>
<input type="file" id="plantPhoto" name="plantPhoto" data-bg="../../images/camera.png"></input>
<a href="#" id="findDefault">Find Photo to Use</a>

</form>

<div class="button" id="submitButton" style="height: auto"><a href="#">Add Plant</a></div>