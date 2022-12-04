(function() {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['SignUpService'];

    function MyInfoController(SignUpService) {
        var myInfoCtrl = this;
        myInfoCtrl.user = SignUpService.getSignUp();


    }


})();