/**
 * @module Backbone
 * @submodule Backbone.View
 * @class HeaderView
 * @constructor
 */
var HeaderView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {

		_.bindAll(this);

		this.render();

		this.firstRun = true;
		this.sidebarIsOpen = false;

		App.on('header:change', this.changeTitle);

		// App.on('header:hide', this.hideHeader);

		log('Backbone : HeaderView : Initialized');
	},

	'render': function () {
		var view = this;
		view.buildBar();
		view.buildMenuButton('left');
		view.buildSettingsButton('right');
		view.enableButtons();

		log('Backbone : HeaderView : Render');
	},

	'buildBar': function () {
		var view = this;
		view.$el.append($('<h2 class="title">' + App.User.get() + '\'s Dashboard' + '</h2>'));
		view.$el.append($('<h3 class="description">Your Plants</h2>'));
	},

	'enableButtons': function () {
		var view = this;

		

		App.on('nav:enable', function () {
			view.$menuBtn.unbind().css('opacity', 1).on('click', view.handleMenu);
			view.$settingsBtn.unbind().css('opacity', 1).on('click', view.handleSettings);
			view.$menuBtn.attr('class', 'button left').addClass('menuIcon');
			view.$settingsBtn.attr('class', 'button right').addClass('settingsIcon');
		});
		App.on('nav:disable', function () {
			view.$menuBtn.unbind();
			view.$settingsBtn.unbind();
			view.$menuBtn.attr('class', 'button left');
			view.$settingsBtn.attr('class', 'button right');
		});

		App.on('nav:left:enable', function () {
			view.$menuBtn.unbind().css('opacity', 1).on('click', view.handleMenu);
			view.$menuBtn.attr('class', 'button left').addClass('menuIcon');
		});
		App.on('nav:left:disable', function () {
			view.$menuBtn.unbind();
			view.$menuBtn.attr('class', 'button left');//.removeClass('menuIcon');
		});

		App.on('nav:right:enable', function () {
			view.$settingsBtn.unbind().css('opacity', 1).on('click', view.handleSettings);
			view.$settingsBtn.attr('class', 'button right').addClass('settingsIcon');
		});
		App.on('nav:right:disable', function () {
			view.$settingsBtn.unbind();
			view.$settingsBtn.attr('class', 'button left');//removeClass('settingsIcon');
		});

		App.trigger('nav:enable');
	},

	'buildMenuButton': function (position) {
		var view = this;
		view.$menuBtn = $('<a></a>', {
			'class': 'button ' + position,
			'text': '-',
			'href': '#'
		});

		view.$el.append(view.$menuBtn);
	},

	'buildSettingsButton': function (position) {
		var view = this;

		view.$settingsBtn = $('<a></a>', {
			'class': 'button ' + position,
			'text': '-',
			'href': '#'
		});

		view.$el.append(view.$settingsBtn);
	},

	'handleSettings': function (e) {
		var view = this;
		e.preventDefault();
		e.stopPropagation();

		// if(typeof view.$settingsView == "undefined"){
		Backbone.history.navigate('settings', {
			'trigger': true
		});
		// }


		if(!view.$settingsBtn.hasClass('active')) {
			view.$settingsBtn.addClass('active');
		} else {
			view.$settingsBtn.removeClass('active');
		}
	},

	'changeTitle': function (params) {
		var view = this;
		var header = params['header'];
		var subtext = params['subtext'];

		var $title = view.$el.find('.title');
		var $description = view.$el.find('.description');

		if(view.firstRun) {
			view.firstRun = false;
			$title.text(header);
			$description.text(subtext);
			return;
		}

		Walt.animate({
			'$el': $title,
			'transition': 'fadeOutUp',
			'duration': '.4s',
			'callback': function () {
				$title.text(header);
				Walt.animate({
					'$el': $title,
					'transition': 'fadeInDown',
					'duration': '.4s'
				})
			}
		});

		Walt.animate({
			'$el': $description,
			'transition': 'fadeOutDown',
			'duration': '.4s',
			'callback': function () {
				$description.text(subtext);
				Walt.animate({
					'$el': $description,
					'transition': 'fadeInUp',
					'duration': '.4s',
					'callback': params['callback']
				})
			}
		});

	},

	'handleMenu': function(e){
		var view = this;

		e.preventDefault();
		e.stopPropagation();

		App.trigger('gnav:trigger');
	},

	'hideHeader': function () {
		var view = this;

		Walt.animate({
			'$el': view.$el,
			'transition': 'fadeOutUp',
			'duration': '.4s'
		});
	}
});