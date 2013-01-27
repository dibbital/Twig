/**
 * @module App
 * @class Global
 * @static
 */
var App = App || {};

_.extend(App, Backbone.Events);

App.Global = (function (window, document) {

	App.$window = $(window);
	App.$html = $(document.documentElement);
	App.$body = $(document.body);

	var self = {

		'init': function (config) {

			App.appRouter = new AppRouter();
			App.User.init();

			Backbone.history.start();

			// Hack to detect back button presses, triggers App-wide event back:button
			window.onload = function () {
				if(typeof history.pushState === "function") {
					history.pushState("jibberish", null, null);
					window.onpopstate = function () {
						history.pushState('newjibberish', null, null);
						App.trigger('back:button');
						// Handle the back (or forward) buttons here
						// Will NOT handle refresh, use onbeforeunload for this.
					};
				} else {
					var ignoreHashChange = true;
					window.onhashchange = function () {
						if(!ignoreHashChange) {
							ignoreHashChange = true;
							window.location.hash = Math.random();
							App.trigger('back:button');
							// Detect and redirect change here
							// Works in older FF and IE9
							// * it does mess with your hash symbol (anchor?) pound sign
							// delimiter on the end of the URL
						} else {
							ignoreHashChange = false;
						}
					};
				}
			}

			log('Global : Initialized');

		}
	};

	return self;

})(this, this.document);