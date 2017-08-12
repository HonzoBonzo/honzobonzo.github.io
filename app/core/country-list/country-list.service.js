"use strict";

angular.module("core.countryList").factory("CountryService", [
  "$http",
  function($http) {
    function getAllCountries() {
      return $http.get("app/mocks/all-countries.mock.json").then(response => {
        return response.data;
      });
    }

    function getAllRegions() {
      return $http.get("app/mocks/all-regions.mock.json").then(response => {
        return response.data;
      });
    }

    return {
      getAllCountries: getAllCountries,
      getAllRegions: getAllRegions
    };
  }
]);
