/**
 * Author: 李军
 * Date: 12-11-9
 * Time: 下午3:51
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/layout/tpl/layout.html'
], function($, _, Backbone, ViewTemplate){
        return Backbone.View.extend({

            events:{
                'click #toolBarElementTabLink':'showToolBarElementTab',
                'click #propertiesTabLink':'showPropertiesView',
                'click #outlineTabLink':'showOutlineTab'
            },

            showToolBarElementTab: function(e){
                $(e.target).tab('show');
            },

            showOutlineTab: function(e){
                $(e.target).tab('show');
            },

            showPropertiesView: function(){
                this.$('#propertiesTabLink').tab('show');
            },

            render: function(){
                $(this.el).append(ViewTemplate);
                return this;
            },

            getEditorContainer: function(){
                return this.$('.wd-container-editor');
            },

            getToolbarContainer: function(){
                return this.$('.wd-container-toolbar');
            },

            getDraggableComponentContainer: function(){
                return this.$('.wd-container-draggable-comp');
            },

            getOutLineContainer: function(){
                return this.$('.wd-container-outline');
            },

            getPropertiesContainer: function(){
                return this.$('.wd-container-properties');
            },

            onChangeEditorSize: function(){
                var $e = this.getEditorContainer(),
                    $parent = $e.parent();
                    w = $e.width(),
                    h = $e.height();
                $e.css('left', '50%').css('margin-left', ( -w / 2 ) + 'px' );
                $parent.css('min-width', ( w + 50 ) + 'px');
            }

        });
    }
);