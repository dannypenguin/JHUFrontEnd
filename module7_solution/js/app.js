(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ["ShoppingListCheckOffService"]

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.shoppingList = ShoppingListCheckOffService.getToBuyItems();

        toBuy.updateShoppingLists = function(index) {
            ShoppingListCheckOffService.addItem(toBuy.shoppingList[index].name, toBuy.shoppingList[index].quantity)
            ShoppingListCheckOffService.removeItem(index);
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
            { name: "cookies", quantity: 10 },
            { name: "chips", quantity: 5 },
            { name: "jerky", quantity: 5 },
            { name: "coke", quantity: 2 },
            { name: "ice cream", quantity: 1 }
        ];

        var boughtItems = [];

        service.addItem = function(itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
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

})();