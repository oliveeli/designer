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
    'text!modules/designer/components/text/tpl/editor.html'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({
        render: function(){
            $(this.el).append(HtmlTemplate);
            return this;
        },

        onPropertyChange: function(key, value){
            switch (key){
                case 'displayName':
                	this.$('.text-div').html(value);
                    break;
                case 'font':
                	value.setElementStyle( this.$('.text-div') );
                	this.$('.text-div').css('line-height', '100%');
                    break;      
                case 'width':
                	this.$('.text-div').width(value);
                    break;
                case 'height':
                	this.$('.text-div').height(value);
                    break;      
            };
        },
        
        onPropertyChangeByUi: function( propertyValue, key, value ) {
            switch (key){
                case 'width':
                	propertyValue[key] = value;
                	propertyValue.trigger( 'editorChangedInner', propertyValue, key, value );
                	this.$('.text-div').width(value);
                    break;
                case 'height':
                	propertyValue[key] = value;
                	propertyValue.trigger( 'editorChangedInner', propertyValue, key, value );
                	this.$('.text-div').height(value);
                    break;
            };
        }
    });
});