/**
 * @module Backbone
 * @submodule Backbone.View
 * @class HeaderView
 * @constructor
 */

var HeaderView = Backbone.View.extend({

	'events': {},

	'initialize': function(options) {

		_.bindAll(this);

		this.render();

		this.firstRun = true;

		App.on('header:change', this.changeTitle);

		// App.on('header:hide', this.hideHeader);

		log('Backbone : HeaderView : Initialized');
	},

	'render': function() {
		var view = this;
		view.buildBar();
		view.buildOptionsButton('left');
		view.buildSettingsButton('right');

		log('Backbone : HeaderView : Render');
	},

	'buildBar': function(){
		var view = this;
		view.$el.append($('<h2 class="title"></h2>'));
		view.$el.append($('<h3 class="description"></h2>'));
	},

	'buildOptionsButton': function(position) {
		var view = this;
		view.$optionsBtn = $('<a></a>',{
			'class': 'button ' + position,
			'text': '-',
			'href': '#'
		});

		view.$optionsBtn.on('click', view.handleNav);

		view.$el.append(view.$optionsBtn);
	},

	'buildSettingsButton': function(position) {
		var view = this;

		view.$el.append($('<a></a>',{
			'class': 'button ' + position,
			'text': '+',
			'href': '#'
		}));
	},

	'handleNav': function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		var view = this;

		if(!$('#header_global').hasClass('opened')){
			$('#section_content').addClass('sideMenuOpened');
			$('#header_global').addClass('opened');
			view.$optionsBtn.addClass('active');
		}else{
			$('#section_content').removeClass('sideMenuOpened');
			$('#header_global').removeClass('opened');
			view.$optionsBtn.removeClass('active');
		}
	},

	'changeTitle': function(params){
		var view = this;
		var header = params['header'];
		var subtext = params['subtext'];

		var $title = view.$el.find('.title');
		var $description = view.$el.find('.description');

		if(view.firstRun){
			view.firstRun = false;
			$title.text(header);
			$description.text(subtext);
			return;
		}

		Walt.animate({
			'$el': $title,
			'transition': 'fadeOutUp',
			'duration': '.4s',
			'callback': function(){
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
			'callback': function(){
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

	'hideHeader': function(){
		var view = this;

		Walt.animate({
					'$el': view.$el,
					'transition': 'fadeOutUp',
					'duration': '.4s'
				});
	}
});