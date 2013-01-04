/**
 * Author: 李军
 * Date: 12-12-4
 * Time: 下午2:30
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './../model/setting',
    'text!modules/designer/setting/tpl/setting.html'
], function($, _, Backbone, SettingModel, ViewTemplate ) {
    return Backbone.View.extend({

        events: {
            'click #cancel': 'cancelData',
            'click #confirm': 'confirmData'
        },

        render: function(){
            $(this.el).append(_.template(ViewTemplate)( { model: this.model.toJSON() } ));
            return this;
        },

        cancelData: function(){
            this.options.$target.popEditor('hide');
        },

        confirmData: function(){
            this.model.set('showScale', this.$('#chk-show-scale').attr('checked')==='checked' );
            this.model.set('dropSnap', this.$('#chk-drop-snap').attr('checked')==='checked' );
            this.model.trigger( 'confirm' );
            this.options.$target.popEditor('hide');
        }
    });
})