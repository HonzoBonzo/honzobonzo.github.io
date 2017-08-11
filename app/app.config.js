"use strict";

angular.module("countriesApp").config([
  "$locationProvider",
  "$routeProvider",
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix("#");

    $routeProvider
      .when("/voice", {
        template: "<country-list></country-list>"
      })
      .when("/messaging", {
        template: "<country-list></country-list>"
      })
      .otherwise("/voice");
  }
]);
