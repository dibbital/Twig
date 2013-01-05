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
			return appUser.currentUser['displayName'];
		},

		'getID': function () {
			var appUser = this;
			return appUser.currentUser['userID'];
		},

		'set': function (userID) {
			var appUser = this;

			$.ajax({
				'url': '/query.php?a=getUserStuff'
			}).done(function (data) {
				var jsonified = $.parseJSON(data);
				appUser.currentUser['userName'] = jsonified['userName'];
				appUser.currentUser['userID'] = jsonified['userID'];
				appUser.currentUser['displayName'] = jsonified['displayName'];
			});
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