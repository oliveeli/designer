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
            typeName: 'div',
            typeNameCN: '层',
            resizeAble: true,
//            resizeAbleX: true,
//            resizeAbleY: true,
            properties: {
                border: {
                    name: '边框',
                    type: PropertyType.border
                },
                backgroundColor: {
                    name: '背景色',
                    type: PropertyType.color,
                    defaultValue: '#ededed'
                },
                backgroundImage: {
                    name: '背景图片',
                    type: PropertyType.backgroundImage
                }
//                ,
//                image: {
//                    name: '图片',
//                    type: PropertyType.image
//                },
//                int: {
//                    name: '整型测试',
//                    type: PropertyType.int
//                },
//                font: {
//                    name: '字体',
//                    type: PropertyType.font
//                },
//                maptest: {
//                    name: 'map测试',
//                    type: PropertyType.mapCollection
//                },
//                selectMulti: {
//                    name: 'selectedMulti测试',
//                    type: PropertyType.selectMulti,
//                    options: {
//                        'primary':'btn-primary',
//                        'info':'btn-info',
//                        'success':'btn-success',
//                        'warning':'btn-warning',
//                        'danger':'btn-danger',
//                        'inverse':'btn-inverse',
//                        'link':'btn-link'
//                    }
//                }

            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);