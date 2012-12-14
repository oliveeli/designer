/**
 * Author: 李军
 * Date: 12-11-29
 * Time: 上午9:01
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
            if( mj.color && mj.size) {
                json['border'] = mj.size + 'px solid ' + mj.color;
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
            $e.css( 'border' , '' );

            // set new css
            var cssData = this.toCssJsonObject();
            for( var key in cssData ) {
                $e.css( key , cssData[key] );
            }
        }

    });

});