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
                onRemove: '&',
                hasSearched: '<'
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
            if (list.hasSearched === false) {
                return false;
            } else {
                return (list.foundItems.length === 0 ? true : false);
            }
        }
    }

    NarrowItDownController.$inject = ["MenuSearchService"]

    function NarrowItDownController(MenuSearchService) {
        var narrowItDown = this;
        narrowItDown.searchTerm = '';
        narrowItDown.found = [];
        narrowItDown.hasSearched = false;

        narrowItDown.getMenuResults = function() {
            var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
            promise.then(function(result) {
                narrowItDown.found = result;
                narrowItDown.hasSearched = true;
            }).catch(function(error) {
                console.log("Something went terribly wrong");
            })
        }

        narrowItDown.removeItem = function(itemIndex) {
            narrowItDown.found.splice(itemIndex, 1);
        }
    }

    MenuSearchService.$inject = ["$http"]

    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function(result) {
                var foundItems = [];
                if (result && searchTerm.trim().length !== 0) {
                    let menu = result.data.menu_items
                    for (let i = 0; i < menu.length; i++) {
                        if (menu[i].description.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) != -1) {
                            foundItems.push(menu[i]);
                        }
                    }
                }
                return foundItems;
            })
        }
    }
})();