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
            typeName: 'select',
            typeNameCN: '下拉选择框',
            resizeAbleX:true,
            resizeAbleY:false,
            properties: {
                tagName:{
                    name:'标签文本',
                    defaultValue: '标签:'
                },
                dataMap: {
                    name: '数据项列表',
                    type: PropertyType.mapCollection,
                    defaultValue: function(){
                        return new MapCollection(null,{}).addOne("选项1","option1");
                    }
                },
                style: {
                    name: '样式',
                    type: PropertyType.select,
                    options: {
                        '列表':'multiple',
                        '下拉菜单':''
                    }
                }


            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);