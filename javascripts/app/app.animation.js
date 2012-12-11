/**
 * @module App
 * @class Animation
 * @static
 */
var App = App || {};

App.Animation = (function (window, document) {

	var self = {

		// Base animation function
		// $el: Element to be animated
		// transition: string denoting animation to use ('bounceIn', etc)
		// delay: string denoting time before animation fires ('1s', '.2s', etc)
		// duration: string denoting time animation lasts ('1s', '.2s', etc)
		'animate': function (params) { //$el, transition, delay, duration, callback) {
			var self = this;

			var $el;
			if(typeof params['el'] != 'undefined'){
				$el = $(params['el']);
			}else if(typeof params['$el'] != 'undefined'){
				$el = params['$el'];
			} 

			// Have to set the delay/duration explicitly
			if(typeof params['delay'] !== undefined) {
				$el.css('animation-delay', params['delay']);
				$el.css('-webkit-animation-delay', params['delay']);
				$el.css('-moz-animation-delay', params['delay']);
				$el.css('-o-animation-delay', params['delay']);
			}
			if(typeof params['duration'] !== undefined) {
				$el.css('animation-duration', params['duration']);
				$el.css('-webkit-animation-duration', params['duration']);
				$el.css('-moz-animation-duration', params['duration']);
				$el.css('-o-animation-duration', params['duration']);
			}

			// Callback function
			var doneAnimating = function () {
				// Remove animation event handler
				$el.off('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd');
				// Remove the classes we added to the el
				$el.removeClass(params['transition']).removeClass('animated');

				// Callback (either in function or object form)
				if(typeof params['callback'] == 'object' && typeof params['callback']['function'] == 'function') {
					params['callback']['function'](params['callback']['target']);
				} else if(typeof params['callback'] == 'function') {
					params['callback']();
				}
			}

			// Bind the animation events to the element - this fires the callback function
			$el.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function (e) {
				doneAnimating();
			});

			// This fires the event ('animated' is what triggers it for real);
			$el.addClass('animated ' + params['transition']);
		},


		// ###
		// Function to animate a CSS property
		// $el: Element to be animated
		// prop: string, property to be animated
		// value: string, target value to set property to
		// duration: string, time it takes to complete animation (ex: 2s, .2s, 0.15s)
		// delay: string, time before anim fires (ex: 2s, .2s, etc);
		// callback: callback function after animation is done
		'cssAnimate': function (params){//$el, prop, value, duration, delay, callback) {
			var wally = this;
			var anim = {};
			anim['' + params['prop']] = params['value'];

			var $el;
			if(typeof params['el'] != 'undefined'){
				$el = $(params['el']);
			}else if(typeof params['$el'] != 'undefined'){
				$el = params['$el'];
			} 

			$el.animate(anim, params['duration'], params['callback']);
		},

		// Function to animate a list of objects
		// $list: list of elements ( $('li'), $('.herp'), etc)
		// transition: string denoting animation to use ('bounceIn', etc)
		// delay: float, time before anim fires (ex: 2, .2, etc);
		// duration: string, time it takes to complete animation (ex: 2s, .2s, 0.15s)
		// callback: callback function after animation is done
		'animateEach': function (params) {//$list, transition, delay, duration, callback) {
			var wally = this;
			params['list'].each(function (i, v) {
				wally.animate({
						'el': $(v), 
						'transition': params['transition'],
						'delay': (params['delay'] * (i + 1)) + 's',
						'duration': params['duration']
				});
			});

			typeof params['callback'] == 'function' ? params['callback']() : 42;
		},

		'animateEachChild': function (params) {//$container, transition, delay, duration, subcallback, callback) {
			var wally = this;
			subcall = (typeof params['subcallback'] == 'function' ? params['subcallback']() : null);
			params['container'].children().each(function (i, v) {

				wally.animate({
					'el': $(v),
					'transition': params['transition'],
					'delay': (params['delay'] * (i + 1)) + 's',
					'duration': params['duration'],
					'callback': {
						'function': params['subcall'],
						'target': v
					}
				});

			});
			setTimeout(function () {
				typeof params['callback'] == 'function' ? params['callback']() : 42;
			}, params['container'].children().length * params['delay'] * 1000);

		}
	};
	return self;

})(this, this.document);

var Walt = Walt || App.Animation;