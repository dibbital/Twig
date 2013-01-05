/**
 * @module App
 * @class User
 * @static
 */
var App = App || {};

App.User = (function (window, document) {

	var self = {

		'init': function () {
			var appUser = this;
			appUser.currentUser = {};
			if(window.alreadyLogged) {
				appUser.currentUser = {};
				appUser.currentUser['displayName'] = window.alreadyLogged['displayName'];
				appUser.currentUser['userName'] = window.alreadyLogged['userName'];
				appUser.currentUser['userID'] = window.alreadyLogged['userID'];
			}
		},

		'get': function () {
			var appUser = this;
			return appUser.currentUser['userName'];
		},

		'getID': function () {
			var appUser = this;
			return appUser.currentUser['userID'];
		},

		'set': function (userID) {
			var appUser = this;

			appUser.currentUser['userID'] = userID;

			// This should retrieve information about the user
		},

		'logout': function () {
			var appUser = this;

			appUser.currentUser = {};
			window.alreadyLogged = false;
		},

		'isLoggedIn': function () {
			var appUser = this;

			if($.isEmptyObject(appUser.currentUser)) {
				return false;
			} else {
				return true;
			}
		}

	};
	return self;

})(this, this.document);