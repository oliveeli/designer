/**
 * Author: 李军
 * Date: 12-11-29
 * Time: 上午11:25
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './../model/map-item'
], function($, _, Backbone, Item){

    return Backbone.Collection.extend({

        model: Item,

        initialize: function( models, options ){
        },

        addOne: function( key, value ){
            this.add(
                new Item({
                    key: key,
                    value: value
                })
            );
            return this;
        },

        removeAll: function(){
            while( this.pop() ){}
        },

        toSaveString: function(){
            if( this.length > 0 ) {
                return JSON.stringify( this.toJSON() );
            } else {
                return '';
            }
        }

    });
});