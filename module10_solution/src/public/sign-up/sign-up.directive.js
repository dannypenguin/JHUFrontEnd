(function() {
    "use strict";

    angular.module('public')
        .directive('shortname', shortname);

    shortname.$inject = ['$q', '$timeout', '$filter'];

    function shortname($q, $timeout, $filter) {
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
                            var userInput = $filter('uppercase')(modelValue).toString().trim().replace(/\s/g, "");
                            let firstElement = Number(userInput[0]);
                            let secondElement = Number(userInput[1]);
                            let itemNumber = null;

                            if (Number.isNaN(firstElement)) {
                                let toVerifyShortName = userInput[0];

                                if (Number.isNaN(secondElement)) {
                                    toVerifyShortName += userInput[1];
                                    if (userInput.length > 2) {
                                        itemNumber = Number(userInput.slice(2));
                                    }
                                } else {
                                    if (userInput.length > 1) {
                                        itemNumber = Number(userInput.slice(1));
                                    }
                                }

                                if (shortnames.indexOf(toVerifyShortName) !== -1 && itemNumber !== null && !Number.isNaN(itemNumber)) {
                                    try {
                                        if (data[toVerifyShortName].menu_items[itemNumber - 1].short_name) {
                                            def.resolve();
                                        } else {
                                            throw new Error();
                                        }
                                    } catch (err) {
                                        def.reject();
                                    }
                                } else {
                                    def.reject();
                                }
                            } else {
                                def.reject();
                            }
                        }
                    }, 500);

                    return def.promise;
                };
            }
        };
    }
})();