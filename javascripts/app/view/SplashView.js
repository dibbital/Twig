/**
 * @module Backbone
 * @submodule Backbone.View
 * @class SplashView
 * @constructor
 */
var SplashView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);

		view.pageURL = 'templates/splash.php';

		App.trigger('route:load');
		view.$el.empty().load(view.pageURL, function () {
			App.trigger('route:ready');
			view.render();
		});

		log('Backbone : SplashView : Initialized');
	},

	'render': function () {
		var view = this;

		view.$el.addClass('splash');

		var $logo = view.$el.find('.logo');
		var $btnLogin = view.$el.find('#login_btn a');
		var $btnSignup = view.$el.find('#signup_btn a');
		var $txtBlurb = view.$el.find('.main.blurb');


		$btnLogin.on('click', view.login);

		$txtBlurb.hide();
		$btnLogin.hide();
		$btnSignup.hide();
		Walt.animate({
			'el': $logo,
			'transition': 'fadeInDown',
			'delay': '.2s',
			'callback': function () {
				Walt.animate({
					'el': $txtBlurb.show(),
					'transition': 'fadeInLeft'
				});

				Walt.animate({
					'el': $btnLogin.show(),
					'transition': 'bounceIn',
					'delay': '.05s',
					'duration': '.5s'
				});

				Walt.animate({
					'el': $btnSignup.show(),
					'transition': 'bounceIn',
					'delay': '.08s',
					'duration': '.5s'
				});
			}
		});

		log('Backbone : SplashView : Render');
	},

	'login': function (e) {
		e.preventDefault();
		e.stopPropagation();
		var view = this;

		var $blurb = view.$el.find('.blurb');
		var $btnMainMenu = view.$el.find('#main.menu');


		Walt.animate({
			'el': $blurb,
			'transition': 'fadeOutRight',
			'callback': function () {
				$blurb.hide();
				var $loginBlurb = view.$el.find('.login.blurb');
				Walt.animateEachChild({
					'container': $loginBlurb.show(),
					'transition': 'fadeInLeft',
					'delay': .1,
					'duration': '.5s'
				});
			}
		});

		Walt.animate({
			'el': $btnMainMenu,
			'transition': 'fadeOutDown',
			'callback': function () {
				$btnMainMenu.hide();
				var $loginMenu = view.$el.find('#login.menu');
				$loginMenu.show();
				Walt.animateEachChild({
					'container': $loginMenu,
					'transition': 'fadeInDown',
					'delay': .2
				});

				$loginMenu.find('#herp').on('click', function (e) {
					e.preventDefault();
					e.stopPropagation();
					view.close();
					Backbone.history.navigate('', {
						'trigger': true
					});
				});
			}
		});
	},

	'close': function () {
		var view = this;
		view.$el.removeClass('splash').empty();
	}

});