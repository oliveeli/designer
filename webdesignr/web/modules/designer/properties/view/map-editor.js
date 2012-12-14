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
    'text!modules/designer/properties/tpl/map-editor.html',
    'text!modules/designer/properties/tpl/map-editor-item.html'
], function($, _, Backbone, ViewTemplate, ViewItemTemplate){

    var MapEditorItemView = Backbone.View.extend({
        tagName: 'tr',

        template:_.template(ViewItemTemplate),

        events: {
            'input #map-key': 'changedKey',
            'input #map-value': 'changedValue',
            'click #delete': 'deleteMe',
            'click #move-up': 'moveUp',
            'click #move-down': 'moveDown'
        },

        render: function(){
            $(this.el).append(
                this.template({
                    model: this.model.toJSON()
                } )
            );
            return this;
        },

        changedKey: function( e ) {
            this.model.set( 'key', $( e.target).val() );
        },

        changedValue: function( e ) {
            this.model.set( 'value', $( e.target).val() );
        },

        deleteMe: function( event ){
            this.trigger( 'delete' , this.model );
            this.remove();
        },

        moveUp: function( event ){

        },

        moveDown: function( event ){

        }

    });

    return Backbone.View.extend({

        events: {
            'click #cancel': 'cancelMap',
            'click #confirm': 'confirmMap',
            'click #add': 'clickAdd'
        },

        className: 'designer-property-map-editor',

        template:_.template(ViewTemplate),

        initialize: function( options ){
            this.collection = options.collection;
        },

        render: function() {
            $(this.el).append(this.template({ }));
            this.collection.each(this.addOne, this);
            return this
        },

        clickAdd: function( event ) {
            var model = new this.collection.model();
            this.collection.add( model );
            this.addOne( model )
        },

        addOne: function( model ){
            var itemView = new MapEditorItemView({ model: model }).render()
            this.$('tbody').append( $( itemView.el ) );
            itemView.on( 'delete' , this.deleteOne, this );
        },

        deleteOne: function( model ){
            this.collection.remove( model );
        },



        confirmMap: function(){
            this.collection.trigger( 'confirm' );
            this.options.$target.popEditor('hide');
        },

        cancelMap: function(){
            this.options.$target.popEditor('hide');
        }

    });
});