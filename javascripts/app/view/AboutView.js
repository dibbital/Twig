/**
 * AboutView
 * Used for the 'About' page
 */
var AboutView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);


		// Check header
		App.trigger('header:check', {
			'callback': function () {

				// Load page
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

		// Enable the default header buttons
		App.trigger('nav:enable');

		// Set title
		App.trigger('header:change', {
			'header': 'About',
			'subtext': '',
			'callback': function () {

			}
		});


		// Animate content into view
		Walt.animateEach({
			'list': view.$el.children().show(),
			'transition': 'fadeInUp',
			'duration': '.4s'
		});

		log('Backbone : AboutView : Render');
	}

});