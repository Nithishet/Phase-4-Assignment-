

(function ( define, angular ) {
    "use strict";

    define([
            'auth/Session',
            'auth/Authenticator',
            'auth/SessionController',
            'auth/LoginController'
        ],
        function ( Session, Authenticator, SessionController, LoginController )
        {
            var moduleName = "quizzer.Authenticate";

            angular
                .module(     moduleName,    [ ]                     )
                .service(    "session",           Session           )
                .service(    "authenticator",     Authenticator     )
                .controller( "SessionController", SessionController )
                .controller( "LoginController",   LoginController   );

            return moduleName;
        });


}( define, angular ));

