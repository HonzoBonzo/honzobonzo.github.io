"use strict";

angular.module("core.countryList").factory("CountryService", [
  "$resource",
  function($resource) {
    return $resource("app/mocks/all-countries.mock.json", {}, {
      query: {
        method: 'GET',
        isArray: true,
      }
    });
  }
]);
