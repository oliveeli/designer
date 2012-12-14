/**
 * Author: 李军
 * Date: 12-11-23
 * Time: 上午9:06
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/outline/tpl/item.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({

        className: 'wd-outline-item',

        events: {
            'click': 'onClick'
        },

        template: _.template(ViewTemplate),

        render: function(){
            this.model.on( 'remove', this.remove, this );
            this.model.on( 'select', this.onSelectComponentModel, this );
            this.model.on( 'unSelect', this.onUnSelectComponentModel, this );
            this.model.outlineView = this;
            $(this.el).append(this.template(this.model.toJSON()));
            return this;
        },

        onSelectComponentModel: function( ){
            $(this.el).addClass('wd-outline-item-select');
        },

        onUnSelectComponentModel: function( ) {
            $(this.el).removeClass('wd-outline-item-select');
        },

        onClick: function( event ){
            var isAppendModel = event.altKey;
            if( isAppendModel ) {
                if( this.model.isSelected() ){
                    this.model.trigger( 'unSelect', this.model, true );
                } else {
                    this.model.trigger( 'select', this.model, true );
                }
            } else {
                this.model.trigger( 'select', this.model )
            }
        }

    });
});