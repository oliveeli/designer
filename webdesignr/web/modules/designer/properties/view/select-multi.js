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
    './select-multi-editor',
    './../model/select-multi',
    'text!modules/designer/properties/tpl/select-multi.html'
], function($, _, Backbone, DataEditorView, DataModel, ViewTemplate){

    return Backbone.View.extend({

        events: {
            'click a#set-btn':'setData',
            'click a#clear-btn': 'clearData'
        },

        template:_.template(ViewTemplate),

        initialize: function( options ) {

        },

        render: function(){
            this.model = this.options.value;
            if( !this.model ) {
                this.model = new DataModel( null ,{} );;
            }
            this.model.on('confirm', this.changed, this);

            $(this.el).append(this.template({ property: this.options.property }));

            this.$('input').val( this.model.toSaveString() );

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
                        model: that.model,
                        $target: $target,
                        property: that.options.property
                    }).render().el);
                }
            })
            $(event.target).popEditor('show', event)
        },

        clearData: function(){
            this.model.clear();
            this.model.trigger( 'confirm' );
        },

        changed: function(){
            this.$('input').val( this.model.toSaveString() );
            this.trigger('inputChanged', this.model );
        }
    })
})