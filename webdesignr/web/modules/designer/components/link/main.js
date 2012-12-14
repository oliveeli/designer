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
            typeName: 'link',
            typeNameCN: '链接',
            resizeAble: false,
            properties: {
            	displayName: {
                    name: '名称',
                    defaultValue: '链接'
                },
            	eventList: {
                    name: '事件',
                    type: PropertyType.event
                }
            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);