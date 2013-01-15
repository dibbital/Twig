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

		var $silentFrame = $('<iframe id="frameLoader" name="frameLoader" seamless height="100%" width="100%" onLoad="App.trigger(\'iframe:loaded\');"></iframe>');
			view.$el.append($silentFrame);
			$silentFrame.hide();
		$('#plantPhoto').on('change', function (e) {
			$('#plantPhoto').off('change');
			// TODO: silently upload file to server, display
			$('#plantPhoto').addClass('loader');
			App.on('iframe:loaded', function(e){
				var returnText = $($('#frameLoader')[0].contentDocument).find('body').text();
				if(returnText.indexOf('ERROR') == -1){
					var $newImage = $('#imgThumb');
					$newImage.attr('src', '/' + returnText);
				}else{
					alert(returnText);
				}
				$('#plantPhoto').removeClass('loader');
			});
			view.$el.find('#uploadForm').submit();
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