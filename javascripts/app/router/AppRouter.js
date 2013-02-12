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
		'plant/:user/:pID': 'plantProfile',
		'plant/:pID': 'databaseEntry',
		'add': 'add',
		'settings': 'settings',
		'help': 'help',
		'about': 'about',
		'search': 'search',
		'contact': 'contact',
		'logout': 'logout'
	},

	initialize: function () {
		var router = this;

		router.indexView = new IndexView({
			'el': '#section_main'
		});
		
		App.trigger('nav:enable');

		// I don't really like this being in the AppRouter - Andy
		// Params is used for callbacks
		App.on('header:check', function (params) {
			if(router.headerView == undefined) {

				router.headerView = new HeaderView({
					'el': '#header_global'
				});

				

				router.footerView = new FooterView({
					'el': '#footer_global'
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

		App.trigger('nav:enable');
	},

	'splash': function () {
		var router = this;
		router.splashView = new SplashView({
			'el': '#section_content'
		});

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
		if(router.indexFirst()) {
			router.addView = new AddPlantView({
				'el': '#section_content' // ?
			});
		} else {
			log('not indexfirst');
			Backbone.history.navigate('', {
				'trigger': true,
				'replace': true
			});
		}
	},

	'settings': function () {
		var router = this;
		if(router.indexFirst()) {
			router.settingsView = new SettingsView({
				'el': '#section_content' // ?
			});
		} else {
			Backbone.history.navigate('', {
				'trigger': true,
				'replace': true
			});
		}
	},

	'search': function(){
		var router = this;
		router.searchView = new SearchView({
			'el': '#section_content'
		});
	},

	'help': function () {
		var router = this;
		if(router.indexFirst()) {
			router.helpView = new HelpView({
				'el': '#section_content' // ?
			});
		} else {
			Backbone.history.navigate('', {
				'trigger': true,
				'replace': true
			});
		}
	},

	'about': function () {
		var router = this;
		if(router.indexFirst()) {
			router.aboutView = new AboutView({
				'el': '#section_content' // ?
			});
		} else {
			Backbone.history.navigate('', {
				'trigger': true,
				'replace': true
			});
		}
	},

	'contact': function () {
		var router = this;
		if(router.indexFirst()) {
			router.contactView = new ContactView({
				'el': '#section_content' // ?
			});
		} else {
			Backbone.history.navigate('', {
				'trigger': true,
				'replace': true
			});
		}
	},

	'databaseEntry': function(pID) {
		var router = this;

		router.dbEntryView = new DatabaseEntryView({
			'el': '#section_content',
			'plantID': pID
		});
	},

	'indexFirst': function () {
		var router = this;
		if(typeof router.indexView == undefined) {
			return false;
		} else {
			return true;
		}
	},

	'logout': function () {
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
					window.location.href = '/';
				}
			});
		}
	}

});