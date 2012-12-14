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
            typeName: 'tree',
            typeNameCN: '树',
            resizeAble: true,
            properties: {
                border: {
                    name: '边框',
                    type: PropertyType.border
                },
                backgroundColor: {
                    name: '背景色',
                    type: PropertyType.backgroundColor
                },
                backgroundImage: {
                    name: '背景图片',
                    type: PropertyType.backgroundImage
                }
//                nodeName: {
//                    name:'节点测试',
//                    type:PropertyType.string
//                }
            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);