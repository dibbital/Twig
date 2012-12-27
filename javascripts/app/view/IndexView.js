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


		if(window.loggedIn || App.User.isLoggedIn()) {
			this.render();
		}else{
			Backbone.history.navigate('#splash', {'trigger': true});
		}

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