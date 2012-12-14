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
            typeName: 'button',
            typeNameCN: '按钮',
            resizeAble: false,
            properties: {
                displayName: {
                    name: '名称',
                    defaultValue: '按钮'
                },
                eventList: {
                    name: '事件',
                    type: PropertyType.event
                },
                style: {
                    name: '样式',
                    type: PropertyType.select,
                    options: {
                        '':'',
                        'primary':'btn-primary',
                        'info':'btn-info',
                        'success':'btn-success',
                        'warning':'btn-warning',
                        'danger':'btn-danger',
                        'inverse':'btn-inverse',
                        'link':'btn-link'
                    }
                }
            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);