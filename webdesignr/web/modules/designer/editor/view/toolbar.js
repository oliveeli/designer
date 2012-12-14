/**
 * Author: 李军
 * Date: 12-11-22
 * Time: 上午11:09
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/editor/tpl/element-toolbar.html'
], function($, _, Backbone, ViewTemplate){

    return Backbone.View.extend({

        className: 'wd-editor-comp-toolbar',

        template:_.template( ViewTemplate ),

        events: {
            'click #showPropertyLink':'showProperty',
            'click #moveUpLink':'moveUp',
            'click #moveDownLink':'moveDown',
            'click #deleteLink':'delete'
        },
        render: function(){
            $(this.el).append( this.template( {
                isMultiComponent: this.options.isMultiComponent
            } ) );
            return this;
        },
        showProperty: function(event){
            event.stopPropagation();
            event.preventDefault();
            this.trigger('show:property');
        },

        moveUp: function(event){
            event.stopPropagation();
            event.preventDefault();
            this.trigger('move:up');
        },

        moveDown: function(event){
            event.stopPropagation();
            event.preventDefault();
            this.trigger('move:down');
        },

        delete: function(event){
            event.stopPropagation();
            event.preventDefault();
            this.trigger('delete');
        }

    });
});