<!DOCTYPE html>
<html lang="en" class="nojs">
	<head>

		<title></title>

	</head>
	<body>
		<!-- BEGIN: section_main -->
		<div id="section_main">


		</div>

		<script src="http://code.jquery.com/jquery.min.js"></script>
		<script>
		$(document).ready(function(){
			
			//max = http://plantsdb.org/plants/7417.json
			for(var i = 0; i < 1; i++){
				$.ajax({
					'url': 'http://plantsdb.org/plants/' + i + '.json'
				}).done(function(data){

					log('data', data);

				});
			}
			
		});
		</script>
	</body>
</html>
