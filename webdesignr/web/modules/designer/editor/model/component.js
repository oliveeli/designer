/**
 * Author: 李军
 * Date: 12-12-3
 * Time: 上午9:44
 *
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    return Backbone.Model.extend({

        initialize: function(){
            this.on( 'select', this.onSelect, this );
            this.on( 'unSelect', this.onUnSelect, this );
        },

        isSelected: function(){
            var s = this.get('isSelected');
            return s ? true : false;
        },

        onSelect: function(){
            this.set('isSelected', true );
        },

        onUnSelect: function(){
            this.set('isSelected', false );
        }

    });
});