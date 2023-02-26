
(function ()
{
    "use strict";

    define(function ()
    {
        /**
         * Internal util to slice arguments into a list of dependent modules
         */

        function sliceArgs(args, startIndex)
        {
            return [].slice.call(args, startIndex || 0);
        }

        /**
         * Find the construction function in the array (last element)
         */

        function extractFrom(target)
        {
            if(angular.isArray(target))
            {
                target = target[target.length - 1];
            }
            return target;
        }

        /**
         * Extract to instantiate with a constructor function or array; may
         * also specify optional arguments to be passed to the constructor function.
         */
        var createInstanceOf = function ()
        {
            var params = sliceArgs(arguments),
                Constructor = extractFrom(params.shift());

            if(angular.isFunction(Constructor))
            {
                return Constructor.length > 0 ? Constructor.apply(undefined, params) : new Constructor();

            }
            else
            {

                throw new Error("Specified target is not a constructor function or constructor array");
            }

        };

        // Publish this `construction-function` extractor

        return {
            instanceOf: createInstanceOf
        };

    });

}());
