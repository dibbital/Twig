/**
 * @module Backbone
 * @submodule Backbone.Router
 * @class AppRouter
 * @constructor
 */
var AppRouter = Backbone.Router.extend({

	'routes': {
		'': 'index',
		'splash': 'splash',
		'plant/:user/:pID': 'plantProfile', //  #plant/Andy/123,
		'add': 'add',
		'logout': 'logout'
	},

	initialize: function () {
		var router = this;

		// I don't really like this being in the AppRouter - Andy
		// Params is used for callbacks
		App.on('header:check', function (params) {
			if(router.headerView == undefined) {

				router.headerView = new HeaderView({
					'el': '#header_global'
				});

				Walt.animate({
					'el': $('#header_global').show(),
					'transition': 'fadeInDownBig',
					'callback': function () {
						if(typeof params.callback == 'function') {
							(params.callback)();
						}
					}
				});
			} else {
				if(typeof params.callback == 'function') {
					(params.callback)();
				}
			}
		});


		log('Backbone : AppRouter : Initialized');
	},

	'index': function () {
		var router = this;

		router.indexView = new IndexView({
			'el': '#section_main'
		});
	},

	'splash': function () {
		var router = this;
		router.splashView = new SplashView({
			'el': '#section_content'
		});

		// Backbone.history.navigate('', {'trigger': false});
	},

	'plantProfile': function (user, pID) {
		var router = this;

		router.profileView = new ProfileView({
			'el': '#section_content',
			'userID': user,
			'plantID': pID
		});
	},

	'add': function () {
		var router = this;

		router.addView = new AddPlantView({
			'el': '#section_content' // ?
		});
	},

	'logout': function () {
		log('logout', this.indexView);
		var router = this;
		if(router.indexView == undefined) {
			Backbone.history.navigate('', {
				'trigger': true,
				'replace': true
			});
		} else {
			$.ajax({
				'url': 'users/logout.php'
			}).done(function (data) {
				if(data == 'success') {
					window.loggedIn = false;
					// Backbone.history.navigate('splash', {'trigger': true});
					window.location.href = '/';
				}
			});
		}
	}

});