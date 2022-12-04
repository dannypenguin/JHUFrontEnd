(function() {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['SignUpService', 'menuCategories'];

    function SignUpController(SignUpService, menuCategories) {
        var signUpCtrl = this;

        signUpCtrl.submit = function() {
            var parsed = SignUpService.getCategoryAndNumber(signUpCtrl.user.favorite);
            var imageUrl = 'images/menu/' + parsed.shortname + '/' + signUpCtrl.user.favorite.toUpperCase() + '.jpg'
            var favoriteObject = SignUpService.checkItems(parsed.shortname, parsed.itemnumber, Object.keys(menuCategories), menuCategories);
            console.log(imageUrl);
            if (favoriteObject.isValid) {
                SignUpService.setSignUpInfo({...signUpCtrl.user, display_name: favoriteObject.itemName, display_desc: favoriteObject.itemDesc, display_img: imageUrl });
                signUpCtrl.completed = true;
            }
        };
    }


})();