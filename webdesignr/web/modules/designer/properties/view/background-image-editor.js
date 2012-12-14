/**
 * Author: 李军
 * Date: 12-11-28
 * Time: 上午9:56
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/properties/tpl/background-image-editor.html'
], function($, _, Backbone, ViewTemplate){
    return Backbone.View.extend({

        events: {
            'click #cancel': 'cancelImage',
            'click #confirm': 'confirmImage',
            'change #select-image': 'selectImage'
        },

        className: 'wd-properties-editor-image',

        template:_.template(ViewTemplate),

        render: function() {
            $(this.el).append(this.template({ }));
            var image = this.model.get( 'image'),
                repeat = this.model.get( 'repeat');
            image && this.$('img').attr( 'src' , image);
            repeat && this.$( '#p-repeat').val( repeat );
            return this
        },

        selectImage: function(evt){
            var f = evt.target.files[0]; // file object

            if (!f.type.match('image.*')) {
                return;
            }

            var reader = new FileReader(),
                $target = this.$('img');

            reader.onload = (function(theFile) {
                return function(e) {
                    $target.attr('src', e.target.result);
                };
            })(f);

            reader.readAsDataURL(f);
        },

        confirmImage: function(){
            var src = this.$('img').attr('src');
            if ( !src ) {
                alert( '请选择图片' );
                return;
            }
            this.model.set('image', src);
            this.model.set('repeat', this.$( '#p-repeat').val() );
            this.model.trigger( 'confirm' );
            this.options.$target.popEditor('hide');
        },

        cancelImage: function(){
            this.options.$target.popEditor('hide');
        }

    });
});