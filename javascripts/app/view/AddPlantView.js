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
			// view.$originalEl.fadeTo(350, .1);
			view.render();
		});

		log('Backbone : AddPlantView : Initialized');
	},

	'render': function () {
		var view = this;

		$('#plantPhoto').on('change', function (e) {
			// TODO: silently upload file to server, display
			// http://www.zurb.com/playground/ajax_upload
		});

		App.trigger('header:change', {
			'header': 'New Plant',
			'subtext': 'Add plant',
			'callback': function () {
				$('#header_global .button.left').fadeOut();
				$('#header_global .button.right').on('click', function (e) {
					e.preventDefault();
					e.stopPropagation();
					view.close(e);
				});
			}
		});

		$('#plantSearch').autocomplete({
			source: 'suggest_plant.php',
			minLength: 1
		});

		Walt.animate({
			'$el': view.$el.show(),
			'transition': 'fadeInUp',
			'duration': '.4s'
		});

		$('#submitButton').on('click', function (e) {
			view.submitForm(e);
		});

		log('Backbone : AddPlantView : Render');
	},

	'submitForm': function (e) {
		var view = this;
		e.preventDefault();
		e.stopPropagation();

		$form = view.$el.find('#newPlantForm');
		var nickname = $form.find('#nickname').val();
		var plantType = $form.find('#plantSearch').val();
		var age = $form.find('#age').val();

		var data = JSON.stringify({
			'name': nickname,
			'uid': App.User.getID(),
			'plantTypeID': plantType
		});

		$.ajax({
			'url': 'query.php?a=newPlant&data=' + data
		}).done(function (response) {
			var data = JSON.parse(response);
			if(data['return'] == 'success') {
				App.trigger('dashboard:reset');
				view.close({});
			}
		});
	},

	'close': function (e) {
		var view = this;
		if(!$.isEmptyObject(e)) {
			e.preventDefault();
			e.stopPropagation();

			// This shouldn't reset the header, the dashboardview should handle that
			App.trigger('header:change', {
				'header': 'Dashboard',
				'subtext': 'Your Plants'
			});
		}

		Walt.animate({
			'$el': view.$el,
			'transition': 'fadeOutDown',
			'duration': '.4s',
			'callback': function () {
				view.$el.remove();
			}
		});
		$('#header_global .button.right').off('click');
		Backbone.history.navigate('');


		$('#header_global .button.left').fadeIn();
		// view.$originalEl.fadeTo(350, 1);
	}

});