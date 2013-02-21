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
		view.userID = options.userID;
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
				// App.trigger('nav:right:disable');
				$('#header_global .button.right').attr('class', 'button right').addClass('backToDash');
				$('#header_global .button.right').unbind().on('click', function () {
					Backbone.history.navigate('', {'trigger': true});
					App.trigger('nav:enable');
					clearInterval(view.updateInterval);
				});
			}
		});

		view.notificationView = new NotificationView({
			'el': '#notificationCenter',
			'plantID': view.plantID
		});

		view.factsNtipsView = new FactsTipsView({
			'el': '#factsNtips',
			'pid': view.plantID,
			'uid': App.User.currentUser['userID']
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
										}, 5000);
									}
								});
							}
						});
					}
				});
			}
		});


		// view.$el.find('#swipe').on('swipe', function(e){
		// 	e.preventDefault();
		// 	log('swipe', e, e.direction);
		// });
	

		$('#section_content').on('dragstart', function(e){ e.preventDefault(); e.stopPropagation(); });
		$('#swipe img').on('dragstart', function(e){ e.preventDefault(); e.stopPropagation(); });

	
		
		$("#swipe")
		   .hammer().on("swipe", function(e) {
		   	e.preventDefault();
		   		var dir = "";
		        if(e.direction == 'right'){
		        	// Previous;
		        	var next = parseInt($('#swipe').attr('data-prev'));
		        	dir = 'Right';
		        }else if(e.direction == 'left'){
		        	// Next;
		        	var next = parseInt($('#swipe').attr('data-next'));	
		        	 dir = 'Left';
		        }




		        // Attr was empty = no next/prev
		        log('next', next);
		        if(next == "" || isNaN(next)){
	        		return;
	        	}else{
	        		view.closeView();
			        Backbone.history.navigate('plant/' + view.userID + '/' + next, {'trigger': true});
	        	}	        	
		   });

		// Turns gauges into knobbies
		view.$el.find('.dial').knob();
		view.startUpdateTimers();

		Pablo.init();
		Pablo.updateData();

		log('Backbone : ProfileView : Render');
	},

	'startUpdateTimers': function(){
		var view = this;


		view.updateInterval = setInterval(function(){

			var waterDisplay = parseFloat($('#waterGuage').attr('value'));
			var waterValue = parseFloat($('#waterGuage').attr('data-value'));
			var lightDisplay = parseFloat($('#lightGuage').attr('value'));
			var lightValue = parseFloat($('#lightGuage').attr('data-value'));
			var tempDisplay = parseFloat($('#tempGuage').attr('value'));
			var tempValue = parseFloat($('#tempGuage').attr('data-value'));

				if( waterDisplay < waterValue ){
					$('#waterGuage').attr('value', waterDisplay + ((waterValue - waterDisplay) / 10) );
				}else if(waterDisplay > waterValue){
					$('#waterGuage').attr('value', waterDisplay + ((waterDisplay - waterValue) / 10) );
				}

				if(waterDisplay >= waterValue - 1.5 && waterDisplay <= waterValue + 1.5){
					$('#waterGuage').attr('value', waterValue);
				}


				// #3

				if( lightDisplay < lightValue ){
					$('#lightGuage').attr('value', lightDisplay + ((lightValue - lightDisplay) / 10 ));
				}else if(lightDisplay > lightValue){
					$('#lightGuage').attr('value', lightDisplay + ((lightDisplay - lightValue) / 10 ));
				}


				if(lightDisplay >= lightValue - .5 && lightDisplay <= lightValue + .5){
					$('#lightGuage').attr('value', lightValue);
				}

				// #

				if( tempDisplay < tempValue ){
					$('#tempGuage').attr('value', tempDisplay + ((tempValue - tempDisplay) / 10 ));
				}else if(tempDisplay > tempValue){
					$('#tempGuage').attr('value', tempDisplay + ((tempDisplay - tempValue) / 10 ));
				}

				if(tempDisplay >= tempValue - 1.5 && tempDisplay <= tempValue + 1.5){
					$('#tempGuage').attr('value', tempValue);
				}

				view.$el.find('.dial').trigger('change');
			}, 50);
	},

	'handleNav': function (e) {
		e.preventDefault();
		e.stopPropagation();

		var view = this;

		var $target = $(e.currentTarget);
		var newSection = $target.attr('data-section');

		view.$el.find('.profileContent > .active').removeClass('active');
		view.$el.find('.profileContent #' + newSection).addClass('active');

		if(newSection == 'progress'){
			Pablo.redraw();
		}
	},

	'updateGuages': function () {
		var view = this;

		var $call = $.ajax({
			'url': 'query.php?a=currentStats&plantID=' + view.plantID
		}).done(function (response) {
			// log('updateGuages', view.plantID, response);
			var jsonified = $.parseJSON(response);

			$('#waterGuage').attr('data-value', jsonified['moisture']);
			$('#lightGuage').attr('data-value', parseInt(jsonified['light']) / 100);
			$('#tempGuage').attr('data-value', jsonified['temp']);

			
			
		});
	},

	'closeView': function(){
		var view = this;

		if(typeof view.updateInterval != undefined){
			clearInterval(view.updateInterval);
		}
	}

});

























