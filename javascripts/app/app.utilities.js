/**
 * @module App
 * @class Utilities
 * @static
 */

var App = App || {};

App.Utilities = (function(window, document) {

	var self = {

		'supportsCanvas': function() {
			var canvas = document.createElement('canvas');
			if (canvas.getContext) {
				return true;
			} else {
				return false;
			}
		},

		'supportsCss3': function(property) {
			var elem = document.body || document.documentElement,
				cssStyle = elem.style;

			// No css support detected
			if (typeof cssStyle === 'undefined') {
				return false;
			}

			// Tests for standard property
			if (typeof cssStyle[property] === 'string') {
				return true;
			}

			// Tests for vendor specific property
			var vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'Ms'],
				len = vendors.length,
				property = property.charAt(0).toUpperCase() + property.substr(1);
			while (len--) {
				if (typeof cssStyle[vendors[len] + property] === 'string') {
					return true;
				}
			}

			return false;
		}
	};
	return self;

})(this, this.document);


window.log = function() {
	if (window.isDebugMode) {
		log.history = log.history || []; // store logs to an array for reference
		log.history.push(arguments);
		if (this.console) {
			console.log(Array.prototype.slice.call(arguments));
		}
		if (typeof App !== 'undefined' && typeof App.trigger === 'function') {
			App.trigger('log', arguments);
		}
	} else {
		log.history = log.history || []; // store logs to an array for reference
		log.history.push(arguments);
	}
};

$(document).ready(function() {
	if (!window.isDebugMode) {
		$(document).keyup(function(e) {
			if (e.keyCode === 192 || e.keyCode === 19) {
				if (window.console) {
					log.history = log.history || []; // store logs to an array for reference
					for (var i = 0, len = log.history.length; i < len; i++) {
						console.log(Array.prototype.slice.call(log.history[i]));
					}
				}
			}
			log.history = [];
		});
	}
});