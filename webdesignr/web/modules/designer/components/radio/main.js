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
    './../component',
    './view/toolbar',
    './view/editor',
    './view/preview',
    './../../properties/collection/map',
    './../../property-type'
], function($, _, Backbone, Component, ToolbarView, EditorView, PreviewView, MapCollection, PropertyType ){
        return new Component({
            typeName: 'radio',
            typeNameCN: '单选框',
            resizeAble: false,
            properties: {
            	radioItems:{
            		name:"标签项",
            		type:PropertyType.mapCollection,
            		defaultValue: function(){
            			return new MapCollection(null,{}).addOne("单选框","radio1").addOne("单选框","radio2");
            		}
            	},
                sortWay:{
                	name:"排列样式",
                	type:PropertyType.select,
                	options:{
                		"横向":"horizontal",
                		"纵向":"vertical"
                	},
                	defaultValue:"horizontal"
                }
            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);