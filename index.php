<?php require_once('users/models/config.php'); ?>
<!DOCTYPE html>
<!--[if IE 7 ]><html lang="en" class="ie7 nojs"><![endif]-->
<!--[if IE 8 ]><html lang="en" class="ie8 nojs"><![endif]-->
<!--[if IE 9 ]><html lang="en" class="ie9 nojs"><![endif]-->
<!--[if gt IE 9]><!--><html lang="en" class="nojs"><!--<![endif]-->
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="keywords" content="" />
		<meta name="description" content="" />

		<meta name="viewport" content="width=device-width, maximum-scale=1.0" />

		<meta property="og:site_name" content="" />
		<meta property="og:title" content="" />
		<meta property="og:description" content="" />
		<meta property="og:url" content="" />
		<meta property="og:image" content="" />
		<meta property="og:type" content="website" />
		<meta property="og:locale" content="en_US" />

		<!-- <meta name="apple-mobile-web-app-capable" content="yes" /> -->

		<title>Twig</title>

		<link rel="shortcut icon" href="images/favicon.ico" />

		<script>document.documentElement.className = document.documentElement.className.replace('nojs', '');</script>


		<?php
			if(isUserLoggedIn()) {
				echo "<script>";
				echo ("window.alreadyLogged = {'userName': '" . $loggedInUser->username ."', 'displayName': '" . $loggedInUser->displayname . "', 'userID': '" . $loggedInUser->user_id . "'};");
				echo "</script>";
			}
		?>



		<link rel="stylesheet" href="stylesheets/reset.css" />
		<link rel="stylesheet" href="stylesheets/app/app.css" />
		<link rel="stylesheet" href="stylesheets/app/mobile.css" />
		<link rel="stylesheet" href="stylesheets/plugins/animate.css" />
		<link rel="stylesheet" href="stylesheets/plugins/ui-lightness/jquery-ui-1.9.2.custom.css" />
		<link rel="stylesheet" href="stylesheets/app/print.css" />



	<!--
		<script type="text/template" id="example_backbone_template">
			Test Template
		</script>
	-->

	</head>
	<body>
<div id="comp"></div>
		<!-- BEGIN: section_main -->
		<div id="section_main">
			<div id="mouseLoader"></div>
			<noscript>
				<p>Javascript is currently disabled. Please <a href="http://www.google.com/support/bin/answer.py?answer=23852" target="_blank">enable javascript</a> for the optimal experience!</p>
			</noscript>

			<div id="header_global">
				
			</div>

			<div id="section_content">


	

			</div>

			<div id="footer_global">

			</div>

		</div>
		<!-- END: section_main -->

		<script src="javascripts/lib/LAB-debug.min.js"></script>
		<script>
			$LAB
				.setOptions({
					'Debug': true
				})
				// Libraries
				.script('javascripts/lib/jquery.js').wait()
				.script('javascripts/lib/jquery.min.js').wait()
				.script('javascripts/lib/underscore.js').wait()
				.script('javascripts/lib/backbone.js').wait()
				.script('javascripts/app/router/AppRouter.js').wait()
				.script('javascripts/plugins/touchable.js').wait()
				.script('javascripts/plugins/jquery-ui-1.9.2.custom.min.js').wait()
				.script('javascripts/plugins/hammer.js').wait()
				.script('javascripts/plugins/jquery.hammer.js').wait()
				// Backbone - Views
				.script('javascripts/app/view/HeaderView.js').wait()
				.script('javascripts/app/view/DashboardView.js').wait()
				.script('javascripts/app/view/SplashView.js').wait()
				.script('javascripts/app/view/ProfileView.js').wait()
				.script('javascripts/app/view/AddPlantView.js').wait()
				.script('javascripts/app/view/MenuView.js').wait()
				.script('javascripts/app/view/SettingsView.js').wait()
				.script('javascripts/app/view/FooterView.js').wait()
				.script('javascripts/app/view/HelpView.js').wait()
				.script('javascripts/app/view/AboutView.js').wait()
				.script('javascripts/app/view/ContactView.js').wait()
				.script('javascripts/app/view/IndexView.js').wait()
				.script('javascripts/app/view/FactsTipsView.js').wait()
				.script('javascripts/app/view/GlobalNavView.js').wait()
				.script('javascripts/app/view/SearchView.js').wait()
				.script('javascripts/app/view/DatabaseEntryView.js').wait()
				.script('javascripts/app/view/NotificationView.js').wait()
				// Site-Specific JS - Global
				.script('javascripts/plugins/jquery.knob.js').wait()
				.script('javascripts/app/app.utilities.js').wait()
				.script('javascripts/app/app.user.js').wait()
				.script('javascripts/app/app.animation.js').wait()
				.script('javascripts/app/app.graph.js').wait()
				// Page-Specific JS
				.script('javascripts/app/app.global.js').wait(function() {
					window.isDebugMode = true;
					App.Global.init();

					if((navigator.userAgent.match(/Windows Phone/i))){
						var stylesheet = '<link rel="stylesheet" type="text/css" href="stylesheets/app/wphone.css" media="screen"  />';
						$('head').append(stylesheet);
					}
				});
		</script>

	</body>
</html>
