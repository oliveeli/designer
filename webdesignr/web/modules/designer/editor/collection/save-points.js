/**
 * Author: 李军
 * Date: 12-12-5
 * Time: 下午2:06
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './../model/save-point'
], function($, _, Backbone, Model) {
    return Backbone.Collection.extend({
        model: Model,

        clear: function(){
            while( this.pop() ){}
        }
    });
});