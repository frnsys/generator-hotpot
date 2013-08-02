requirejs.config({
    baseUrl: 'scripts/vendor',
    paths: {
        jquery: 'vendor/bower/jquery/jquery',
        modernizr: 'vendor/bower/modernizr/modernizr',
        requirejs: 'vendor/bower/requirejs/require'
    },
    shim: {
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
