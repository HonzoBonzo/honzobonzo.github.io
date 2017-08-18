"use strict";

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

function CountryListController(CountryService) {
  var vm = this;

  CountryService.getAllRegions().then(function(response) {
    vm.regions = response;
  });

  CountryService.getAllCountries().then(function(response) {
    vm.countries = response;
  });

  vm.maybeChangeRegionGeoPermission = function(countryRegionName) {
    var index = vm.regions.findIndex(function(region) {
      return region.name === countryRegionName;
    });

    vm.regions = [].concat(
      _toConsumableArray(vm.regions.slice(0, index)),
      [
        _extends({}, getRegion(countryRegionName), {
          voicePermission: !!!isAnyCountryUnchecked(countryRegionName)
        })
      ],
      _toConsumableArray(vm.regions.slice(index + 1, vm.regions.length))
    );
  };

  vm.changeAllCountries = function(regionName) {
    var changedCountries = vm.countries
      .filter(function(country) {
        return country.region === regionName;
      })
      .map(function(country) {
        return _extends({}, country, {
          voicePermission: getRegion(regionName).voicePermission
        });
      });

    var otherCountries = vm.countries.filter(function(country) {
      return country.region !== regionName;
    });

    vm.countries = changedCountries.concat(otherCountries);
  };

  vm.sortByName = function(regionName) {
    var index = vm.regions.findIndex(function(region) {
      return region.name === regionName;
    });

    vm.regions = [].concat(
      _toConsumableArray(vm.regions.slice(0, index)),
      [
        _extends({}, getRegion(regionName), {
          orderDesc: !getRegion(regionName).orderDesc
        })
      ],
      _toConsumableArray(vm.regions.slice(index + 1, vm.regions.length))
    );
  };

  function getRegion(regionName) {
    return vm.regions.filter(function(c) {
      return c.name === regionName;
    })[0];
  }

  function isAnyCountryUnchecked(RegionName) {
    return vm.countries.filter(function(country) {
      return country.region === RegionName && !country.voicePermission;
    }).length;
  }
}

angular.module("core.countryList").component("countryList", {
  templateUrl: "app/core/country-list/country-list.template.html",
  controller: ["CountryService", CountryListController],
  bindings: {
    perm: "@" //wasnt sepcified whether I should handle messaging too, and how it should works
  }
});
