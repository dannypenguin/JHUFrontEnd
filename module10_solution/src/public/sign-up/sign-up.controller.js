(function() {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    function SignUpController() {
        var signUpCtrl = this;

        signUpCtrl.submit = function() {
            signUpCtrl.completed = true;
        };
    }


})();