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
    'text!modules/designer/properties/tpl/select.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({
        events: {
            'change #p-select':'changed'
        },
        template:_.template(ViewTemplate),
        render: function(){
            $(this.el).append(this.template({property: this.options.property}));
            if(this.options.property.readonly){
                this.$('select').attr('disabled', 'disabled');
            }
            this.$('select').val(this.options.value);
            return this;
        },

        changed: function(event){
            this.trigger('inputChanged', $(event.target).val());
        }
    });
});