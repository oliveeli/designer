/**
 * Author: 李军
 * Date: 12-11-26
 * Time: 下午5:26
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/properties/tpl/border-editor.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({

        events: {
            'click #cancel': 'cancelBorder',
            'click #confirm': 'confirmBorder',
            'click #remove': 'removeBorder'
        },

        className: 'designer-property-border-editor',

        template:_.template(ViewTemplate),

        initialize: function(){

        },

        render: function() {
            $(this.el).append(this.template({
                model: this.model.toJSON()
            }))
            this.$('#color').colorpicker({
                format: 'hex'
            }).on('changeColor', function(ev){
                    $(this).val(ev.color.toHex())

                });
            return this
        },

        changedColor: function(event){
            this.model.set('color', $(event.target).val());
        },

        confirmBorder: function(){
            this.model.set('color', this.$('#color').val());
            this.model.set('size', this.$('#size').val());
            this.model.trigger( 'confirm' );
            this.options.$target.popEditor('hide');
        },

        cancelBorder: function(){
            this.options.$target.popEditor('hide');
        },

        removeBorder: function(){
            this.model.clear();
            this.options.$target.popEditor('hide');
        }

    });
});