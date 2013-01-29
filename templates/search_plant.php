<?php include('../getAllPlants.php'); ?>
<div id="search">
	<div class="searchButton"></div>
	<div class="searchForm">
		<form id="searchDatabase">
			<input type="input" id="plantName" name="plantName" placeholder="Search"></input>
		</form>
	</div>
	<div class="advancedButton"></div>
</div>
<div id="results">
	<div id="advancedOptions">
		<ul>
			<li>
				<div class="option type" data-search="type">
					<div class="left">
						<h2>Plant Type</h2>
						<h3>none</h3>
						<select id="plantType" name="plantType" form="searchDatabase">
							<?php getFamilyTypes() ?>
						</select>
					</div>
					<div class="right typeImage"></div>
				</div>
			</li>
			<li>
				<div class="option size" data-search="size">
					<div class="left">
						<h2>Plant Size</h2>
						<h3>none</h3>
						<select id="plantSize" name="plantSize" form="searchDatabase">
							<option value="-"></option>
							<option name="small" value="Small">Small</option>
							<option name="medium" value="Medium">Medium</option>
							<option name="large" value="Large">Large</option>
						</select>
					</div>
					<div class="right sizeImage"></div>
				</div>
			</li>
			<li>
				<div class="option maintenance" data-search="maintenance">
					<div class="left">
						<h2>Maintenance</h2>
						<h3>none</h3>
						<select id="plantMaintenance" name="plantMaintenance" form="searchDatabase">
							<option value="-"></option>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
						</select>
					</div>
					<div class="right maintenanceImage"></div>
				</div>
			</li>
		</ul>
	</div>
	<div id="plantResults">
		<ul class="returnList">
			<?php getAllPlants();?>
			<!--<li><img src="http://placekitten.com/150/150" />
				<h2>Frederick</h2>
				<h3>Tomato Plant</h3>
			</li>

			<li><img src="http://placekitten.com/150/150" />
				<h2>Seymour</h2>
				<h3>Tomato Plant</h3>
			</li>

			<li><img src="http://placekitten.com/150/150" />
				<h2>Herp</h2>
				<h3>Tomato Plant</h3>
			</li>

			<li><img src="http://placekitten.com/150/150" />
				<h2>Derp</h2>
				<h3>Tomato Plant</h3>
			</li>
			<li><img src="http://placekitten.com/150/150" />
				<h2>Frederick</h2>
				<h3>Tomato Plant</h3>
			</li>

			<li><img src="http://placekitten.com/150/150" />
				<h2>Seymour</h2>
				<h3>Tomato Plant</h3>
			</li>

			<li><img src="http://placekitten.com/150/150" />
				<h2>Herp</h2>
				<h3>Tomato Plant</h3>
			</li>

			<li><img src="http://placekitten.com/150/150" />
				<h2>Derp</h2>
				<h3>Tomato Plant</h3>
			</li>

			<li><img src="http://placekitten.com/150/150" />
				<h2>Herp</h2>
				<h3>Tomato Plant</h3>
			</li>

			<li><img src="http://placekitten.com/150/150" />
				<h2>Derp</h2>
				<h3>Tomato Plant</h3>
			</li>-->
		</ul>
	</div>
</div>