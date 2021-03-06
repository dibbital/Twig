/**
 * @module Backbone
 * @submodule Backbone.View
 * @class ContactView
 * @constructor
 */
var ContactView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);

		App.trigger('header:check', {
			'callback': function () {
				view.pageURL = 'templates/contact.php';
				view.$el.addClass('loading').load(view.pageURL, function () {
					view.$el.removeClass('loading');
					view.render();
				});
			}
			});

		log('Backbone : ContactView : Initialized');
	},

	'render': function () {
		var view = this;


		App.on('back:button', view.close);
		App.on('clear:modals', view.close);
		App.trigger('nav:enable');

		App.trigger('header:change', {
			'header': 'Contact',
			'subtext': '',
			'callback': function () {

			}
		});


		Walt.animateEach({
			'list': view.$el.children().show(),
			'transition': 'fadeInUp',
			'duration': '.4s'
		});

		log('Backbone : ContactView : Render');
	},


	'close': function (e) {
		var view = this;

	}

});