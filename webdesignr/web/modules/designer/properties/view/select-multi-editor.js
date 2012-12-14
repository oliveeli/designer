/**
 * Author: 李军
 * Date: 12-11-28
 * Time: 下午5:44
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/properties/tpl/select-multi-editor.html'
], function($, _, Backbone, ViewTemplate){


    return Backbone.View.extend({

        events: {
            'click #cancel': 'cancelData',
            'click #confirm': 'confirmData'
        },

        className: 'designer-property-multi-select-editor',

        template:_.template(ViewTemplate),

        initialize: function( options ){
            this.model = options.model;
        },

        render: function() {
            $(this.el).append(this.template({ property: this.options.property }));
            var selected = this.model.getSelected();
            for( var i= 0, l=selected.length; i < l ; i++) {
                this.$('input:checkbox[value='+ selected[i] +']').attr( 'checked', true );
            }
            return this
        },

        confirmData: function(){
            var checkboxList = this.$('input:checkbox');
            var buffer = new Array();
            for( var i = 0, l=checkboxList.length; i < l; i++ ) {
                var $e = $(checkboxList[i]);
                $e.is(':checked') && buffer.push( $e.val() );

            }
            this.model.set( 'selected', buffer )
            this.model.trigger( 'confirm');
            this.options.$target.popEditor('hide');
        },

        cancelData: function(){
            this.options.$target.popEditor('hide');
        }

    });
});