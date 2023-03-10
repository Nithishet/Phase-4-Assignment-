

(function (angular)
{
    "use strict";

    define( [], function()
    {
        /**
         * Implement a tryCatch() method that logs exceptions for method invocations AND
         * promise rejection activity.
         *
         * @param notifyFn      Function used to log.debug exception information
         * @param scope         Object Receiver for the notifyFn invocation
         *
         * @return Function used to guard and invoke the targeted actionFn
         */
        angular.makeTryCatch = function (notifyFn, scope)
        {
            /**
             * Report error (with stack trace if possible) to the logger function
             */
            var reportError = function (reason)
                {
                    if(notifyFn != null)
                    {
                        var error = (reason && reason.stack) ? reason : null,
                            message = reason != null ? String(reason) : "";

                        if(error != null)
                        {
                            message = error.message + "\n" + error.stack;
                        }

                        notifyFn.apply(scope, [message]);
                    }

                    return reason;
                },
                /**
                 * Publish the tryCatch() guard 'n report function
                 */
                tryCatch = function (actionFn, scope, args)
                {
                    try
                    {
                        // Invoke the targeted `actionFn`
                        var result = angular.isFunction(actionFn) ? actionFn.apply(scope, args || []) : String(actionFn),
                            promise = (angular.isObject(result) && result.then) ? result : null;

                        if(promise != null)
                        {
                            // Catch and report any promise rejection reason...
                            promise.then(null, reportError);
                        }

                        actionFn = null;
                        return result;

                    }
                    catch(e)
                    {
                        actionFn = null;
                        throw reportError(e);
                    }

                };

            return tryCatch;
        };

        return angular.makeTryCatch;

    });

}(angular));
