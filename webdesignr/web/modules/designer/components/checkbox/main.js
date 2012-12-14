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
            typeName: 'checkbox',
            typeNameCN: '复选框',
            resizeAble: false,
            properties: {
                dataMap: {
                    name: '复选框列表',
                    type: PropertyType.mapCollection,
                    defaultValue: function(){
                        return new MapCollection(null,{}).addOne("复选框","checkbox1").addOne("复选框","checkbox2");
                    }
                },
                checkboxstyle: {
                    name: '排列样式',
                    type: PropertyType.select,
                    options: {
                        '纵向':'',
                        '横向':'inline'

                    },
                    defaultValue:'inline'
                }
            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);