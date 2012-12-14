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
    'text!modules/designer/properties/tpl/event.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({
        template:_.template(ViewTemplate),
        render: function(){
            $(this.el).append(this.template({property: this.options.property, value: this.options.value}));
            if(this.options.property.readonly){
                this.$('input').attr('disabled', 'disabled');
                this.$('a').addClass('disabled');
            }
            return this;
        }
    });
});