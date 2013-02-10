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


window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};

String.prototype.replaceAll = function(str1, str2, ignore)
{
   return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}