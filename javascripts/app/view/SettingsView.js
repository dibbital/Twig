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
				view.$el.find('.alertDiv').remove();
				$this.parent().addClass('open');
			}
		});


		view.$el.find('.button.green').on('click', view.manageSetting);
		//$('.alertDiv').addClass('closed').hide();
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

	'manageSetting':function(e){
		var view = this;
		e.preventDefault();
		e.stopPropagation();
		
		var $target = e.currentTarget;
		view.$plantID = $($target).parent().parent().data('pid');
		view.$userID = $($target).parent().parent().data('uid'); 
		console.log(view.$plantID + ", " + view.$userID);

		if(!$($target).hasClass('open')){
			$($target).addClass('open')
		}else{
			$($target).removeClass('open');
		}

		if(view.$el.find('.alertDiv').length == 0){
			var $alertDiv = $("<div class='alertDiv'><h3>Choose the type of alert you would like to receive</h3><br/><form id='alertType'><div><label for='alertRadioEmail'>Email</label><input type='radio' id='alertRadioEmail' name='type' value='email' style='background: #FBFBFB;'></input></div><div><label for='alertRadioPhone'>Text</label><input type='radio' id='alertRadioPhone' name='type' value='text' style='background: #FBFBFB;'></input></div><br/><div id='alertText'><label for='phone'>Phone Number (ex.(123)456-7890)</label><input id='phone' type='text' name='address' placeholder='Phone Number'></input><br/><label for='carrier'>Carrier</label><br><select id='carrier' name='carrier'><option value='messaging.sprintpcs.com'>Sprint</option><option value='vtext.com'>Verizon</option><option value='mobile.att.net'>AT&T</option><option value='tmomail.net'>T-Mobile</option></select></div><div class='submitForm'>Submit</div></form></div>");
			$($alertDiv).insertAfter($($target));
		}

		//console.log($target);
		var setting = $($target).data('value');
		var parent = $($target).parent().parent();
		view.$list = $($target).parent().parent().find('.plantAlert');
		console.log(view.$list);
		//console.log(parent);

		var $settingsDiv = $(parent).find(' .'+setting+'Div');

		switch(setting){
			case 'alert': 
				if($($target).hasClass('open')){

					$alertForm = $('#alertType');
					$alertForm.find('#alertEmail').hide();
					$alertForm.find('#alertText').hide();

					$alertForm.find("input[name='type']").on('click', function(){
						var $type = $alertForm.find("input[type='radio']:checked").val();
						if($type == 'text'){
							$alertForm.find('#alertEmail').hide();
							$alertForm.find('#alertText').show();
						}

						if($type == 'email'){
							$alertForm.find('#alertEmail').show();
							$alertForm.find('#alertText').hide();
						}
					});

					view.$el.find('.submitForm').on('click', function(e){
						e.preventDefault();
						e.stopPropagation();
						var $type = $alertForm.find("input[type='radio']:checked").val();
						if($type != undefined){
							view.changeAlertSetting($type);
						};
					});
				}else{
					view.$el.find('.alertDiv').remove();
				}

				break;
		}
	},

	'changeAlertSetting':function(type){
		var view = this;
		//var emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var $input;
		var phoneNumCheck = /\(?\d{3}\)?[-\s.]?\d{3}[-\s.]\d{4}/;
		switch(type){
			case 'text': 

				$input = $alertForm.find('#alertText input[name="address"]').val();
				//console.log($input);
				if($input == '' || !phoneNumCheck.test($input)){
					console.log('not a valid phone number');
					$alertForm.find('#alertText input[name="address"]').css('background-color','red');
					return
				}else{
					console.log('valid phone number!');
					$alertForm.find('#alertText input[name="address"]').css('background-color','white');
					$carrier = $alertForm.find('#carrier').val();
					console.log($carrier);
					  $.ajax({
							url:'query.php?a=setAlertType&alert=' + type + '&num=' + $input + '&carrier=' + $carrier + '&uid=' + view.$userID + '&pid=' + view.$plantID,
							success:function(data){

									$(view.$list).find('span.value').text(type.charAt(0).toUpperCase() + type.slice(1));
									view.$el.find('.alertDiv').remove();
								}

						});          
				};

				break;

			case 'email': console.log('setting alerts to email');
						   $.ajax({
								url:'query.php?a=setAlertType&alert=' + type + '&uid=' + view.$userID + '&pid=' + view.$plantID,
								success:function(data){
									$(view.$list).find('span.value').text(type.charAt(0).toUpperCase() + type.slice(1));
									view.$el.find('.alertDiv').remove();

								}

							});
						break;
		};

		// 

		
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