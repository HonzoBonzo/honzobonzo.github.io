"use strict";

function CountryListController(CountryService) {
  var vm = this;

  CountryService.getAllRegions().then(function(response) {
    vm.regions = response;
  });

  CountryService.getAllCountries().then(function(response) {
    vm.countries = response;
  });

  vm.maybeChangeRegionGeoPermission = function(countryRegionName) {
    const index = vm.regions.findIndex(
      region => region.name === countryRegionName
    );

    vm.regions = [
      ...vm.regions.slice(0, index),
      {
        ...getRegion(countryRegionName),
        voicePermission: !!!isAnyCountryUnchecked(countryRegionName)
      },
      ...vm.regions.slice(index + 1, vm.regions.length)
    ];
  };

  vm.changeAllCountries = function(regionName) {
    const changedCountries = vm.countries
      .filter(country => country.region === regionName)
      .map(country => ({
        ...country,
        voicePermission: getRegion(regionName).voicePermission
      }));

    const otherCountries = vm.countries.filter(
      country => country.region !== regionName
    );

    vm.countries = changedCountries.concat(otherCountries);
  };

  vm.sortByName = function(regionName) {
    const index = vm.regions.findIndex(
      region => region.name === regionName
    );

    vm.regions = [
      ...vm.regions.slice(0, index),
      {
        ...getRegion(regionName),
        orderDesc: !getRegion(regionName).orderDesc
      },
      ...vm.regions.slice(index + 1, vm.regions.length)
    ];
  };

  function getRegion(regionName) {
    return vm.regions.filter(c => c.name === regionName)[0];
  }

  function isAnyCountryUnchecked(RegionName) {
    return vm.countries.filter(
      country => country.region === RegionName && !country.voicePermission
    ).length;
  }
}

angular.module("core.countryList").component("countryList", {
  templateUrl: "app/core/country-list/country-list.template.html",
  controller: ["CountryService", CountryListController],
  bindings: {
    perm: "@" //wasnt sepcified whether I should handle messaging too, and how it should works 
  }
});
