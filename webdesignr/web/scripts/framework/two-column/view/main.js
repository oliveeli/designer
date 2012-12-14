/**
 * Author: 李军
 * Date: 12-10-10
 * Time: 上午8:54
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!scripts/framework/two-column/tpl/main.html'
], function($, _, Backbone, MainView){

    return Backbone.View.extend({

        className: 'two-column',

        template:_.template(MainView),

        initialize: function(){
            _.extend(this, Backbone.Events);
        },

        render: function(){
            $(this.el).html(this.template());
            return this;
        },

        setLeftView: function(view){
            this.$('.split-left').html($(view.el));
        },

        setRightView: function(view){
            this.$('.split-right').html($(view.el));
        },

        getLeftEl: function(){
            return this.$('.split-left');
        },

        getRightEl: function(){
            return this.$('.split-right');
        }

    });
});