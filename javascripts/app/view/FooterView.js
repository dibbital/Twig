/**
 * @module Backbone
 * @submodule Backbone.View
 * @class FooterView
 * @constructor
 */
var FooterView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(this);

		view.pageURL = 'templates/footer.php';
		view.$el.load(view.pageURL, function () {
			view.render();
		});

		log('Backbone : FooterView : Initialized');
	},

	'render': function () {
		var view = this;

		// $(document.body).append(view.$el);

		log('Backbone : FooterView : Render');
	}

});