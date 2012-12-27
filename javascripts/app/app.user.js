/**
 * @module App
 * @class User
 * @static
 */
var App = App || {};

App.User = (function (window, document) {

	var self = {

		'init':function(){
			var appUser = this;
			appUser.currentUser = {};
			if(window.alreadyLogged){
				appUser.currentuser = {};
				appUser.currentUser['username'] = window.alreadyLogged;
			}
		},

		'get': function(){
			var appUser = this;
			return appUser.currentUser['username'];	
		},

		'set': function(user){
			var appUser = this;

			appUser.currentUser['username'] = user;

			// This should retrieve information about the user
		},

		'logout': function(){
			var appUser = this;

			appUser.currentUser = {};
			window.alreadyLogged = false;
		},

		'isLoggedIn':function(){
			var appUser = this;

			if($.isEmptyObject(appUser.currentUser)){
				return false;
			}else{
				return true;
			}
		}

	};
	return self;

})(this, this.document);