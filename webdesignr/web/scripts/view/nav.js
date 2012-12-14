/**
 * Author: 李军
 * Date: 12-9-26
 * Time: 下午5:19
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!scripts/tpl/nav.html'
], function($, _, Backbone, NavigationTpl){
    return Backbone.View.extend({

        className: 'navbar navbar-static-top',

        initialize: function(){

        },
        render: function(){
            $(this.el).append(NavigationTpl);
            return this;
        }
    });
});