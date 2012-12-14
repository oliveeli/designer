/**
 * Author: 李军
 * Date: 12-11-20
 * Time: 下午5:14
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/properties/tpl/string.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({
        events: {
            'input #p-string':'changed'
        },
        template:_.template(ViewTemplate),
        render: function(){
            $(this.el).append(this.template({property: this.options.property, value: this.options.value}));
            if(this.options.property.readonly){
                this.$('input').attr('disabled', 'disabled');
            }
            return this;
        },

        changed: function(event){
            this.trigger('inputChanged', $(event.target).val());
        }
    });
});