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
            typeName: 'textarea',
            typeNameCN: '多行输入框',
            resizeAble: true,
            properties: {
            	displayName: {
                    name: '标签',
                    defaultValue: '标签:'
                },
                lablePosition:{
                	name:'标签位置',
                	type: PropertyType.select,
                    options: {
                        '在左':'left',
                        '在上':'top'
                    },
                    defaultValue:'left'
                },
//                rows:{
//                	name:'行数',
//            		type:PropertyType.int,
//            		defaultValue:4
//                },
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