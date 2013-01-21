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

		log('Backbone : AddPlantView : Initialized');
	},

	'render': function () {
		var view = this;

		App.on('back:button clear:modals',  view.close);

		var $silentFrame = $('<iframe id="frameLoader" name="frameLoader" seamless height="100%" width="100%" onLoad="App.trigger(\'iframe:loaded\');"></iframe>');
		view.$el.append($silentFrame);
		$silentFrame.hide();
		$('#plantPhoto').on('change', function (e) {
			$('#plantPhoto').off('change');
			// TODO: silently upload file to server, display
			$('#plantPhoto').addClass('loader');
			App.on('iframe:loaded', function (e) {
				var returnText = $($('#frameLoader')[0].contentDocument).find('body').text();
				if(returnText.indexOf('ERROR') == -1) {
					var $newImage = $('#imgThumb');
					$newImage.attr('src', '/' + returnText);
				} else {
					alert(returnText);
				}
				$('#plantPhoto').removeClass('loader');
			});
			view.$el.find('#uploadForm').submit();
		});

		/* Left Button stuff, why is there so much */
		view.leftHeaderButtonFunction = function (e) {
			e.preventDefault();
			e.stopPropagation();
			view.close(e);
		};

		view.on('custom:left', function () {
			$('#header_global .button.left').on('click', view.leftHeaderButtonFunction);
		});

		view.on('default:left', function () {
			$('#header_global .button.left').off('click', view.leftHeaderButtonFunction);
		});



		App.trigger('header:change', {
			'header': 'New Plant',
			'subtext': 'Add plant',
			'callback': function () {
				App.trigger('nav:disable');
				$('#header_global .button.right').fadeOut();
				view.trigger('custom:left');
			}
		});

		$('#plantSearch').autocomplete({
			source: 'suggest_plant.php',
			minLength: 1,
			select: function(event, ui) {
				$('#plantType').val(ui.item.value);
			    $(this).val(ui.item.label);
			    return false;
			}
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
		var plantType = $form.find('#plantType').val();
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
				view.close({});
			}
		});
	},

	'close': function (e) {
		if(!$.isEmptyObject(e)) {
			e.preventDefault();
			e.stopPropagation();
		}
		var view = this;

		App.off('back:button clear:modals', view.close);

		

		App.trigger('dashboard:reset');

		Walt.animate({
			'$el': view.$el,
			'transition': 'fadeOutDown',
			'duration': '.4s',
			'callback': function () {
				view.$el.remove();
			}
		});


		$('#header_global .button.right').removeClass('active').fadeIn();
		view.trigger('default:left');

		App.trigger('nav:enable');
		Backbone.history.navigate('');


		// $('#header_global .button.left').fadeIn();
		// view.$originalEl.fadeTo(350, 1);
	}

});