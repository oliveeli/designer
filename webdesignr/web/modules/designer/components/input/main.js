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
    './view/preview'
], function($, _, Backbone, Component, ToolbarView, EditorView, PreviewView){
        return new Component({
            typeName: 'input',
            typeNameCN: '输入框',
            resizeAbleX:true,
            resizeAbleY:false,
            properties: {
                tagName:{
                    name:'标签文本',
                    defaultValue: '标签:'
                }
            },
            toolbarView:ToolbarView,
            editorView:EditorView,
            previewView:PreviewView
        });
    }
);