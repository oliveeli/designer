/**
 * Author: 李军
 * Date: 12-11-21
 * Time: 上午10:02
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/properties/tpl/length.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({

        events: {
            'input #p-length':'changed'
        },

        template:_.template(ViewTemplate),

        initialize: function(){
        },

        render: function(){
            $(this.el).append(this.template({property: this.options.property, value: this.options.value}));
            if(this.options.property.readonly){
                this.$('input').attr('disabled', 'disabled');
            }
            return this;
        },

        changed: function(event){
            this.trigger('inputChanged', $(event.target).val());
        },

        setPropertyValue: function(v){
            this.$('input').val(v);
        }
    });
});