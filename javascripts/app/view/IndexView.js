/**
 * @module Backbone
 * @submodule Backbone.View
 * @class IndexView
 * @constructor
 */

var IndexView = Backbone.View.extend({

	'events': {},

	'initialize': function(options) {

		_.bindAll(this);


		// Check if user is logged in
		  // If not, redirect to #splash
		// Else, render the dashboard
		this.render();

		log('Backbone : IndexView : Initialized');
	},

	'render': function() {
		var view = this;
		
		if(typeof view.dashboardView == 'undefined'){
			App.trigger('header:check', {'callback': function(){
				view.dashboardView = new DashboardView({
					'el': '#section_content'
				});
			}});
		}
		

		log('Backbone : IndexView : Render');
	}

});