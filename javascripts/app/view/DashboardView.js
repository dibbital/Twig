/**
 * @module Backbone
 * @submodule Backbone.View
 * @class DashboardView
 * @constructor
 */
var DashboardView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);

		view.mouse = false;

		App.on('dashboard:reset', function (e) {
			view.$el.empty();
			view.initialize();
		});


		view.pageURL = 'templates/dashboard.php';
		view.$el.addClass('loading').load(view.pageURL, function () {
			view.$el.removeClass('loading');
			view.render();
		});
		log('Backbone : DashboardView : Initialized');
	},

	'render': function () {
		var view = this;



		var $dash = view.$el.find('.dashboard');

		var $addButton = $('<li id="addNew"><a href="#">Add New Plant</a></li>');
		$dash.append($addButton);
		$addButton.on('click', view.addNewButton);


		var $logOutBtn = $('<li id="logOut"><a href="#">Log Out</a></li>');
		$dash.append($logOutBtn);
		$logOutBtn.on('click', function () {
			Backbone.history.navigate('logout', {
				'trigger': true
			});
		});

		var $plants = view.$el.find('.dashboard li'); //.not('#addNew');
		$('.dashboard .status').hide();

		App.trigger('header:change', {
			'header': App.User.get() + '\'s Dashboard',
			'subtext': 'Your Plants'
		});

		Walt.animateEach({
			'list': $plants,
			'transition': 'bounceIn',
			'delay': .1,
			'duration': '.4s',
			'callback': function () {

				$('#header_global .button.right').removeClass('dashboard');

				setTimeout(function () {

					Walt.animateEach({
						'list': $('.dashboard .status').show(),
						'transition': 'bounceIn',
						'delay': .1,
						'duration': '.6s'
					});
				}, 1000);
			}
		});

		/* #### */
		if(view.mouse) {
			view.$mouseLoader = $('<div></div>', {
				'id': 'mouseLoader'
			});
			$(document.body).append(view.$mouseLoader);
			$plants.on('touchstart', function (e) {
				$plants.on('touchmove', function (e) {
					view.$mouseLoader.css('left', e.originalEvent.changedTouches[0].pageX + 'px').css('top', e.originalEvent.changedTouches[0].pageY + 'px').fadeIn('fast');
				});
				view.$mouseLoader.css('left', e.originalEvent.changedTouches[0].pageX + 'px').css('top', e.originalEvent.changedTouches[0].pageY + 'px').fadeIn('fast');
				view.on('plant:flipped dashboard:doubletap', function () {
					view.$mouseLoader.stop().fadeOut();
				});
				$plants.on('touchend', function (e) {
					view.$mouseLoader.stop().fadeOut();
				});
			});
		}
		/* ##### */

		// $plants.on('tap', view.flipPlant);
		$plants.Touchable();

		var doubleTapFunction = function (e) {
			view.trigger('dashboard:doubletap');
			var $target = $(e.currentTarget);
			var $plantID = $target.attr('data-plant-id');
			Walt.animateEachChild({
				'container': view.$el.find('.dashboard'),
				'transition': 'fadeOutDown',
				'delay': 0.1,
				'duration': '.4s',
				'subcall': function (obj) {
					$(obj).css('visibility', 'hidden');
				},
				'callback': function () {
					Backbone.history.navigate('#plant/' + App.User.get() + '/' + $plantID, {
						'trigger': true
					});
				}
			});
		};


		$plants.on('doubleTap', doubleTapFunction);

		log('Backbone : DashboardView : Render');
	},

	'addNewButton': function (e) {
		var view = this;

		e.preventDefault();
		e.stopPropagation();


		Backbone.history.navigate('add', {
			'trigger': true
		});
	},

	'flipPlant': function (e) {
		var view = this;
		e.preventDefault();
		e.stopPropagation();
		var $target = $(e.currentTarget);



		var $flipSide = $('<li><img src="http://placekitten.com/100/100" /><h2>HERROOO</h2></li>');
		$flipSide.hide().insertAfter($target);
		view.trigger('plant:flipped');

		Walt.animate({
			'el': $target,
			'transition': 'fadeOutUp',
			'duration': '.4s',
			'callback': function () {
				$target.hide();

				Walt.animate({
					'el': $flipSide.show(),
					'transition': 'fadeInUp',
					'duration': '.4s'
				});


				$flipSide.on('click', function () {
					Walt.animate({
						'el': $flipSide,
						'transition': 'fadeOutUp',
						'duration': '.4s',
						'callback': function () {
							$flipSide.hide();
							Walt.animate({
								'el': $target.show(),
								'transition': 'fadeInUp',
								'duration': '.4s'
							});
						}
					});
				});

				$flipSide.on('doubleTap', view.doubleTapFunction);
			}
		});

	}

});