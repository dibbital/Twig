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

		$("#side_menu").css({'height':$(window).height() - $('#header_global').height() + 'px', 'overflow-y':'scroll'});

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

		App.on('menu:change', function(data){
			view.$el.find('.active').removeClass('active');
			view.$el.find('._' + data).addClass('active');
		});

	},

	'backTab': function (e) {
		e.preventDefault();
		e.stopPropagation();

		var view = this;


		view.$el.find('.active').removeClass('active');
		view.$el.find('._dash').addClass('active');
		view.closeTab();

		setTimeout(function () {
			Backbone.history.navigate('#', {
				'trigger': true
			});
		}, 550);
	},

	'logOut': function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		var view = this;
		view.closeTab();
		Backbone.history.navigate('logout', {
			'trigger': true
		});
	},

	'showDatabase': function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		var view = this;
		view.$el.find('.active').removeClass('active');
		view.$el.find('._database').addClass('active');
		view.closeTab();
		setTimeout(function () {
			Backbone.history.navigate('search', {
				'trigger': true
			});
		}, 550);
	},

	'showAbout': function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		var view = this;
		view.closeTab();
		view.$el.find('.active').removeClass('active');
		view.$el.find('._about').addClass('active');
		setTimeout(function () {
			Backbone.history.navigate('about', {
				'trigger': true
			});
		}, 550);
	},

	'showContact': function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		var view = this;
		view.closeTab();
		view.$el.find('.active').removeClass('active');
		view.$el.find('._contact').addClass('active');
		setTimeout(function () {
			Backbone.history.navigate('contact', {
				'trigger': true
			});
		}, 550);
	},

	'showHelp': function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		var view = this;
		view.closeTab();
		view.$el.find('.active').removeClass('active');
		view.$el.find('._help').addClass('active');
		setTimeout(function () {
			Backbone.history.navigate('help', {
				'trigger': true
			});
		}, 550);
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