/**
 * @module Backbone
 * @submodule Backbone.View
 * @class POCView
 * @constructor
 */

var POCView = Backbone.View.extend({

	'events': {},

	'initialize': function(options) {

		_.bindAll(this);

		var view = this;

 		view.animateSpeed = 2; // in seconds
 		view.temperature = -1;
 		view.light = -1;
 		setInterval(view.update, 1000);
 		setInterval(view.renderLoop, 50);
 		view.render();

		log('Backbone : POCView : Initialized');
	},

	'render': function() {
		var view = this;

		var $temp = $('<div></div>', {
			'id': 'temperature',
			'data-val': '-1'
		});

		view.$el.append($temp);
		var $light = $('<div></div>', {
			'id': 'light',
			'data-val': '-1'
		});


		view.$el.append($light);
		Walt.animate($light,'rotateIn');
		Walt.animate($temp, 'bounceIn', function(){
			Walt.animate($temp, 'bounceOutDown', function(){
				Walt.animate($temp, 'rotateIn');
			});
		});


		view.startRender();
	},

 	'update': function() {
 		var view = this;
 		$.ajax({
 			'url': 'getStats.php',
 				'dataType': 'json',
 				'success': function (data) {
 					view.temperature = data.temp;
 					view.light = data.light;
 					log('Backbone : POCView : Update', data);
 				}
 		});
 	},

 	'startRender': function() {
 		var view = this;

		view.animLoop();
 	},
 	'animLoop': function () {
		var view = this;

		view.renderLoop();
	},
	'renderLoop': function() {
		var view = this;	
		var threshold = 2;
		var factor = 10;

		var currentTemp = parseFloat($('#temperature').attr('data-val'));
		var currentLight = parseFloat($('#light').attr('data-val'));

		if(currentTemp != view.temperature){
			currentTemp -= (currentTemp - view.temperature)/factor;
		}

		if(currentLight != view.light){
			currentLight -= (currentLight - view.light)/factor;
		}

		if(currentTemp >= view.temperature - threshold && currentTemp <= view.temperature+threshold){
			currentTemp = view.temperature;
		}


		if(currentLight >= view.light - threshold && currentLight <= view.light+threshold){
			currentLight = view.light;
		}
		var displayTemp = Math.round(currentTemp);
		var displayLight = Math.round(currentLight);
		if(currentTemp == view.temperature){
			displayTemp = currentTemp;
		}
		$('#temperature').attr('data-val', currentTemp).text(displayTemp + '°');
		$('#light').attr('data-val', currentLight).text(displayLight);

		// log('Backbone : POCView : Temp = ' + displayTemp + ' : Light = ' + displayLight);

	}

});