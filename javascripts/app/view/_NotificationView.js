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
		var view = this;

		// Fires when all values have been loaded
		view.on('real:values', view.updateElements);
		// Fires after current values are found
		view.on('correct:values', view.getCorrectValues);


		//get last gauge #s from db
		var $call = $.ajax(
		{
			'url': 'query.php?a=currentStats&plantID=' + view.plantID
		}).done(function (response) 
		{
			log('getActGuages', view.plantID, response);
			var jsonified = $.parseJSON(response);
			//var $actMoisture = jsonified['moisture'];
			view.$actLight = parseInt(jsonified['light']) / 100;
			view.$actTemp = jsonified['light'];
			view.trigger('correct:values');
		});
	},

	'updateElements': function()
	{
		var view = this;
		//moisture 
		/*WE don't have this sensor set up yet*/	                            


		//light
		//set the correct values to the names 
		if(view.$rightLight == 'SN') //some shade -second least amount
		{
			view.$rightLightMax = '2.4';
			view.$rightLightMin = '2';
		}
		else if(view.$rightLight == 'N') //none -least amount
		{
			view.$rightLightMax = '3';
			view.$rightLightMin = '2.5';
		}
		else if (view.$rightLight == 'S') //shade -middle amount
		{
			view.$rightLightMax = '1.9';
			view.$rightLightMin = '1.4';
		}
		else if (view.$rightLight == 'FS') //full shade?
		{
			view.$rightLightMin = '0.9';
			view.$rightLightMax = '1.3;'
		}
		else if (view.$rightLight == 'FSN') //most full shade 
		{
			view.$rightLightMin = '0.3';
			view.$rightLightMax = '0.8';
		}

		//check to see if the real values are near the right values & spit out results
		if(view.$actLight < view.$rightLightMin || view.$actLight > view.$rightLightMax) //if the actual light is less than the minimun value or the actual light is greater than the max value then bad
		{
			//badddddddd 
			$('#lightNoti').val('The light values are bad!');
			//create a variable to create the ! above
			
			/*if(view.$actLight < view.$rightLightMin) //less than min value
			{
				$('#lightNotiInfo').val('Your plant needs more light!');
			}
			else(view.$actLight < view.$rightLightMax) //higher than max value
			{
				$('#lightNotiInfo').val('Your plant needs less light!');
			}*/
		}//end light bad
		else if(view.$actLight >= view.$rightLightMin && view.$actLight <= view.$rightLightMax) //if the actual light is greater than and equal to the light min or the actual light is less than or equal to the max value the good 
		{
			//goodddddd
			$('#lightNoti').val('The light values are good!');
		}
		else(view.$actLight == '0' || view.$actLight == 'NULL')
		{
			//light not working
			$('#lightNoti').val('The light sensor might not be working properly.');
		}


		//temp
		/*after we get the values set them to values we can use*/
		if(view.$rightTemp == '1')
		{
			view.$rightTempMin = '-60';
			view.$rightTempMax = '-10';
		}
		else if(view.$rightTemp == '2')
		{
			view.$rightTempMin = '-50';
			view.$rightTempMax = '0'; 
		}
		else if(view.$rightTemp == '3')
		{
			view.$rightTempMin = '-40';
			view.$rightTempMax = '10';
		}
		else if(view.$rightTemp == '4')
		{
			view.$rightTempMin = '-30';
			view.$rightTempMax = '20';
		}
		else if(view.$rightTemp == '5')
		{
			view.$rightTempMin = '-20';
			view.$rightTempMax = '30';
		}
		else if(view.$rightTemp == '6')
		{
			view.$rightTempMin = '-10';
			view.$rightTempMax = '40';
		}
		else if(view.$rightTemp == '7')
		{
			view.$rightTempMin = '0';
			view.$rightTempMax = '50';
		}
		else if(view.$rightTemp == '8')
		{
			view.$rightTempMin = '10';
			view.$rightTempMax = '60';
		}
		else if(view.$rightTemp == '9')
		{
			view.$rightTempMin = '20'; 
			view.$rightTempMax = '70';
		}
		else if(view.$rightTemp == '10')
		{
			view.$rightTempMin = '30';
			view.$rightTempMax = '80';
		}
		//check the actual values to the right values and spit out info
		if(view.$actTemp < view.$rightTempMin || view.$actTemp > view.$rightTempMax) //if actual temp is less than the min right temp or greater than the max right temp
		{
			//badddddddd 
			$('#tempNoti').val('The temperature values are bad!');
			//create a variable to create the ! above
			
			/*if(view.$actTemp < view.$rightTempMin) //less than min value
			{
				$('#tempNotiInfo').val('Your plant needs a higher temperature!');
			}
			else(view.$actTemp < view.$rightTempMax) //higher than max value
			{
				$('#tempNotiInfo').val('Your plant needs a lower temperature!');
			}*/
		}//close bad if
		else if(view.$actTemp >= view.$rightTempMin && view.$actTemp <= view.$rightTempMax) //if the actual moisture is greater than and equal to the moisture min or the actual moisture is less than or equal to the max value the good 
		{
			//goodddddd
			$('#tempNoti').val('The temperature values are good!');
		}
		else(view.$actTemp == '0' || view.$actTemp == 'NULL')
		{
			//temp not working
			$('#tempNoti').val('The temperature sensor might not be working properly.');
		}	
	},

	'getCorrectValues': function()
	{
			var view = this;
			//get correct guage values 
			var $call = $.ajax(
			{
				'url': 'query.php?a=PlantRightValues&plantID=' + view.plantID
			}).done(function (response) 
			{
				log('getRightVals', view.plantID, response);
				var jsonified = $.parseJSON(response);
				//var $rightMoisture = jsonified['moisture'];
				view.$rightLight = jsonified['lightRight'];
				view.$rightTemp = jsonified['tempRight'];
			});

			view.trigger('real:values');
	}

});