
(function( angular, requirejs ){
    "use strict";

    var tests = [];

    for (var file in window.__karma__.files) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }

    requirejs.config({

        // Karma serves files from '/base'

        baseUrl: '/base/src',

        paths: {

            'text'      : '../vendor/_custom/require/text',
            'underscore': '../vendor/underscore/underscore-min',

            'angular'   : '../vendor/angular/angular',
            'ngRoute'      : '../vendor/angular-route/angular-route',
            'ngSanitize'   : '../vendor/angular-sanitize/angular-sanitize',
            'mocks'     : '../vendor/angular-mocks/angular-mocks',

            // Configure alias to full paths

            'auth'         : './quizzer/authentication',
            'quiz'         : './quizzer/quiz',
            'utils'        : './mindspace/utils',

            'sinon'     : '../vendor/sinon/lib/sinon'
        },

        shim: {
            'angular':
            {
                exports : 'angular'
            },
            'underscore': {
                exports: '_'
            }
        },

        priority: [ "angular" ],

        // ask Require.js to load these test *Spec.js files
        deps    : tests,

        // auto start test runner, once Require.js is done
        callback: window.__karma__.start
    });

    var dependencies = [
        'angular',
        'quizzer/config/LogInterceptor'
    ];

    /**
     * Register the  class with RequireJS
     *
     * Notice: the dependencies are NOT used as arguments
     */
    require( dependencies, function ( angular, LogInterceptor )
    {
        // Prepare `test` module for all the specs (if needed)
        // Provide contextRoot for all `live` delegate testing
        //
        // NOTE: real server is at
        //       but we proxy it via http://localhost:8000/app/api/

        angular.module( 'test.quizzler', [ ] )
            .config( LogInterceptor )
            .value( "contextRoot", "http://166.78.24.115:8080/app/api/");

    });


})( angular, requirejs );
