/**
 * @module Backbone
 * @submodule Backbone.Collection
 * @class ItemCollection
 * @constructor
 */

var ItemCollection = Backbone.Collection.extend({

	'model': ItemModel,

	'initialize': function() {

		log('Backbone : ItemCollection : Initialized');

	}

});