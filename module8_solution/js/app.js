(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    function FoundItems() {
        var ddo = {
            templateUrl: "templates/foundItem.html",
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true

        }
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;

        list.isResults = function() {
            if (list.foundItems.hasSearched !== true) {
                return false;
            } else {
                if (list.foundItems.hasResults === true) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    NarrowItDownController.$inject = ["MenuSearchService"]

    function NarrowItDownController(MenuSearchService) {
        var narrowItDown = this;
        narrowItDown.searchTerm = '';
        narrowItDown.found = {
            results: [],
            hasResults: false,
            hasSearched: false
        };

        narrowItDown.getMenuResults = function() {
            var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
            narrowItDown.found.hasSearched = true;
            promise.then(function(result) {
                narrowItDown.found.results = result;
                if (result.length > 0) {
                    narrowItDown.found.hasResults = true;
                } else {
                    narrowItDown.found.hasResults = false;
                }
            }).catch(function(error) {
                console.log("Something went terribly wrong");
            })
        }

        narrowItDown.removeItem = function(itemIndex) {
            narrowItDown.found.results.splice(itemIndex, 1);
        }
    }

    MenuSearchService.$inject = ["$http"]

    function MenuSearchService($http) {
        var service = this;

        /* the commented code would strip the whitespace before search but will catch more unexpected results e.g. "ice" would match with sliced */
        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function(result) {
                var foundItems = [];
                // searchTerm = searchTerm.replace(/\s/g, "").toLowerCase();
                searchTerm = searchTerm.trim().toLowerCase();
                if (result && searchTerm.length !== 0) {
                    let menu = result.data.menu_items
                    for (let i = 0; i < menu.length; i++) {
                        // var filteredDesc = menu[i].description.replace(/\s/g, "").toLowerCase();
                        var filteredDesc = menu[i].description.trim().toLowerCase();
                        if (filteredDesc.indexOf(searchTerm) != -1) {
                            foundItems.push(menu[i]);
                        }
                    }
                }
                return foundItems;
            })
        }
    }
})();