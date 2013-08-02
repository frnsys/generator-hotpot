requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'vendor/bower/jquery/jquery',
        modernizr: 'vendor/bower/modernizr/modernizr',
        requirejs: 'vendor/bower/requirejs/require'
    },
    shim: {
        modernizr: {
            exports: 'Modernizr'
        }
        // Example
        //backbone: {
            //deps: ['jquery', 'underscore'],
            //exports: 'Backbone'
        //},
        //underscore: {
            //exports: '_'
        //}
    }
});
