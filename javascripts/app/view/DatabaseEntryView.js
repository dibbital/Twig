/**
 * @module Backbone
 * @submodule Backbone.View
 * @class ProfileView
 * @constructor
 */
var DatabaseEntryView = Backbone.View.extend({

	'events': {
		'click .plantDBNav li': 'handleNav',
		'click .content .info li': 'switchSection'
	},

	'initialize': function (options) {

		var view = this;
		_.bindAll(view);
		// view.userID = options.userID;
		view.plantID = options.plantID;


		App.trigger('header:check', {
			'callback': function () {
				view.pageURL = 'templates/db_entry.php?plantID=' + view.plantID;
				view.$el.addClass('loading').load(view.pageURL, function () {
					view.$el.removeClass('loading');
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
			'header': $('#data').attr('data-common'),
			'subtext': $('#data').attr('data-latin'),
			'callback': function () {
				$('#header_global .button.right').on('click', function () {
					Backbone.history.navigate('search', {'trigger': true});
					//$('#header_global .button.right').removeClass('backToDash');
					App.trigger('nav:enable');
				});
			}
		});

		$('.plantDBNav li').eq(0).addClass('active');

		var $hero = view.$el.find('.hero').hide();
		var $dbNav = view.$el.find('.plantDBNav li').hide();
		var $overview = view.$el.find('.overview').hide();
		var $stats = view.$el.find('.side .divs').hide();
		var $notes = view.$el.find('.content').hide();


		// I dub thee:
		// Mt. Callback! -part deux-
		Walt.animate({
			'$el': $hero.show(),
			'transition': 'fadeInLeft',
			'duration': '.7s',
			'callback': function () {
				Walt.animateEach({
					'list': $dbNav.show(),
					'transition': 'fadeInUp',
					'delay': .05,
					'duration': '.3s',
					'callback': function () {
						Walt.animateEach({
							'list': $overview.show(),
							'transition': 'fadeInLeft',
							'delay': .1,
							'duration': '.5s',
							'callback': function () {
								Walt.animateEachChild({
									'container': $stats.fadeIn(),
									'transition': 'fadeInLeftBig',
									'delay': .05,
									'duration': '.4s',
									'callback': function () {
										Walt.animateEachChild({
											'container': $notes.show(),
											'transition': 'fadeInUp',
											'delay': .1,
											'duration': '.4s'
										});
									}
								});
							}
						});
					}
				});
			}
		});


		log('Backbone : ProfileView : Render');
	},

	'handleNav': function (e) {
		e.preventDefault();
		e.stopPropagation();

		var view = this;

		var $target = $(e.currentTarget);
		var newSection = $target.find('a').attr('data-section');

		view.$el.find('.plantDBContent > .active').removeClass('active');
		view.$el.find('.plantDBNav > .active').removeClass('active');
		view.$el.find('.plantDBContent #' + newSection).addClass('active');

		$($target).addClass('active');
	},

	'switchSection' : function(e){
		e.preventDefault();
		e.stopPropagation();

		var view = this;
		var $target = $(e.currentTarget);
		
		if($($target).find('.sub').hasClass('active')){
			$($target).find('h2').removeClass('active');
			$($target).find('.sub').removeClass('active');
		}else{
			view.$el.find('.content .info li .sub').removeClass('active');
			$($target).find('.sub').addClass('active');
			$($target).find('h2').addClass('active');
		}
	}

});

























