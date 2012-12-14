/**
 * Author: 李军
 * Date: 12-11-8
 * Time: 下午3:10
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/toolbar/tpl/toolbar.html'
], function($, _, Backbone, ViewTemplate){
        return Backbone.View.extend({

            className: 'wd-layout-toolbar-inner',

            events: {
                'click #save': 'onSave',
                'click #redo': 'onRedo',
                'click #undo': 'onUndo',
                'click #copy': 'onCopy',
                'click #past': 'onPast',
                'click #delete': 'onDelete',
                'click #setting': 'onSetting',
                'click #help': 'onHelp'
            },

            render: function(){
                $(this.el).append( ViewTemplate );
                return this;
            },

            onSave: function(){
                this.trigger('save');
            },

            onRedo: function(){
                this.trigger('redo');
            },
            onUndo: function(){
                this.trigger('undo');
            },
            onCopy: function(){
                this.trigger('copy');
            },
            onPast: function(){
                this.trigger('past');
            },
            onDelete: function(){
                this.trigger('delete');
            },

            onSetting: function( event ){
                this.trigger('setting', event );
            },
            onHelp: function( event ){
                this.trigger( 'help' , event );
            }
        });
    }
);