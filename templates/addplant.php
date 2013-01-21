<?php

// 'Add Plant' page

?>


<ul id="newPlantForm">
	<li><input type="text" placeholder="Plant Name" id="nickname"></input></li>
	<li><input type="text" id="plantSearch" placeholder="Type"></input></li>
	<li><input type="hidden" id="plantType"></input></li>
	<li><div class="button" id="notSure"><a href="#">Not sure?</a></div></li>
	<li><input type="text" id="device" placeholder="Device ID" id="device"></input></li>
	
</ul>
<form action="query.php" method="post" target="frameLoader" id="uploadForm" name="uploadForm" enctype="multipart/form-data">
<input type="hidden" id="a" name="a" value="silentUpload" />
<h2>Plant Photo</h2>
<img id="imgThumb" />
<input type="file" id="plantPhoto" name="plantPhoto" data-bg="../../images/camera.png"></input>
</form>
<div class="button" id="submitButton"><a href="#">Add Plant</a></div>
