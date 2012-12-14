/**
 * Author: 李军
 * Date: 12-12-4
 * Time: 下午3:15
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/help/tpl/help.html'
], function($, _, Backbone, ViewTemplate ) {
    return Backbone.View.extend({
        render: function(){
            $(this.el).append( ViewTemplate );
            return this;
        }
    });
});