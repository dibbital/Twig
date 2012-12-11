/**
 * @module Backbone
 * @submodule Backbone.View
 * @class AddPlantView
 * @constructor
 */
var AddPlantView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);

		// Backbone.history.navigate('', {'trigger': false, 'replace': true});

		var $newEl = $('<div></div>', {
			'class': 'addPlant'
		});

		$newEl.hide().insertAfter(view.$el);
		view.$originalEl = view.$el;
		view.$el = $newEl;

		view.pageURL = 'templates/addplant.php';
		view.$el.load(view.pageURL, function () {
			view.$originalEl.fadeTo(350, .1);
			view.render();
		});

		log('Backbone : AddPlantView : Initialized');
	},

	'render': function () {
		var view = this;

		App.trigger('header:change', {
			'header': 'Add a Plant',
			'subtext': 'do it, c\'mon',
			'callback': function () {
				$('#header_global .button.left').fadeOut();
				$('#header_global .button.right').on('click',function(e){
					view.close(e);
				});
			}
		});

		Walt.animate({
			'$el': view.$el.show(),
			'transition': 'fadeInRight',
			'duration': '.4s'
		});

		log('Backbone : AddPlantView : Render');
	},

	'close': function (e) {
		var view = this;
		e.preventDefault();
		e.stopPropagation();

		view.$el.fadeOut();
		$('#header_global .button.right').off('click');
		Backbone.history.navigate('');
		// 'trigger': true
		App.trigger('header:change', {
			'header': 'Dashboard',
			'subtext': 'Your Plants'
		});
		$('#header_global .button.left').fadeIn();
		view.$originalEl.fadeTo(350, 1);
	}

});