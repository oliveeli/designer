/**
 * Author: 李军
 * Date: 12-11-8
 * Time: 下午3:10
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './item'
], function($, _, Backbone, ItemView, ViewTemplate){
        return Backbone.View.extend({


            initialize: function(options){
                this.collection = options.collection;
                this.collection.on('add', this.addOne, this);
                this.itemsView = {};
            },

            render: function(){
                return this;
            },

            findInsertAfterView: function( model ){
                var minDistance = Number.MAX_VALUE,
                    zIndex = model.get( 'zIndex'),
                    that = this,
                    view ;
                this.collection.each( function( m ){
                    var di = Number(m.get( 'zIndex' ) - Number(zIndex));
                    if( di > 0 && di < minDistance ){
                        view = that.itemsView[m.get('id')];
                    }
                });
                return view;
            },

            addOne: function( model ){

                model.on( 'move:up', this.handleMoveUpModel, this );
                model.on( 'move:down', this.handleMoveDownModel, this );

                var $insert = this.findInsertAfterView( model),
                    view = new ItemView({model: model}).render();
                if( $insert ) {
                    $( view.el ).insertAfter( $( $insert.el ) );
                } else {
                    $( view.el).prependTo( $(this.el) );
                }
                this.itemsView[ model.get( 'id' ) ] = view;
            },

            handleMoveUpModel: function( model, switchModel ){
                $( model.outlineView.el ).detach().insertBefore( $(switchModel.outlineView.el) );
            },

            handleMoveDownModel: function( model, switchModel ) {
                $( model.outlineView.el ).detach().insertAfter ( $(switchModel.outlineView.el) );
            }

        });
    }
);