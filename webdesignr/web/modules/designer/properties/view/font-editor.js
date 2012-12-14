/**
 * Author: 李军
 * Date: 12-11-28
 * Time: 上午9:56
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/properties/tpl/font-editor.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({

        events: {
            'click #cancel': 'cancelFont',
            'click #confirm': 'confirmFont',
            'click #clear-color-btn': 'clearFontColor',
            'click #font-style': 'selectFontStyle',
            'click #font-weight': 'selectFontWeight',
            'change #font-size': 'selectFontSize',
            'change #font-family': 'selectFontFamily',
            'change #font-align': 'selectFontAlign'
        },

        className: 'designer-property-font-editor',

        template:_.template(ViewTemplate),

        initialize: function(){

        },

        render: function() {
            var mj = this.model.toJSON();
            $(this.el).append(this.template({ }));

            mj.family && ( this.$( '#font-family').val( mj.family ) );
            mj.size && ( this.$( '#font-size').val( mj.size ) );
            mj.align && ( this.$( '#font-align').val( mj.align ) );
            mj.color && ( this.$( '#font-color').val( mj.color ) );
            mj.bold && ( this.$( '#font-weight').attr( 'checked', true ) );
            mj.italic && ( this.$( '#font-style').attr( 'checked', true ) );

            this.model.setElementStyle( this.$( '#preview' ) );

            this.model.on( 'change', this.modelChanged, this );
            var that = this;
            this.$('#select-color-btn').colorpicker({
                format: 'hex'
            }).on('changeColor', function(ev){
                    var v = ev.color.toHex();
                    that.$('#font-color').val( v );
                    that.model.set('color', v);
                });
            return this
        },

        confirmFont: function(){
            this.model.trigger( 'confirm' );
            this.options.$target.popEditor('hide');
        },

        cancelFont: function(){
            this.options.$target.popEditor('hide');
        },

        clearFontColor: function( event ) {
            this.$('#font-color').val( '' );
            this.model.set('color', '' );
        },

        selectFontStyle: function( event ) {
            var italic = !!$ ( event.target ).attr( "checked" );
            this.model.set('italic', italic );
        },

        selectFontWeight: function( event ) {
            var bold = !!$ ( event.target ).attr( "checked" );
            this.model.set('bold', bold );
        },

        selectFontSize: function( event ) {
            this.model.set('size', $( event.target).val() );
        },

        selectFontFamily: function( event ) {
            this.model.set('family', $( event.target).val() );
        },

        selectFontAlign: function( event ) {
            this.model.set('align', $( event.target).val() );
        },

        modelChanged: function(){
            this.model.setElementStyle( this.$( '#preview' ) );
        }

    });
});