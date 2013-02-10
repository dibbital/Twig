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


		// Header Check
		// bug: this provides the title bar, however no IndexView is created
		App.trigger('header:check', {
			'callback': function () {
				view.pageURL = 'templates/addplant.php';
				view.$el.addClass('loading').load(view.pageURL, function () {
					view.$el.removeClass('loading');
					view.render();
				});
			}
		});



		log('Backbone : AddPlantView : Initialized');
	},

	'render': function () {
		var view = this;

		
		App.Utilities.supportPlaceholders();

		App.on('back:button clear:modals', view.close);

		// silentFrame is for uploading the user's image in the background
		var $silentFrame = $('<iframe id="frameLoader" name="frameLoader" seamless height="100%" width="100%" onLoad="App.trigger(\'iframe:loaded\');"></iframe>');
		view.$el.append($silentFrame);
		$silentFrame.hide();


		// #plantPhoto is the file picker. Change is fired when a file is chosen for upload
		$('#plantPhoto').on('change', function (e) {
			$('#plantPhoto').unbind().addClass('loader');

			// This is triggered when the iFrame finishes loading (onLoad)
			App.on('iframe:loaded', function (e) {
				// Pluck the body out of the iframe
				var returnText = $($('#frameLoader')[0].contentDocument).find('body').text();
				// Error check and all that
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
			$('#header_global .button.left').addClass('close').on('click', view.leftHeaderButtonFunction);
		});
		view.on('default:left', function () {
			$('#header_global .button.left').removeClass('close').off('click', view.leftHeaderButtonFunction);
		});

		Walt.animate({
			'$el': $('#header_global .button.right'),
			'transition': 'fadeOutDown',
			'duration': '.4s',
			'callback': function () {
				App.trigger('nav:left:disable');
				view.trigger('custom:left');
				$('#header_global .button.right').hide();
			}
		});

		App.trigger('header:change', {
			'header': 'New Plant',
			'subtext': 'Add plant'
		});


		// Plant type suggestion
		$('#plantSearch').autocomplete({
			source: 'suggest_plant.php',
			minLength: 1,
			select: function (event, ui) {
				$('#plantType').val(ui.item.value);
				$(this).val(ui.item.label);

				// Ajax to get the scientific name (used for searching for default photos)
				$.ajax({
					'url': 'query.php?a=getScientificName&pid=' + ui.item.value
				}).done(function (response) {
					log('done ajaxing', response);
					$('#plantSearch').attr('data-scientific', response);
				});

				return false;
			}
		});



		// Fade in the dialog
		Walt.animate({
			'$el': view.$el.show(),
			'transition': 'fadeInUp',
			'duration': '.4s'
		});


		// Event Bindings

		// Submit button
		$('#submitButton').on('click', function (e) {
			view.submitForm(e);
		});


		// Function to find default photos
		// This should be a model
		$('#findDefault').on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();

			// Get the scientific name, replace the spaces with %20's
			var searchQuery = $('#plantSearch').attr('data-scientific');
			searchQuery = (searchQuery).replace(' ', '%20');

			// Find any existing photo container, remove it
			$('#defaultPhotosContainer').remove();
			$('<div id="defaultPhotosContainer"><div id="defaultPhotos"></div></div>').insertAfter($('#findDefault'));

			var $photoSection = $('#defaultPhotos');
			$('#defaultPhotosContainer').addClass('loading');

			// Ajax to retrieve photos from PHP
			$.ajax({
				'url': 'query.php?a=getDefaultPhotosString&name=' + searchQuery
			}).done(function (data) {
				$('#defaultPhotosContainer').removeClass('loading');
				$photoSection.empty();
				var $data = $(data);
				$photoSection.append($data.find('.gallerythumbtoptable img'));
				$data.remove();

				// If no images are found..
				if($photoSection.children().length <= 0) {
					alert('Sorry! No photos were found!');
					$('#defaultPhotosContainer').empty().unbind().remove();
					return;
				}

				// This is a little gross, but necessary to get horizontal working
				var containerWidth = 0;

				// Event when a default photo has been selected
				view.on('photo:chosen', function () {
					var originalImage = $('.grabbed.selected').attr('src');
					$('#imgThumb').attr('src', originalImage);
					// Save the photo from the remote server to local
					$.ajax({
						'url': 'query.php?a=savePhoto&fileUrl=' + originalImage + '&fileName=' + parseInt(Math.random() * 9999999) + '_' + parseInt(Math.random() * 9999999) + '.jpg'
					}).done(function (response) {
						$('#imgThumb').attr('src', response);
					});
					$photoSection.unbind().remove();
				});

				var $images = $photoSection.find('img');

				// For each image that was returned, we need to
				// replace the source and remove it from being a thumbnail
				$images.each(function (i, v) {
					if(i >= 10) {
						$(v).remove();
						return;
					}
					var $this = $(this);
					var source = $this.attr('src');
					source = 'http://plants.usda.gov' + source;
					// What? this isn't hacky at all!
					source = source.replaceAll('thumbs', 'standard');
					source = source.replaceAll('thp.jpg', 'shp.jpg');
					source = source.replaceAll('tvp.jpg', 'svp.jpg');
					source = source.replaceAll('tvd.jpg', 'svd.jpg');
					source = source.replaceAll('t.jpg', '.jpg');



					$(v).remove();
					$photoSection.append($('<span><img src="' + source + '" class="grabbed" data-name="' + searchQuery + '" /></span>'));
				});


				// Event for when each image finishes loading
				$photoSection.find('img.grabbed').load(function (e) {
					var v = this;
					var $v = $(this);
					// Resize the container accordingly
					containerWidth += $(v).width() + parseInt($(v).css('margin-right')) + 10;
					$photoSection.css('width', containerWidth + 'px');

					// Click event for selecting images
					$v.on('click', function (e) {
						// If it's already selected
						if($v.hasClass('selected')) {
							// Fire the event to save the photo and all that
							view.trigger('photo:chosen')
							return;
						}

						// If it's another image, change selection
						$photoSection.find('.selected').removeClass('selected');
						$v.addClass('selected');
					});
				});
			});
		});

		log('Backbone : AddPlantView : Render');
	},


	// #TODO: update submission form to figure out/record age
	//   Can just be an estimated offset ? Save in plant_stuff and
	// adjust age display according later? Or something.

	'submitForm': function (e) {
		var view = this;
		e.preventDefault();
		e.stopPropagation();

		$form = view.$el.find('#newPlantForm');
		var nickname = $form.find('#nickname').val();
		var plantType = $form.find('#plantType').val();
		var device = $form.find('#device').val();

		if(nickname == "" || plantType == "") {
			return;
		}

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
			log('response', response);
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
		// $('#header_global .button.right').removeClass('active').fadeIn();
		view.trigger('default:left');

		App.trigger('nav:enable');

		Walt.animate({
			'$el': $('#header_global .button.right').removeClass('active').show(),
			'transition': 'fadeInUp',
			'duration': '.4s'
		});

		App.trigger('dashboard:reset');

		Backbone.history.navigate('', {
			'trigger': true,
			'replace': true
		});
	}

});
