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
    'text!modules/designer/properties/tpl/int.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({
        events: {
            'input #p-int':'changed',
//            'click #up-btn': 'upInt',
//            'click #down-btn': 'downInt',
            'mousedown #up-btn': 'upInt2',
            'mouseup #up-btn': 'stopUpInt2',
            'mousedown #down-btn': 'downInt2',
            'mouseup #down-btn': 'stopDownInt2'

        },
        template:_.template(ViewTemplate),
        render: function(){
            $(this.el).append(this.template({property: this.options.property, value: this.options.value}));
            if(this.options.property.readonly){
                this.$('input').attr('disabled', 'disabled');
                this.$('a').addClass('disabled');
            }
            this.minValue = this.options.property.minValue;
            this.minValue = this.minValue ? this.minValue : 0;
            return this;
        },

        changed: function( event ){
            this.trigger('inputChanged', $(event.target).val());
        },

        upInt: function(){
            var oldValue = this.$('input').val();
            if ( !oldValue ){
                oldValue = -1;
            }
            var newValue = Number(oldValue) + 1;
            this.$('input').val(newValue);
            this.trigger('inputChanged', newValue);
        },

        downInt: function(){
            var oldValue = this.$('input').val();
            if ( !oldValue ){
                oldValue = 1;
            }
            var newValue = Number(oldValue) - 1;
            newValue < this.minValue && ( newValue = this.minValue );
            this.$('input').val(newValue);
            this.trigger('inputChanged', newValue);
        },

        upInt1: function(){
            clearInterval(this.interval);
            this.interval = setInterval( (function(self){
                return function(){
                    self.upInt()
                }
            })(this) , 100);
        },

        downInt1: function(){
            clearInterval(this.interval);
            this.interval = setInterval( (function(self){
                return function(){
                    self.downInt()
                }
            })(this) , 100);
        },

        upInt2: function(){
            this.upInt();
            this.interval = setInterval( (function(self){
                return function(){
                    self.upInt1()
                }
            })(this) , 500);
        },

        downInt2: function(){
            this.downInt();
            this.interval = setInterval( (function(self){
                return function(){
                    self.downInt1()
                }
            })(this) , 500);
        },

        stopUpInt2: function(){
            clearInterval(this.interval);
        },

        stopDownInt2: function(){
            clearInterval(this.interval);
        }

    });
});