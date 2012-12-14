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
            className: 'designer-layout-tree-column',

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

            initialize: function(){

            },

            render: function(){
                $(this.el).append(ViewTemplate);
                return this;
            },

            getFormExplorerContainer: function(){
                return this.$('.container-form-explorer');
            },

            getEditorContainer: function(){
                return this.$('.container-editor');
            },

            getToolbarEditorContainer: function(){
                return this.$('.container-toolbar-editor');
            },

            getToolbarElementsContainer: function(){
                return this.$('.container-toolbar-elements');
            },

            getOutLineContainer: function(){
                return this.$('.container-outline');
            },

            getPropertiesContainer: function(){
                return this.$('.container-properties');
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