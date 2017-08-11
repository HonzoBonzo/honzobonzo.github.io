"use strict";

function CountryListController(CountryService) {
  var vm = this;
  vm.propertyName = "name";
  vm.reverse = true;

  vm.regions = [
    {
      name: "Europe",
      voicePermission: false,
      messagingPermission: false
    },
    {
      name: "Americas",
      voicePermission: false,
      messagingPermission: false
    },
    {
      name: "Asia",
      voicePermission: false,
      messagingPermission: false
    },
    {
      name: "Oceania",
      voicePermission: false,
      messagingPermission: false
    },
    {
      name: "Africa",
      voicePermission: false,
      messagingPermission: false
    },
    {
      name: "Polar",
      voicePermission: false,
      messagingPermission: false
    }
  ];

  vm.countries = CountryService.query();

  vm.getCountries = function(regionName) {
    return vm.countries.filter(country => country.region === regionName);
  };

  vm.maybeChangeRegionGeoPermission = function(countryRegionName) {
    if (isAnyCountryUnchecked(countryRegionName)) {
      getRegion(countryRegionName).voicePermission = false;
    } else {
      getRegion(countryRegionName).voicePermission = true;
    }
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
    getRegion(regionName).orderDesc = !getRegion(regionName).orderDesc
  }

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
  controller: ["CountryService", CountryListController]
});
