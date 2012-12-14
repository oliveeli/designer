/**
 * Author: 李军
 * Date: 12-11-28
 * Time: 下午4:58
 *
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    return Backbone.Model.extend({

        initialize: function( options ){
            if(options.saveData){
                this.set( $.parseJSON( options.saveData ) );
            }
        },

        toCssJsonObject: function(){
            var mj = this.toJSON(), json = {};
            if( mj.color ) {
                json['color'] = mj.color;
            }
            if( mj.size ) {
                json['font-size'] = mj.size;
            }
            if( mj.family ) {
                json['font-family'] = mj.family;
            }
            if( mj.align ) {
                json['text-align'] = mj.align;
            }
            if( mj.italic ) {
                json['font-style'] = 'italic';
            }
            if( mj.bold ) {
                json['font-weight'] = 'bold';
            }
            return json;
        },

        toSaveString: function(){
            var json = this.toJSON(),
                hasProperty = false;
            for( var i in json ) {
                hasProperty = true;
                break;
            }
            if( hasProperty ) {
                return JSON.stringify( json );
            } else {
                return '';
            }
        },

        setElementStyle: function( $e ) {

            // remove old css
            $e.css( 'color' , '' );
            $e.css( 'font-size' , '' );
            $e.css( 'font-family' , '' );
            $e.css( 'text-align' , '' );
            $e.css( 'font-style' , '' );
            $e.css( 'font-weight' , '' );

            // set new css
            var cssData = this.toCssJsonObject();
            for( var key in cssData ) {
                $e.css( key , cssData[key] );
            }
        }

    });

});