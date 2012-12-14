/**
 * Author: 李军
 * Date: 12-12-3
 * Time: 上午9:44
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './../model/component'
], function($, _, Backbone, Model) {
    return Backbone.Collection.extend({
        model: Model,

        clear: function(){
            while( this.pop() ){}
        },

        comparator: function(){
            return Number(this.get('zIndex'));
        }
    });
});