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
    'text!modules/designer/components/checkbox/tpl/editor.html'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({
        render: function(){
            $(this.el).append(HtmlTemplate);
            return this;
        },

        onPropertyChange: function(key, value, pv){
            var editor = this.$('#checkbox-group'),
                $el = $(this.el);
            switch (key){
                case 'dataMap':
                    var data = eval(value.toJSON());
                    var m = pv['checkboxstyle'];
                    if(''!=data ){
                        this.$('#checkbox-group').empty();
                        for(var i in data) {
                            this.$('#checkbox-group').append('<label class="checkbox '+m+'"><input type="checkbox" value="'+data[i].value +'">'+data[i].key+'</label> ');
                        }
                    }
                    break;
                case 'checkboxstyle':
                    if(''==value){
                        this.$('#checkbox-group').find('label').each(function(){
                            $(this).removeClass('inline');
                        })
                    }else{
                        this.$('#checkbox-group').find('label').each(function(){
                            $(this).addClass('inline');
                        });
                    }
                    break;
                case 'backgroundImage':
                    value.setElementStyle(editor);
                    break;
                case 'backgroundColor':
                    editor.css('background-color',value);
                    break;
                case 'border':
                    var bd = Number( value.get( 'size' ) );
                    bd = bd * 2;
                    value.setElementStyle(editor);
                    $el.data( 'border', bd );
                    $el.width( Number( editor.width() ) + bd );
                    $el.height( Number( editor.height() ) + bd );
                    break;

            };
        }
    });
});