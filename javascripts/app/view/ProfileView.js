/**
 * @module Backbone
 * @submodule Backbone.View
 * @class ProfileView
 * @constructor
 */
var ProfileView = Backbone.View.extend({

	'events': {
		'click .profileNav a': 'handleNav'
	},

	'initialize': function (options) {

		var view = this;
		_.bindAll(view);
		// view.userID = options.userID;
		view.plantID = options.plantID;


		App.trigger('header:check', {
			'callback': function () {
				view.pageURL = 'templates/profile.php?uid=' + App.User.getID() + '&plantID=' + view.plantID;
				view.$el.load(view.pageURL, function () {
					view.render();
				});
			}
		});

		view.render();

		log('Backbone : ProfileView : Initialized');
	},

	'render': function () {
		var view = this;

		App.trigger('header:change', {
			'header': 'Plant Profile',
			'subtext': $('#data').attr('data-name'),
			'callback': function () {
				App.trigger('nav:settings:disable');
				$('#header_global .button.right').addClass('backToDash');
				$('#header_global .button.right').on('click', function () {
					Backbone.history.navigate('', {'trigger': true});
					$('#header_global .button.right').removeClass('backToDash');
					App.trigger('nav:enable');
					clearInterval(view.updateInterval);
				});
			}
		});

		var $hero = view.$el.find('.hero').hide();
		var $guages = view.$el.find('.guages li').hide();
		var $profileNav = view.$el.find('.profileNav li').hide();
		var $header = view.$el.find('.header').hide();
		var $notes = view.$el.find('.notifications').hide();


		// I dub thee:
		// Mt. Callback!
		Walt.animate({
			'$el': $hero.show(),
			'transition': 'fadeInLeft',
			'duration': '.7s',
			'callback': function () {
				Walt.animateEach({
					'list': $profileNav.show(),
					'transition': 'fadeInUp',
					'delay': .05,
					'duration': '.3s',
					'callback': function () {
						Walt.animateEach({
							'list': $guages.show(),
							'transition': 'bounceIn',
							'delay': .1,
							'duration': '.5s',
							'callback': function () {
								Walt.animateEachChild({
									'container': $header.fadeIn(),
									'transition': 'fadeInLeft',
									'delay': .1,
									'duration': '.4s',
									'callback': function () {
										Walt.animateEachChild({
											'container': $notes.show(),
											'transition': 'fadeInLeft',
											'delay': .1,
											'duration': '.4s'
										});


										view.updateInterval = setInterval(function () {
											view.updateGuages();
										}, 2000);
									}
								});
							}
						});
					}
				});
			}
		});

		view.$el.find('.dial').knob();


		log('Backbone : ProfileView : Render');
	},

	'handleNav': function (e) {
		e.preventDefault();
		e.stopPropagation();

		var view = this;

		var $target = $(e.currentTarget);
		var newSection = $target.attr('data-section');

		view.$el.find('.profileContent > .active').removeClass('active');
		view.$el.find('.profileContent #' + newSection).addClass('active');
	},

	'updateGuages': function () {
		var view = this;

		var $call = $.ajax({
			'url': 'query.php?a=currentStats&plantID=' + view.plantID
		}).done(function (response) {
			log('updateGuages', view.plantID, response);
			var jsonified = $.parseJSON(response);

			$('#waterGuage').attr('value', jsonified['moisture']);
			$('#lightGuage').attr('value', parseInt(jsonified['light']) / 100);
			$('#tempGuage').attr('value', jsonified['temp']);



			view.$el.find('.dial').trigger('change');
		});
	}

});