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

		Backbone.history.navigate('', {
			'trigger': false
		});
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


		$btnLogin.on('click', view.showLogin);
		$btnSignup.on('click', view.showSignup);

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

	'showLogin': function (e) {
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
				/*var $loginBlurb = view.$el.find('.login.blurb');
				Walt.animateEachChild({
					'container': $loginBlurb.show(),
					'transition': 'fadeInLeft',
					'delay': .1,
					'duration': '.5s'
				});*/
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

				$loginMenu.find('.cancel a').on('click', function () {
					view.$el.find('.login').fadeOut();
					view.$el.find('#login').fadeOut();
					view.$el.find('.main').fadeIn();
					view.$el.find('#main').fadeIn();
				});

				$loginMenu.find('#loginBtn').on('click', function (e) {
					e.preventDefault();
					e.stopPropagation();

					var userName = view.$el.find('#login_username').val();
					var passWord = view.$el.find('#login_password').val();
					var ajaxCall = $.ajax({
						'url': 'users/login.php',
						'type': 'POST',
						'data': {
							'username': userName,
							'password': passWord
						}
					}).done(function (data) {
						if(data == 'success') {
							App.User.set();
							Walt.animateEachChild({
								'container': $('.menu'),
								'transition': 'fadeOutUp',
								'delay': .1,
								'callback': function () {
									$('.menu').hide();
									view.close();
									Backbone.history.navigate('hello', {
										'trigger': false
									});
									Backbone.history.navigate('', {
										'trigger': true
									});
								}
							});

						} else {
							alert(data);
						}
					});
				});
			}
		});
	},

	'showSignup': function () {
		var view = this;

		view.$el.find('.main').fadeOut();
		view.$el.find('#main').fadeOut();
		view.$el.find('#signup').fadeIn();

		view.$el.find('.signUp a').on('click', function () {
			var $form = view.$el.find('#signup');
			var ajaxCall = $.ajax({
				'url': 'users/register.php',
				'type': 'POST',
				'data': {
					'displayname': $form.find('#displayname').val(),
					'username': $form.find('#username').val(),
					'password': $form.find('#password').val(),
					'passwordc': $form.find('#passwordc').val(),
					'email': $form.find('#email').val()
				}
			}).done(function (data) {
				if(data == 'success') {
					App.User.set();
					view.close();
					Backbone.history.navigate('hello', {
						'trigger': false
					});
					Backbone.history.navigate('', {
						'trigger': true
					});
				} else {
					alert(JSON.stringify(data));
				}
			});
		});

		view.$el.find('.cancel a').on('click', function () {

			view.$el.find('#signup').fadeOut();
			view.$el.find('.main').fadeIn();
			view.$el.find('#main').fadeIn();
		});
	},

	'close': function () {
		var view = this;
		view.$el.removeClass('splash').empty();
	}

});