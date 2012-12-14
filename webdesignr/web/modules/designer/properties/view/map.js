/**
 * Author: 李军
 * Date: 12-11-28
 * Time: 下午5:42
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './map-editor',
    './../collection/map',
    'text!modules/designer/properties/tpl/map.html'
], function($, _, Backbone, DataEditorView, DataCollection, ViewTemplate){

    return Backbone.View.extend({

        events: {
            'click a#set-btn':'setData',
            'click a#clear-btn': 'clearData'
        },

        template:_.template(ViewTemplate),

        initialize: function( options ) {

        },

        render: function(){
            this.collection = this.options.value;
            if( !this.collection ) {
                this.collection = new DataCollection( null ,{} );;
            }
            this.collection.on('confirm', this.changed, this);

            $(this.el).append(this.template({property: this.options.property }));

            this.$('input').val( this.collection.toSaveString() );

            this.$('input').attr('disabled', 'disabled');
            if(this.options.property.readonly){
                this.$('a').addClass('disabled');
            }
            return this;
        },

        setData: function(event){
            var that = this,
                $target = $(event.target)
            $target.popEditor({
                title: '设置' + this.options.property.name ,
                html: true,
                content: function(){
                    return $(new DataEditorView({
                        collection: that.collection,
                        $target: $target
                    }).render().el);
                }
            })
            $(event.target).popEditor('show', event)
        },

        clearData: function(){
            this.collection.removeAll();
            this.collection.trigger( 'confirm' );
        },

        changed: function(){
            this.$('input').val( this.collection.toSaveString() );
            this.trigger('inputChanged', this.collection );
        }
    })
})