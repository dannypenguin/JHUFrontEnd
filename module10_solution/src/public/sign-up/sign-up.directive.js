(function() {
    "use strict";

    angular.module('public')
        .directive('shortname', shortname);

    shortname.$inject = ['$q', '$timeout', 'SignUpService'];

    function shortname($q, $timeout, SignUpService) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var data = scope.signUpCtrl.$resolve.menuCategories
                var shortnames = Object.keys(data);

                ctrl.$asyncValidators.shortname = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return $q.resolve();
                    }

                    var def = $q.defer();

                    $timeout(function() {
                        //Mock a delayed response
                        if (modelValue !== undefined) {
                            let parsedInput = SignUpService.getCategoryAndNumber(modelValue);
                            let shortname = parsedInput.shortname;
                            let itemNumber = parsedInput.itemnumber;
                            if (SignUpService.checkItems(shortname, itemNumber, shortnames, data).isValid) {
                                def.resolve();
                            } else {
                                def.reject();
                            }
                        } else {
                            def.reject();
                        }
                    }, 500);

                    return def.promise;
                };
            }
        };
    }
})();