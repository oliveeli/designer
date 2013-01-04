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
    'text!modules/designer/components/image/tpl/editor.html'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({
        render: function(){
            $(this.el).append(HtmlTemplate);
            return this;
        },

        onPropertyChange: function(key, value){
            var $editor = this.$( '#editor-img'),
                $el = $(this.el);
            switch (key){
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
                case 'Image':
                    this.$('#editor-img').attr('src',value);
                    break;
            };
        },
        onPropertyChangeByUi: function( propertyValue, key, value ) {
            var $editor = this.$( '#editor-img'),
                $el = $(this.el);
            switch (key){
                case 'width':
                    var border = $el.data( 'border' );
                    border = border ? border : 0;
                    border = Number(border);
                    $el.width( value );
                    var newValue = Number( value ) - border;
                    $editor.width( newValue);
                    propertyValue[key] = newValue;
                    propertyValue.trigger( 'editorChangedInner', propertyValue, key, newValue );
                    break;
                case 'height':
                    var border = $el.data( 'border' );
                    border = border ? border : 0;
                    border = Number(border);
                    $el.height( value );
                    var newValue = Number( value ) - border;
                    $editor.height( newValue );
                    propertyValue[key] = newValue;
                    propertyValue.trigger( 'editorChangedInner', propertyValue, key, newValue );
                    break;

            };
        }
    });
});