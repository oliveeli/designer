/**
 * Author: 李军
 * Date: 12-11-13
 * Time: 下午6:02
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/components/tree/tpl/editor.html',
    'ztree.core'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({
        render: function(){
            $(this.el).append(HtmlTemplate);
            var setting = {
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            };
            var zNodes =[
                { id:1, pId:9, name:"展开、折叠 自定义图标不同", open:true, iconOpen:"./scripts/lib/zTree/css/zTreeStyle/img/diy/1_open.png", iconClose:"./scripts/lib/zTree/css/zTreeStyle/img/diy/1_close.png"},
                { id:11, pId:1, name:"叶子节点1", icon:"./scripts/lib/zTree/css/zTreeStyle/img/diy/2.png"},
                { id:12, pId:1, name:"叶子节点2", icon:"./scripts/lib/zTree/css/zTreeStyle/img/diy/3.png"},
                { id:13, pId:1, name:"叶子节点3", icon:"./scripts/lib/zTree/css/zTreeStyle/img/diy/5.png"},
                { id:2, pId:9, name:"展开、折叠 自定义图标相同", open:true, icon:"./scripts/lib/zTree/css/zTreeStyle/img/diy/4.png"},
                { id:21, pId:2, name:"叶子节点1", icon:"./scripts/lib/zTree/css/zTreeStyle/img/diy/6.png"},
                { id:22, pId:2, name:"叶子节点2", icon:"./scripts/lib/zTree/css/zTreeStyle/img/diy/7.png"},
                { id:23, pId:2, name:"叶子节点3", icon:"./scripts/lib/zTree/css/zTreeStyle/img/diy/8.png"},
                { id:3, pId:9, name:"不使用自定义图标", open:true },
                { id:31, pId:3, name:"叶子节点1"},
                { id:32, pId:3, name:"叶子节点2"},
                { id:33, pId:3, name:"叶子节点3"}

            ];
            var time = new Date();
            this.treeId = 'ztree'+time.getTime().toString();
            this.$('#editor-tree >ul').attr('id',this.treeId);
            this.tree = $.fn.zTree.init(this.$("#"+this.treeId), setting, zNodes);
            return this;
        },

        onPropertyChange: function(key, value){
            var $editor = this.$( '#editor-tree'),
                $el = $(this.el);
            switch (key){
//                case 'nodeName':
//                    alert((this.tree.getNodeByParam("id",value,null)).name);
//                    this.$("#"+this.treeId).empty();
//                    var setting = {
//                        data: {
//                            simpleData: {
//                                enable: true
//                            }
//                        }
//                    };
//                    var nodes = [
//                        { id:1, pId:0,name:"文件夹1"},
//                        { id:11,pId:1,name:"子文件1"}
//                    ]
//                    $.fn.zTree.init(this.$("#"+this.treeId),setting,nodes);
//                    break;

                case 'width':
                    var border = $el.data( 'border' );
                    border = border ? border : 0;
                    border = Number(border);
                    $el.width( Number( value ) + border );
                    $editor.width( value );
                    break;
                case 'height':
                    var border = $el.data( 'border' );
                    border = border ? border : 0;
                    border = Number(border);
                    $el.height( Number( value ) + border);
                    $editor.height( value );
                    break;
                case 'border':
                    var bd = Number( value.get( 'size' ) );
                    bd = bd * 2;
                    value.setElementStyle( $editor );
                    $el.data( 'border', bd );
                    $el.width( Number( $editor.width() ) + bd );
                    $el.height( Number( $editor.height() ) + bd );
                    break;
                case 'backgroundColor':
                    $editor.css('background-color', value);
                    break;
                case 'backgroundImage':
                    value.setElementStyle( $editor );
                    break;
            };
        }
    });
});