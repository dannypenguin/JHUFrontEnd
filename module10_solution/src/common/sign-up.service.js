(function() {
    "use strict";

    angular.module('common')
        .service('SignUpService', SignUpService);


    SignUpService.$inject = ['$http', 'ApiPath'];

    function SignUpService($http, ApiPath) {
        var service = this;

    }



})();