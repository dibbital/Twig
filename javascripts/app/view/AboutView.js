/**
 * @module Backbone
 * @submodule Backbone.View
 * @class AboutView
 * @constructor
 */
var AboutView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);

		App.trigger('header:check', {
			'callback': function () {
				view.pageURL = 'templates/about.php';
				view.$el.addClass('loading').load(view.pageURL, function () {
					view.$el.removeClass('loading');
					view.render();
				});
			}
		});

		log('Backbone : AboutView : Initialized');
	},

	'render': function () {
		var view = this;


		App.on('back:button', view.close);
		App.on('clear:modals', view.close);
		App.trigger('nav:enable');

		App.trigger('header:change', {
			'header': 'About',
			'subtext': '',
			'callback': function () {

			}
		});


		Walt.animateEach({
			'list': view.$el.children().show(),
			'transition': 'fadeInUp',
			'duration': '.4s'
		});

		log('Backbone : AboutView : Render');
	},


	'close': function (e) {
		var view = this;

	}

});