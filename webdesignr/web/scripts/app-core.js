/**
 * Author: 李军
 * Date: 12-11-9
 * Time: 下午1:53
 *
 */
define([ 'jquery',
    "underscore",
    'backbone'
], function($, _, Backbone) {
    var app = function(){

    };

    _.extend(app,  {

        moduleData: {},

        register: function(moduleId, creator){
            this.moduleData[moduleId] = {
                creator: creator,
                instance: null
            };
        },

        start: function(moduleId){
            var m = this.moduleData[moduleId].creator;
            this.moduleData[moduleId].instance =
                new m({
                    el: $('#page')
                });
            this.moduleData[moduleId].instance.start.apply(this.moduleData[moduleId].instance);
        },

        stop: function(moduleId){
            var data = this.moduleData[moduleId];
            if(data.instance){
                data.instance.stop();
                data.instance = null;
            }
        },

        startAll: function(){

        },

        stopAll: function(){}

    });

    return app;
});