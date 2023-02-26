

(function ( define, angular ) {
    "use strict";

    define([
            'quiz/delegates/QuizDelegate',
            'quiz/controllers/TestController',
            'quiz/controllers/ScoreController'
        ],
        function ( QuizDelegate, TestController, ScoreController )
        {
            var moduleName = "quizzer.Quiz";

            angular.module( moduleName, [ ] )
                .service( "quizDelegate",         QuizDelegate )
                .controller( "TestController",    TestController )
                .controller( "ScoreController",   ScoreController );

            return moduleName;
        });

}( define, angular ));

