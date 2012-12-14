/**
 * Author: 李军
 * Date: 12-11-30
 * Time: 下午1:24
 *
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    return Backbone.Model.extend({

        initialize: function( ){
        },

        getSelected: function(){
            var v =  this.get( 'selected' );
            !v && ( v = [] );
            return v;
        },

        initFromSaveString: function( saveData ){
            if ( saveData ) {
                this.set( 'selected', saveData.split(',') );
            }
            return this;
        },

        toSaveString: function(){
            var s  = this.getSelected();
            if( s && s.length > 0 ) {
                return s.join( ',' );
            } else {
                return '';
            }
        }

    });

});