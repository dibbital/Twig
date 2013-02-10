/**
 * @module Backbone
 * @submodule Backbone.View
 * @class FactsTipsView
 * @constructor
 */
var FactsTipsView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);

		view.pageURL = 'templates/factstips.php?pid=' + options.pid + '&uid=' + options.uid;
		view.$el.load(view.pageURL, function () {
			view.render();
		});
		log('Backbone : FactsTipsView : Initialized');
	},

	'render': function () {
		var view = this;

		view.$el.find('li').on('click', function (e) {
			var $this = $(this);

			if($this.hasClass('open')) {
				$this.removeClass('open');
			} else {

				view.$el.find('.open').removeClass('open');
				$this.addClass('open');
			}
		});
	}

});