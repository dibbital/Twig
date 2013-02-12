/**
 * @module Backbone
 * @submodule Backbone.View
 * @class NotificationView
 * @constructor
 */
var NotificationView = Backbone.View.extend(
{

	'events': {},
	
	'initialize': function (options) 
	{

		var view = this;
		_.bindAll(view);
		view.plantID = options.plantID;


		// Fires when all values have been loaded
		view.on('got:optimal:stats', view.compareStats);
		// Fires after current values are found
		view.on('got:current:stats', view.getOptimalStats);

		view.notificationCount = 0;

		view.pageURL = 'templates/notifications.php';
		view.$el.addClass('loading').load(view.pageURL, function () {
			view.$el.removeClass('loading');
			view.update();
		});

		log('Backbone : NotificationView : Initialized');
	},


	'render': function () 
	{
		var view = this;

		log('')

		log('Backbone : NotificationView : Render');
	},


	'update': function ()
	{
		log('Backbone : NotificationView : Update');
		var view = this;
		//get last gauge #s from db
		var $call = $.ajax(
		{
			'url': 'query.php?a=recentStats&plantID=' + view.plantID
		}).done(function (response) 
		{
			log('Backbone : NotificationView : Update : Response', response);
			var jsonified = $.parseJSON(response);
			//var $actMoisture = jsonified['moisture'];
			view.$currentLight = parseInt(jsonified['light']) / 100;
			view.$currentTemp = jsonified['temp'];
			view.trigger('got:current:stats');
		});
	},

	'getOptimalStats': function()
	{
		log('getOptimalStats');
			var view = this;
			//get correct guage values 
			var $call = $.ajax(
			{
				'url': 'query.php?a=getOptimalSettings&plantID=' + view.plantID
			}).done(function (response) 
			{
				log('getOptimalStats', view.plantID, response);
				var jsonified = $.parseJSON(response);
				//var $rightMoisture = jsonified['moisture'];
				view.$primeLight = jsonified['light'];
				view.$primeTemp = jsonified['temp'];
				view.$primeMoisture = jsonified['moisture'];
			});

			view.trigger('got:optimal:stats');
	},

	
	'compareStats': function(){
		var view = this;


		var luxInterval = 10;



		// N - none
		// SN - some shade
		// S - moderate shade
		// FSN - 'most full shade'
		// FS - full shade
		var lightLevels = ['N', 'SN', 'S', 'FSN', 'FS'];
		view.$primeLightLevel = (luxInterval / 5) * lightLevels.indexOf(view.$primeLight);
		// if(view.$primeLightLevel < 0){ view.$primeLightLevel = 0; }

		var curLight = view.$currentLight;
		var primeLight = view.$primeLightLevel;
		var primeLightMax = primeLight + luxInterval;

		if(curLight >= primeLight && curLight <= primeLightMax){
			log('light good!');
		}else if(curLight <= primeLight && curLight <= primeLightMax){
			log('light too low');
			view.notificationCount += 1;
			view.$el.append($('<li>Your plant needs more sunlight.</li>'));
		}else if(curLight >= primeLight && curLight >= primeLightMax){
			log('light too much');
			view.notificationCount += 1;
			view.$el.append($('<li>Your plant is getting too much sunlight.</li>'));
		}else{
			log('uh', curLight, primeLight, primeLightMax, luxInterval);
		}


		if(view.notificationCount > 0){
			if(view.$el.find('#note_count').length <= 0){
				view.$el.find('.header').append($('<span id="note_count"></span>'));
			}

			view.$el.find('#note_count').text(view.notificationCount);
		}
		// switch($view.primeTemp){

		// }


		// switch($view.primeMoisture){
		// 	// DM
		// 	// DMWe
		// 	// M
		// 	// Dry Soil  Moist Soil  Wet or Boggy Soil  Water Plants  Well-drained  Tolerates Drought 
		// 	// case 

		// }

	}

});