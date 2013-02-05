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


		App.trigger('header:check', {
			'callback': function () {
				view.pageURL = 'templates/profile.php?uid=' + App.User.getID() + '&plantID=' + view.plantID;
				view.$el.load(view.pageURL, function () {
					view.render();
				});
			}
		});

		view.render();

		log('Backbone : NotificationView : Initialized');
	},


	'render': function () 
	{
		var view = this;
		view.updateNotifcations();
	},


	'updateNotifcations': function ()
	{
		//get last gauge #s from db
		var $call = $.ajax(
		{
			'url': 'query.php?a=currentStats&plantID=' + view.plantID
		}).done(function (response) 
		{
			log('getActGuages', view.plantID, response);
			var jsonified = $.parseJSON(response);
			//var $actMoisture = jsonified['moisture'];
			var $actLight = parseInt(jsonified['light']) / 100;
			var $actTemp = jsonified['light'];
		});
		
		//get correct guage values 
		var $call = $.ajax(
		{
			'url': 'query.php?a=PlantRightValues&plantID=' + view.plantID
		}).done(function (response) 
		{
			log('getRightVals', view.plantID, response);
			var jsonified = $.parseJSON(response);
			//var $rightMoisture = jsonified['moisture'];
			var $rightLight = $.jsonified['lightRight'];
			var $rightTemp = jsonified['light'];
		});

		//moisture 
		/*WE don't have this sensor set up yet*/	                            


		//light
		//set the correct values to the names 
		if($rightLight == 'SN') //some shade -second least amount
		{
			$rightLightMax = '2.4';
			$rightLightMin = '2';
		}
		else if($rightLight == 'N') //none -least amount
		{
			$rightLightMax = '3';
			$rightLightMin = '2.5';
		}
		else if ($rightLight == 'S') //shade -middle amount
		{
			$rightLightMax = '1.9';
			$rightLightMin = '1.4';
		}
		else if ($rightLight == 'FS') //full shade?
		{
			$rightLightMin = '0.9';
			$rightLightMax = '1.3;'
		}
		else if ($rightLight == 'FSN') //most full shade 
		{
			$rightLightMin = '0.3';
			$rightLightMax = '0.8';
		}

		//check to see if the real values are near the right values & spit out results
		if($actLight < $rightLightMin || $actLight > $rightLightMax) //if the actual moisture is less than the minimun value or the actual moisture is greater than the max value then bad
		{
			//badddddddd 
			$('#lightNoti').attr('value', 'The light values are bad!');
			//create a variable to create the ! above
			
			if($actLight < $rightLightMin) //less than min value
			{
				$('#lightNotiInfo').attr('value', 'Your plant needs more light!');
			}
			else($actLight < $rightLightMax) //higher than max value
			{
				$('#lightNotiInfo').attr('value', 'Your plant needs less light!');
			}
		}
		else if($actLight >= $rightLightMin && $actLight <= $rightLightMax) //if the actual moisture is greater than and equal to the moisture min or the actual moisture is less than or equal to the max value the good 
		{
			//goodddddd
			$('#lightNoti').attr('value', 'The light values are good!');
		}
		else($actLight == '0' || $actLight == 'NULL')
		{
			//light not working
			$('#lightNoti').attr('value', 'The light sensor might not be working properly.');
		}


		//temp
		/*after we get the values set them to values we can use*/
		if($rightTemp == '1')
		{
			$rightTempMin = '-60';
			$rightTempMax = '-10';
		}
		if($rightTemp == '2')
		{
			$rightTempMin = '-50';
			$rightTempMax = '0'; 
		}
		if($rightTemp == '3')
		{
			$rightTempMin = '-40';
			$rightTempMax = '10';
		}
		if($rightTemp == '4')
		{
			$rightTempMin = '-30';
			$rightTempMax = '20';
		}
		if($rightTemp == '5')
		{
			$rightTempMin = '-20';
			$rightTempMax = '30';
		}
		if($rightTemp == '6')
		{
			$rightTempMin = '-10';
			$rightTempMax = '40';
		}
		if($rightTemp == '7')
		{
			$rightTempMin = '0';
			$rightTempMax = '50';
		}
		if($rightTemp == '8')
		{
			$rightTempMin = '10';
			$rightTempMax = '60';
		}
		if($rightTemp == '9')
		{
			$rightTempMin = '20'; 
			$rightTempMax = '70';
		}
		if($rightTemp == '10')
		{
			$rightTempMin = '30';
			$rightTempMax = '80';
		}

		//check the actual values to the right values and spit out info
		if($actTemp < $rightTempMin || $actTemp > $rightTempMax) //if actual temp is less than the min right temp or greater than the max right temp
		{
			//badddddddd 
			$('#tempNoti').attr('value', 'The temperature values are bad!');
			//create a variable to create the ! above
			
			if($actTemp < $rightTempMin) //less than min value
			{
				$('#tempNotiInfo').attr('value', 'Your plant needs a higher temperature!');
			}
			else($actTemp < $rightTempMax) //higher than max value
			{
				$('#tempNotiInfo').attr('value', 'Your plant needs a lower temperature!');
			}
		}//close bad if
		else if($actTemp >= $rightTempMin && $actTemp <= $rightTempMax) //if the actual moisture is greater than and equal to the moisture min or the actual moisture is less than or equal to the max value the good 
		{
			//goodddddd
			$('#tempNoti').attr('value', 'The temperature values are good!');
		}
		else($actTemp == '0' || $actTemp == 'NULL')
		{
			//temp not working
			$('#tempNoti').attr('value', 'The temperature sensor might not be working properly.');
		}
	}

});