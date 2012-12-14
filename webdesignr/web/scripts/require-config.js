require.config({

    paths : {
        'text': 'scripts/lib/require/text',
        'jquery' : 'scripts/lib/jquery/jquery-1.8.1',
        'jquery.hotkeys': 'scripts/lib/jquery/jquery.hotkeys',
        'jquery.ui' : 'scripts/lib/jqueryui/jquery-ui-1.9.1.custom',
        'jquery.form' : 'scripts/lib/jquery/jquery.form',
        'jquery.jcrop' : 'scripts/lib/jquery/jcrop/js/jquery.Jcrop',
        'backbone' : 'scripts/lib/backbone/backbone',
        'backbone-localstorage': 'scripts/lib/backbone/backbone-localstorage',
        'backbone.syphon' : 'scripts/lib/backbone/backbone.syphon',
        'bootstrap' : 'scripts/lib/bootstrap/js/bootstrap',
        'bootstrap-colorpicker': 'scripts/lib/bootstrap/js/bootstrap-colorpicker',
        'bootstrap-pop-editor':'scripts/lib/bootstrap/js/bootstrap-pop-editor',
        'underscore' : 'scripts/lib/underscore/underscore',
        'two-column-view' : 'scripts/framework/two-column/view/main',
        'confirm-view' : 'scripts/framework/confirm/view/main',
        'common': 'scripts/common',
        'app-core': 'scripts/app-core',
        'moduleTemplate':'scripts/module',
        'modules-path' : 'modules',
        'ztree.core' :'scripts/lib/zTree/js/jquery.ztree.core-3.5'
    },

    shim: {
        'common': {
            deps: ['jquery']
        },
        'jquery.hotkeys': {
            deps: ['jquery']
        },
        'jquery.ui': {
            deps: ['jquery', 'bootstrap-pop-editor']
        },
        'jquery.form': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrap-colorpicker': {
            deps: ['bootstrap', 'jquery']
        },
        'bootstrap-datepicker': {
            deps: ['bootstrap', 'jquery']
        },
        'bootstrap-pop-editor': {
            deps: ['bootstrap', 'jquery']
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone-localstorage' : {
            deps: ['backbone']
        },
        'backbone.syphon' : {
            deps: ['backbone'],
            exports: 'BackboneSyphon'
        },
        'yf' : {
            deps: ['backbone'],
            exports: 'YoungFriend'
        },
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        }
    }
});