/**
 * @module Backbone
 * @submodule Backbone.View
 * @class GlobalNavView
 * @constructor
 */
var GlobalNavView = Backbone.View.extend({

	'events': {},

	'initialize': function (options) {
		var view = this;
		_.bindAll(view);

		view.render();

		log('Backbone : GlobalNavView : Initialized');
	},

	'render': function () {
		var view = this;


		view.createMenu();

		log('Backbone : GlobalNavView : Render');
	},

	'createMenu': function(){
		var view = this;
		if(typeof view.$menuView == "undefined") {
			var $sideEl = $('<div id="side_menu"></div>');
			$sideEl.insertAfter($('#header_global')); //.prepend($sideEl);
			view.$menuView = new MenuView({
				'el': '#side_menu'
			});
		}


		App.on('gnav:trigger', view.handleMenu);

		log('Backbone : GlobalNavView : createMenu');
	},

	'handleMenu': function (params) {
		// e.preventDefault();
		// e.stopPropagation();

		var view = this;
		view.$menuBtn = $('#header_global .button.left');

		if(typeof view.$menuView == "undefined") {
			view.createMenu();
		}

		if(!view.sidebarIsOpen) {
			view.openSidebar();
			view.$menuBtn.addClass('active');
			App.trigger('gnav:open');
			$('#header_global .button.right').unbind().css('opacity', 0.3);
		} else {

			App.trigger('nav:right:enable');
			// $('#header_global .button.right').css('opacity', 1);
			// App.trigger('nav:right:enable');
			view.closeSidebar();
			view.$menuBtn.removeClass('active');
			App.trigger('gnav:close');
		}

	},

	'openSidebar': function () {
		var view = this,
			$content = $('#section_content'),
			$header = $('#header_global');

		$content.addClass('sideMenuOpened');
		$header.addClass('opened');

		view.sidebarIsOpen = true;
	},

	'closeSidebar': function () {
		var view = this,
			$content = $('#section_content'),
			$header = $('#header_global');

		$content.removeClass('sideMenuOpened');
		$header.removeClass('opened');
		view.sidebarIsOpen = false;
	}

});