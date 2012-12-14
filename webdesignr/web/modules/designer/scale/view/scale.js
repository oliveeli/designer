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

        drawScale: function(){
            var p = 40,
                w = this.options.$target.width(),
                h = this.options.$target.height(),
                context = $(this.el).get(0).getContext("2d");

            $(this.el).appendTo(this.options.$target);
            $(this.el).attr({width: w, height: h});

            context.fillStyle = '#dddddd';
            context.fillRect( p  , 0, w - (p ), 39 );
            context.fillRect( 0 , p, 39, h - ( p ) );
            context.fillStyle = '#000000';

            for (var x = 0; x + (p) <= w; x += 5) {
                var ln = ( x % 25 === 0 ) ? 10 : 5;
                context.moveTo(0.5 + x + p, 0);
                context.lineTo(0.5 + x + p, ln);
                if(x%50===0){
                    context.fillText(x, x + p - (x > 100 ? 10 : ( (x > 10 ? 5 : 0) ) ), 20);
                }
            }
            for (var y = 0; y + (p) <= h; y += 5) {
                var ln = (y % 25 === 0) ? 10 : 5;
                context.moveTo(0, 0.5 + y + p);
                context.lineTo(ln, 0.5 + y + p);
                if( y%50===0 ){
                    context.fillText(y, 10, y + p + ( (y<10)?10:5 ));
                }
            }
            context.strokeStyle = "black";
            context.stroke();
        },

        render: function(){
            this.drawScale();
            return this;
        }

    });

});