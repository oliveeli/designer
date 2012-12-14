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
            typeName: 'table',
            typeNameCN: '表格',
            resizeAbleX: true,
            properties: {
                style: {
                    name: '表格样式',
                    type: PropertyType.selectMulti,
                    options: {
                        'table-striped':'行颜色交叉',
                        'table-bordered':'表格边框',
                        'table-condensed':'紧凑单元格',
                        'table-hover':'鼠标滑过效果'
                    }
                },
            	rows:{
            		name:'行数',
            		type:PropertyType.int,
                    minValue: 1,
            		defaultValue:4
            	},
            	cols:{
            		name:'列数',
            		type:PropertyType.int,
                    minValue: 1,
            		defaultValue:3
            	}
            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);