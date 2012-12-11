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

		/**
		 * Initialize Application. Responsible for instantiating Backbone router
		 * and starting Backbone history.
		 * @method App.Global.init
		 * @param config {Object} JS App configuration object, typically passed from the middle tier.
		 */
		'init': function(config) {

			App.appRouter = new AppRouter();

			Backbone.history.start();

			log('Global : Initialized');

		}
	};

	return self;

})(this, this.document);