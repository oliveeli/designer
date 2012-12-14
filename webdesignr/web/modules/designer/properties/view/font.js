/**
 * Author: 李军
 * Date: 12-11-23
 * Time: 下午3:50
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './font-editor',
    './../model/font',
    'text!modules/designer/properties/tpl/font.html'
], function($, _, Backbone, FontEditorView, FontModel, ViewTemplate){

    return Backbone.View.extend({

        events: {
            'click a#set-btn':'setFont',
            'click a#clear-btn': 'clearFont'
        },

        template:_.template(ViewTemplate),

        render: function(){

            this.model = this.options.value;
            if( !this.model ) {
                this.model = new FontModel( { } );;
                this.model.on('confirm', this.changed, this);
            }

            $(this.el).append(this.template({property: this.options.property }));
            this.$('input').val( this.model.toSaveString() );

            this.$('input').attr('disabled', 'disabled');
            if(this.options.property.readonly){
                this.$('a').addClass('disabled');
            }
            return this;
        },

        setFont: function(event){
            var that = this,
                $target = $(event.target);
            $target.popEditor({
                title: '设置' + this.options.property.name ,
                html: true,
                content: function(){
                    return $(new FontEditorView({
                        model: that.model,
                        $target: $target
                    }).render().el);
                }
            })
            $(event.target).popEditor('show', event)
        },

        clearFont: function(){
            this.model.clear();
            this.model.trigger( 'confirm' );
        },

        changed: function(){
            this.$('input').val( this.model.toSaveString() );
            this.trigger('inputChanged', this.model );
        }
    })
})