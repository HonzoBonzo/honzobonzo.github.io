"use strict";

angular.module("countriesApp").config([
  "$routeProvider",
  function config( $routeProvider) {
    $routeProvider
      .when("/voice", {
        template: `<country-list perm="voice"></country-list>`
      })
      .when("/messaging", {
        template: `<country-list perm="messaging"></country-list>`
      })
      .otherwise("/voice");
  }
]);
