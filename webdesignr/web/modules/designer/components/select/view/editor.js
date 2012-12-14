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
    'text!modules/designer/components/select/tpl/editor.html'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({
        render: function(){
            $(this.el).append(HtmlTemplate);
            return this;
        },

        onPropertyChange: function(key, value){
            var editor = this.$('#editor-select'),
                $el = $(this.el);
            switch (key){
                case 'style':
                    editor.parent().css('height','auto');
                    if(value!=''){
                        this.$('#editor-select').attr('multiple', value);
                    }else{
                        this.$('#editor-select').removeAttr('multiple');
                    }
                    break;
                case 'dataMap':
                    var data = eval(value.toJSON());
                    if(''!=data){
                        this.$('#editor-select').empty();
                        for(var i in data) {
                            this.$('#editor-select').append('<option value="'+data[i].value+'">'+data[i].key+'</option>');
                        }
                    }
                    break;
                case 'tagName':
                    this.$('#select-label').text(value);
                    var lwid = this.$('#select-label').width();
                    var wid = editor.width();
                    $el.width(lwid+wid+15);
                    break;
            };
        },
        onPropertyChangeByUi: function( propertyValue, key, value ) {
            var editor = this.$( '#editor-select'),
                $el = $(this.el);
            switch (key){
                case 'width':
                    var border = $el.data( 'border' );
                    border = border ? border : 0;
                    border = Number(border);
                    $el.width( value );
                    var newValue = Number( value ) - border;
                    var labelwid = this.$('#select-label').width();
                    editor.width( newValue-labelwid-15 );
                    propertyValue[key] = newValue;
                    propertyValue.trigger( 'editorChangedInner', propertyValue, key, newValue );
                    break;

            };
        }
    });
});