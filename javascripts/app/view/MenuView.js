/**
 * @module Backbone
 * @submodule Backbone.View
 * @class MenuView
 * @constructor
 */
var MenuView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);

		view.pageURL = 'templates/sidemenu.php';
		view.$el.load(view.pageURL, function () {
			view.render();
		});
		log('Backbone : MenuView : Initialized');
	},

	'render': function () {
		var view = this;

		var $aboutBtn = view.$el.find('._about');
		var $backBtn = view.$el.find("._dash");
		var $dataBtn = view.$el.find("._database");
		var $contactBtn = view.$el.find("._contact");
		var $helpBtn = view.$el.find("._help");

		$aboutBtn.on('click', view.showAbout);
		$backBtn.on('click', view.backTab);
		$dataBtn.on('click', view.showDatabase);
		$contactBtn.on('click', view.showContact);
		$helpBtn.on('click', view.showHelp);

		view.$el.find('._logout').on('click', view.logOut);

	},

	'backTab': function (e) {
		var view = this;
		view.closeTab();
		setTimeout(function () {
			Backbone.history.navigate('#', {
				'trigger': true
			});
		}, 550);
	},

	'showAbout': function (e) {
		var view = this;
		view.closeTab();
		App.trigger('header:change', {
			'header': 'About',
			'subtext': 'Twig'
		});
		//console.log("hello");
	},

	'logOut': function () {
		var view = this;
		view.closeTab();
		Backbone.history.navigate('logout', {
			'trigger': true
		});
	},

	'showDatabase': function () {
		var view = this;
		view.closeTab();
		setTimeout(function () {
			Backbone.history.navigate('#search', {
				'trigger': true
			});
		}, 550);
	},

	'showContact': function () {
		var view = this;
		view.closeTab();
		App.trigger('header:change', {
			'header': 'Contact',
			'subtext': 'connect with us'
		});
	},

	'showHelp': function () {
		var view = this;
		view.closeTab();
		App.trigger('header:change', {
			'header': 'Help',
			'subtext': 'Help with Twig'
		});
	},

	'close': function () {
		var view = this;
		view.$el.empty();
	},

	'closeTab': function () {
		$('#section_content').removeClass('sideMenuOpened');
		$('#header_global').removeClass('opened');
		$('#side_menu').removeClass('sideMenuOpened');
		$('#header_global .button.left').removeClass('active');
	}
});