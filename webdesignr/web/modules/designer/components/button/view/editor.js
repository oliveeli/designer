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
    'text!modules/designer/components/button/tpl/editor.html'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({

        render: function(){
            $(this.el).append(HtmlTemplate);
            return this;
        },

        onPropertyChange: function(key, value){
            switch (key){
                case 'displayName':
                    this.$('a').html(value);
                    break;
                case 'style':
                    this.$('a').attr('class', 'btn');
                    this.$('a').addClass(value);
                    break;
            };
        }
    });
});