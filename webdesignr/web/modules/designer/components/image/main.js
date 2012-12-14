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
            typeName: 'image',
            typeNameCN: '图片',
            resizeAble: true,
            properties: {
                border: {
                    name: '边框',
                    type: PropertyType.border
                },
                Image: {
                    name: '图片',
                    type: PropertyType.image
                }
            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);