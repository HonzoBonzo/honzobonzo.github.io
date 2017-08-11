"use strict";

angular.module("core.countryList").factory("CountryService", [
  "$resource",
  function($resource) {
    return $resource("mocks/countries.mock.json", {}, {
      query: {
        method: 'GET',
        isArray: true,
      }
    });
  }
]);
