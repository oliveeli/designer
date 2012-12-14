/**
 * Author: 李军
 * Date: 12-11-9
 * Time: 下午2:12
 *
 */
define([ 'jquery',
    "underscore",
    'backbone'
], function($, _, Backbone) {

    var modulePrototype = _.extend({},
        {
            start: function(){
                this.render.apply(this, arguments);
            },

            stop: function(){
                this.destroy.apply(this, arguments);
            }
        }
    );

    var fdModule = Backbone.View.extend(modulePrototype);

    return fdModule;

});