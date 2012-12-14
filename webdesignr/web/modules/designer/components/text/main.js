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
    './../../property-type'
], function($, _, Backbone, Component, ToolbarView, EditorView, PreviewView, PropertyType ){
        return new Component({
            typeName: 'text',
            typeNameCN: '文本',
            resizeAble: true,
            properties: {
            	displayName: {
                    name: '名称',
                    defaultValue: '文本'
                },
                font:{
                	name:'字体设置',
                	type:PropertyType.font
                }
            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);