(function() {
    "use strict";

    angular.module('common')
        .service('SignUpService', SignUpService);

    SignUpService.$inject = ['$filter'];

    function SignUpService($filter) {
        var service = this;
        service.info;

        service.getSignUp = function() {
            return service.info
        }

        service.setSignUpInfo = function(value) {
            service.info = value;
        }

        service.getCategoryAndNumber = function(value) {
            var userInput = $filter('uppercase')(value).toString().trim().replace(/\s/g, "");
            let firstElement = Number(userInput[0]);
            let secondElement = Number(userInput[1]);
            let itemNumber = null;
            let toVerifyShortName = null;

            if (Number.isNaN(firstElement)) {
                toVerifyShortName = userInput[0];

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
            }
            return { shortname: toVerifyShortName, itemnumber: itemNumber }
        }

        service.checkItems = function(shortname, itemnumber, shortnames, data) {
            var checkedItem = { isValid: false, itemName: '', itemDesc: '' }
            if (shortname !== null && itemnumber !== null) {
                if (shortnames.indexOf(shortname) !== -1 && itemnumber !== null && !Number.isNaN(itemnumber)) {
                    try {
                        let itemsList = data[shortname].menu_items
                        if (itemsList) {
                            for (let i = 0; i < itemsList.length; i++) {
                                if (itemsList[i].short_name === (shortname + itemnumber)) {
                                    checkedItem.isValid = true;
                                    checkedItem.itemName = itemsList[i].name;
                                    checkedItem.itemDesc = itemsList[i].description;
                                    return checkedItem;
                                }
                            }
                            return checkedItem;
                        } else {
                            throw new Error();
                        }
                    } catch (err) {
                        return checkedItem;
                    }
                } else {
                    return checkedItem;
                }
            } else {
                return checkedItem;
            }
        }
    }

})();