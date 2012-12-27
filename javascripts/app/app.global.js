/**
 * @module App
 * @class Global
 * @static
 */

var App = App || {};

_.extend(App, Backbone.Events);

App.Global = (function(window, document) {

	App.$window = $(window);
	App.$html = $(document.documentElement);
	App.$body = $(document.body);

	var self = {
		
		'init': function(config) {

			App.appRouter = new AppRouter();
			App.User.init();

			Backbone.history.start();

			log('Global : Initialized');

		}
	};

	return self;

})(this, this.document);