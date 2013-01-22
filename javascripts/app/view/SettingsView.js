/**
 * @module Backbone
 * @submodule Backbone.View
 * @class SettingsView
 * @constructor
 */
var SettingsView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);

		var $newEl = $('<div></div>', {
			'class': 'addPlant'
		});

		$newEl.hide().insertAfter(view.$el);
		view.$originalEl = view.$el;
		view.$el = $newEl;

		view.pageURL = 'templates/addplant.php';
		view.$el.load(view.pageURL, function () {
			view.render();
		});

		log('Backbone : SettingsView : Initialized');
	},

	'render': function () {
		var view = this;


		App.on('back:button', view.close);
		App.on('clear:modals', view.close);

		/* Left Button stuff, why is there so much */
		view.leftHeaderButtonFunction = function (e) {
			e.preventDefault();
			e.stopPropagation();
			view.close(e);
		};

		view.on('custom:left', function () {
			$('#header_global .button.left').addClass('close').on('click', view.leftHeaderButtonFunction);
		});

		view.on('default:left', function () {
			$('#header_global .button.left').removeClass('close').off('click', view.leftHeaderButtonFunction);
		});


		App.trigger('nav:disable');
		view.trigger('custom:left');
		$('#header_global .button.right').fadeOut();

		App.trigger('header:change', {
			'header': 'Settings',
			'subtext': 'Manage Your Plants',
			'callback': function () {

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

		log('render 5');
		log('Backbone : SettingsView : Render');
	},

	'submitForm': function (e) {
		var view = this;
		e.preventDefault();
		e.stopPropagation();

		$form = view.$el.find('#newPlantForm');
		var nickname = $form.find('#nickname').val();
		var plantType = $form.find('#plantSearch').val();
		var device = $form.find('#device').val();

		var data = JSON.stringify({
			'name': nickname,
			'uid': App.User.getID(),
			'plantTypeID': plantType,
			'plantImg': $('#imgThumb').attr('src'),
			'device': device
		});

		$.ajax({
			'url': 'query.php?a=newPlant&data=' + data
		}).done(function (response) {
			var data = JSON.parse(response);
			if(data['return'] == 'success') {
				// App.trigger('dashboard:reset');
				view.close({});
			}
		});
	},

	'close': function (e) {
		var view = this;

		App.off('back:button', view.close);

		if(!$.isEmptyObject(e)) {
			e.preventDefault();
			e.stopPropagation();
		}

		App.trigger('dashboard:reset');

		Walt.animate({
			'$el': view.$el,
			'transition': 'fadeOutDown',
			'duration': '.4s',
			'callback': function () {
				view.$el.remove();
			}
		});

		App.trigger('nav:enable');
		$('#header_global .button.right').removeClass('active').fadeIn();
		view.trigger('default:left');


		Backbone.history.navigate('');


		// $('#header_global .button.left').fadeIn();
		// view.$originalEl.fadeTo(350, 1);
	}

});