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
    './image-editor',
    'text!modules/designer/properties/tpl/image.html'
], function($, _, Backbone, ImageEditorView, ViewTemplate){

    return Backbone.View.extend({

        events: {
            'click a#set-btn':'setImage',
            'click a#clear-btn': 'clearImage'
        },

        template:_.template(ViewTemplate),

        render: function(){
            if( !this.model ) {
                this.model = new Backbone.Model({});
            }

            this.model.set( 'image', this.options.value );
            this.model.on('confirm', this.changed, this);

            $(this.el).append(this.template({
                property: this.options.property,
                value: this.options.value
            }));

            this.$('input').attr('disabled', 'disabled');
            if(this.options.property.readonly){
                this.$('a').addClass('disabled');
            }
            return this;
        },

        setImage: function(event){

            var that = this,
                $target = $(event.target);
            $target.popEditor({
                title: '设置' + this.options.property.name ,
                html: true,
                content: function(){
                    return $(new ImageEditorView({
                        model: that.model,
                        $target: $target
                    }).render().el);
                }
            })
            $(event.target).popEditor('show', event)
        },

        clearImage: function(){
            this.$('input').val('');
            this.trigger('inputChanged', '');
        },

        changed: function(){
            var image = this.model.get('image');
            !image && ( image = '' );
            this.$('input').val(image)
            this.trigger('inputChanged', image);
        }
    })
})