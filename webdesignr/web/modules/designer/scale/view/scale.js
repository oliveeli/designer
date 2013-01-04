/**
 * Author: 李军
 * Date: 12-12-4
 * Time: 上午10:31
 *
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    return Backbone.View.extend({

        tagName: 'canvas',

        className: 'wd-scale',

        padding: 40,

        backgroundColor: '#dddddd',

        lineColor: '#000000',

        render: function(){

            var p = this.padding,
                w = this.options.$target.width(),
                h = this.options.$target.height(),
                context = $(this.el).get(0).getContext("2d");

            $(this.el).appendTo(this.options.$target);
            $(this.el).attr( { width: w, height: h } );

            this.drawHorizontalScale( p, w, h, context );
            this.drawVerticalScale( p, w, h, context );

            context.stroke();

            return this;
        },

        drawHorizontalScale: function( p, w, h, context ){

            context.fillStyle = this.backgroundColor;
            context.fillRect( p  , 0, w - ( p ), 39 );
            context.fillStyle = this.lineColor;

            for (var x = 0; x + ( p ) <= w; x += 5) {
                var ln = ( x % 25 === 0 ) ? 10 : 5;
                context.moveTo( 0.5 + x + p, 0 );
                context.lineTo( 0.5 + x + p, ln );
                if( x % 50 === 0 ){
                    context.fillText( x, x + p - ( x > 100 ? 10 : ( ( x > 10 ? 5 : 0) ) ), 20 );
                }
            }

        },

        drawVerticalScale: function( p, w, h, context ){

            context.fillStyle = this.backgroundColor;
            context.fillRect( 0 , p, 39, h - ( p ) );
            context.fillStyle = this.lineColor;

            for (var y = 0; y + (p) <= h; y += 5) {
                var ln = (y % 25 === 0) ? 10 : 5;
                context.moveTo( 0, 0.5 + y + p );
                context.lineTo( ln, 0.5 + y + p );
                if( y % 50 === 0 ){
                    context.fillText( y, 10, y + p + ( ( y < 10 ) ? 10 : 5 ) );
                }
            }
        }

    });

});