/**
 * Author: 李军
 * Date: 12-11-23
 * Time: 下午3:49
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/properties/tpl/color.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({

        events: {
            'click a#clear': 'clearColor',
            'input input':'inputColor'
        },
        template:_.template(ViewTemplate),
        render: function(){
            $(this.el).append(this.template({property: this.options.property, value: this.options.value}));
            if(this.options.property.readonly){
                this.$('input').attr('disabled', 'disabled');
                this.$('a').addClass('disabled');
            } else {
                var that = this;
                this.$('#p-color-selector').colorpicker({
                    format: 'hex'
                }).on('changeColor', function(ev){
                        var newColor = ev.color.toHex();
                        that.$('input').val( newColor );
                        that.trigger( 'inputChanged', newColor );
                });
            }
            return this;
        },

        clearColor: function(){
            this.$('input').get(0).value = '';
            this.trigger('inputChanged', '');
        },

        inputColor: function(event){
            var newColor = $(event.target).val();
            if(newColor.length==7){
                this.trigger('inputChanged', newColor);
            }

        }
    });
});