(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .filter('trippleDollars', trippleDollarSignsFilter);

    ToBuyController.$inject = ["ShoppingListCheckOffService"]

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.shoppingList = ShoppingListCheckOffService.getToBuyItems();

        toBuy.updateShoppingLists = function(index) {
            ShoppingListCheckOffService.addItem(toBuy.shoppingList[index].name, toBuy.shoppingList[index].quantity, toBuy.shoppingList[index].pricePerItem)
            ShoppingListCheckOffService.removeItem(index);
        }

        // this validates on ng-blur and ng-change to protect us from illogical values
        toBuy.validateInput = function(index, value, replaceValue) {
            if (value) {
                // I chose to parse it as a float and then round because the UX was better.
                value = Number.parseFloat(value);
                if (Number.isNaN(value) || value < 0) {
                    toBuy.shoppingList[index].quantity = replaceValue;
                } else {
                    toBuy.shoppingList[index].quantity = Math.round(value);
                }
            } else {
                toBuy.shoppingList[index].quantity = replaceValue;
            }
        }
    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;
        bought.shoppingList = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        // List of shopping items
        var toBuyItems = [
            { name: "cookies", quantity: 10, pricePerItem: 2 },
            { name: "chips", quantity: 5, pricePerItem: 2 },
            { name: "jerky", quantity: 5, pricePerItem: 2 },
            { name: "coke", quantity: 2, pricePerItem: 2 },
            { name: "ice cream", quantity: 1, pricePerItem: 2 }
        ];

        var boughtItems = [];

        service.addItem = function(itemName, quantity, pricePerUnit) {
            var item = {
                name: itemName,
                quantity: quantity,
                totalPrice: quantity * pricePerUnit
            };
            boughtItems.push(item);
        };

        service.removeItem = function(itemIndex) {
            toBuyItems.splice(itemIndex, 1);
        };

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        }
    }

    function trippleDollarSignsFilter() {
        return function(value) {
            value = value || "";
            value = "$$$" + value;
            return value;
        }
    }

})();