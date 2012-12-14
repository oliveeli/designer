/**
 * Author: 李军
 * Date: 12-10-10
 * Time: 上午10:14
 *
 */
require([ 'jquery',
    'app-core',
    'scripts/router',
    'modules-path/designer/designer',
    'bootstrap',
    'jquery.ui',
    'jquery.hotkeys',
    'bootstrap-colorpicker',
    'common',
    'bootstrap-pop-editor',
    'backbone-localstorage'
], function($, AppCore, Router, DesignerModule) {
    $(function(){
        AppCore.register('designer-module', DesignerModule);
        AppCore.start('designer-module');
        /*
        var currentModuleId;
        Router.initialize().on('router',
            function(moduleId){
                AppCore.start(moduleId);
            }
        );
        */
    });
});