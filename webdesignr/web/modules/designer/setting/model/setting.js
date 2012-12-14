/**
 * Author: 李军
 * Date: 12-12-4
 * Time: 下午2:42
 *
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone, ViewTemplate ) {
    return Backbone.Model.extend({

        defaults: {
            dropSnap: true,
            showScale: true
        },

        isDropSnap: function(){
            return this.get('dropSnap') !== false;
        },

        isShowScale: function(){
            return this.get('showScale') !== false;
        }
    });
});