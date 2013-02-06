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

		'supportPlaceholders': function(){
			log('Backbone : App.Utilities : Placeholders');
			var i = document.createElement('input');
			if ('placeholder' in i) {
				return true;
			} else {
				$('input').each(function(i,v){
					var $this = $(v);
					log($this);

					$this.val($this.attr('placeholder'));
					$this.on('focus', function(e){
						if($this.val() == $this.attr('placeholder')){
							$this.val('');	
						}
					});

					$this.on('blur', function(e){
						if($this.val() == ''){
							$this.val($this.attr('placeholder'));
						}
					});
				});
				// return false;
			}
		},
		'trim': function(s) { 
		    s = s.replace(/(^\s*)|(\s*$)/gi,"");
		    s = s.replace(/[ ]{2,}/gi," "); 
		    s = s.replace(/\n /,"\n"); return s;
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

String.prototype.replaceAll = function(str1, str2, ignore)
{
   return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
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