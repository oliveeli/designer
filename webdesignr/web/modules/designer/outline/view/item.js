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

        selectClassName: 'wd-outline-item-select',

        events: {
            'click': 'onClick'
        },

        render: function(){
            this.model.outlineView = this;
            this.model.on( 'remove', this.remove, this );
            this.model.on( 'select', this.onSelectComponentModel, this );
            this.model.on( 'unSelect', this.onUnSelectComponentModel, this );
            $(this.el).append( _.template( ViewTemplate )( this.model.toJSON() ) );
            return this;
        },

        onSelectComponentModel: function( ){
            $(this.el).addClass( this.selectClassName );
        },

        onUnSelectComponentModel: function( ) {
            $(this.el).removeClass( this.selectClassName );
        },

        onClick: function( event ){
            if( event.altKey ) {
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