/**
 * Author: 李军
 * Date: 12-11-23
 * Time: 下午3:49
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './border-editor',
    './../model/border',
    'text!modules/designer/properties/tpl/border.html'
], function($, _, Backbone, BorderEditorView, BorderModel, ViewTemplate){



    return Backbone.View.extend({

        events: {
            'click a#set-btn':'setBorder',
            'click a#clear-btn': 'clearBorder'
        },

        template:_.template(ViewTemplate),

        render: function(){
            this.model = this.options.value;
            if( !this.model ) {
                this.model = new BorderModel( { } );;
                this.model.on('confirm', this.changed, this);
            }

            $(this.el).append(this.template({ property: this.options.property }));

            this.$('input').val( this.model.toSaveString() );

            this.$('input').attr('disabled', 'disabled');
            if(this.options.property.readonly){
                this.$('a').addClass('disabled');
            }
            return this;
        },

        setBorder: function(event){
            var that = this,
                $target = $(event.target)
            $target.popEditor({
                title: '设置' + this.options.property.name ,
                html: true,
                content: function(){
                    return $(new BorderEditorView({
                        model: that.model,
                        $target: $target
                    }).render().el);
                }
            })
            $(event.target).popEditor('show', event)
        },

        changed: function(){
            this.$('input').val( this.model.toSaveString() );
            this.trigger('inputChanged', this.model );
        },

        clearBorder: function(){
            this.model.clear();
            this.model.trigger( 'confirm' );
        }
    })
})