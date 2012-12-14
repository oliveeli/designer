/**
 * Author: 李军
 * Date: 12-10-10
 * Time: 上午10:13
 *
 */
define([
    'jquery',
    'underscore',
    'backbone'
],
function($, _, Backbone){

        var AppRouter = Backbone.Router.extend({

            routes: {
                'module/:moduleId':'showModule'
            },

            initialize: function(){
                _.extend(this, Backbone.Events);
            },

            showModule: function(moduleId){
                this.trigger('router', moduleId);
            }
        });

        var initialize = function(){
            var app_router = new AppRouter;
            Backbone.history.start();
            return app_router;
        };

        return {
            initialize: initialize
        };
});