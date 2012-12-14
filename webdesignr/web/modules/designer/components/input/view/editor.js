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
    'text!modules/designer/components/input/tpl/editor.html'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({
        render: function(){
            $(this.el).append(HtmlTemplate);
            return this;
        },

        onPropertyChange: function(key, value){
            var editor = this.$('#editor-input'),
            $el = $(this.el);
            switch (key){
                case 'tagName':
                    var wid = $el.width();
                    this.$('#input-label').text(value);
                    var lwid = this.$('#input-label').width();
                    var wid = editor.width();
                    $el.width(wid+lwid+15);
                    break;

            };
        },
        onPropertyChangeByUi: function( propertyValue, key, value ) {
            var editor = this.$( '#editor-input'),
                $el = $(this.el);
            switch (key){
                case 'width':
                    var border = $el.data( 'border' );
                    border = border ? border : 0;
                    border = Number(border);
                    $el.width( value );
                    var newValue = Number( value ) - border;
                    var labelwid = this.$('#input-label').width();
                    editor.width( newValue-labelwid-15 );
                    propertyValue[key] = newValue;
                    propertyValue.trigger( 'editorChangedInner', propertyValue, key, newValue );
                    break;

            };
        }
    });
});