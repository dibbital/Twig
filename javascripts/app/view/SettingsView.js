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

		view.pageURL = 'templates/settings.php';
		view.$el.load(view.pageURL, function () {
			App.on('clear:modals', function () {
				view.close();
			});
			view.render();
		});

		log('Backbone : SettingsView : Initialized');
	},

	'render': function () {
		var view = this;

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
			$('#header_global .button.left').removeClass('close'); //.off('click', view.leftHeaderButtonFunction);
		});

		Walt.animate({
			'$el': $('#header_global .button.right'),
			'transition': 'fadeOutDown',
			'duration': '.4s',
			'callback': function () {
				App.trigger('nav:disable');
				view.trigger('custom:left');
				$('#header_global .button.right').hide();
			}
		});


		App.trigger('header:change', {
			'header': 'Settings',
			'subtext': 'Manage Your Plants',
			'callback': function () {

			}
		});

		Walt.animate({
			'$el': view.$el.show(),
			'transition': 'fadeInUp',
			'duration': '.4s'
		});

		/* ----- */



		var $settings = view.$el.find('#settings');
		$settings.find('.name.button').on('click', function (e) {
			var $this = $(e.currentTarget);
			if($this.parent().hasClass('open')) {
				$this.parent().removeClass('open');
			} else {
				$settings.find('.open').removeClass('open');
				$this.parent().addClass('open');
			}
		});


		view.$el.find('.button.red').on('click', view.deletePrompt);



		log('Backbone : SettingsView : Render');
	},

	'deletePrompt': function (e) {
		var view = this;

		// log(e, $(e.currentTarget), $(e.currentTarget).closest('h2'), $(e.currentTarget).closest('h2').attr('data-plant-nickname'));
		var $parentPlant = $(e.currentTarget).closest('.plant');
		var name = $parentPlant.attr('data-plant-nickname');
		var type = $parentPlant.attr('data-plant-type');
		var uid = $parentPlant.attr('data-uid');
		var pid = $parentPlant.attr('data-pid');

		if(typeof view.$dim === 'undefined') {
			view.$dim = $('<div class="dim"></div>');
			view.$modal = $('<div class="confirm"><p>This will permanently delete <em>' + name + ' (' + type + ')</em> <span>This can not be undone.</span></p><div class="btnContainer"><div class="button" id="btncancel">Cancel</div><div class="button red" id="btndelete">Delete</div></div>');
			view.$el.append(view.$dim.hide());
			view.$el.append(view.$modal.hide());
		}
		view.$el.closest('.addPlant').addClass('modafied');

		view.$dim.fadeIn();
		view.$modal.fadeIn();

		view.$modal.find('#btncancel').on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();

			view.$dim.fadeOut();
			view.$modal.fadeOut();
			$('.modafied').removeClass('modafied');

			view.$modal.find('#btncancel').unbind();
		});

		view.$modal.find('#btndelete').on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();

			view.$modal.addClass('loading');



			$.ajax({
				'url': 'query.php?a=deletePlant&uid=' + uid + '&pid=' + pid
			}).done(function (response) {
				if(response == 'success') {
					view.$dim.fadeOut();
					view.$modal.removeClass('loading').fadeOut();
					$('.modafied').removeClass('modafied');
					$parentPlant.remove();
				} else {
					alert(response);
				}
			});

			view.$modal.find('#btncancel').unbind();
		});



	},

	'close': function (e) {
		var view = this;

		// App.off('back:button', view.close);

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
		Walt.animate({
			'$el': $('#header_global .button.right').removeClass('active').show(),
			'transition': 'fadeInUp',
			'duration': '.4s'
		});
		view.trigger('default:left');


		Backbone.history.navigate('');


		// $('#header_global .button.left').fadeIn();
		// view.$originalEl.fadeTo(350, 1);
	}

});