angular.module('myApp')
.controller('AddressCtrl', ['$scope', '$timeout', 'addressesService', '$location', function ($scope, $timeout, addressesService, $location) {

  $scope.placeType  = "free wifi";
  $scope.addresses = addressesService.addresses;
  $scope.customUrl = addressesService.customUrl;
  checkIfAllEmptyAndValid();

  if ($location.search().l) {
    console.log($location.search().l);
    $scope.addresses = [];
    $timeout(function() {
      addressesService.loadInAddresses($location.search().l).success(function() {
        $scope.addresses = addressesService.addresses;
      });
    }, 1);
    $timeout(function() {
        _.each($scope.addresses, function(address) {
        address.isEmpty = true;
        address.isProcessing = true;
        addressesService.isValidAddress(address);
      });
    }, 1000);
  }

  function checkIfAllEmptyAndValid() {
    $scope.isAllValid = true;
    $scope.isAllEmpty = true;
    _.each($scope.addresses, function(address) {
      if (address.isValid == false) {
        $scope.isAllValid = false;
      }
      if (address.address != "") {
        $scope.isAllEmpty = false;
      }
    })
  }

  $scope.addLocation = function() {
    // TODO: Figure out why this causes an error
    var newLocation = { address: "", placeholder: "optional address, city, or zip", isProcessing: false, isValid: true, isEmpty: true };
    $scope.addresses.push(newLocation);
  };

  $scope.$watch('addresses', function(newValue, oldValue) {  

    for (var i = 0; i < newValue.length; i++) {
      newLocation = newValue[i];
      oldLocation = oldValue[i];
      if (newLocation.address != oldLocation.address) {
        newLocation.isEmpty = true;
        newLocation.isProcessing = true;
        addressesService.isValidAddress(newLocation);
      } else if (newLocation.address == "") {
        newLocation.isEmpty = true;
        newLocation.isProcessing = false;
        newLocation.isValid = true;
      }
    }
    if (newValue != oldValue) {
      $timeout(checkIfAllEmptyAndValid, 1);
    }
    addressesService.setAddresses($scope.addresses);
  }, true);

  $scope.submitInfo = function() {
    $scope.results = false;
    $scope.selectedResult = null;
    var addressesOnly = _.map($scope.addresses, function(address) {
      return address.address;
    });
    $scope.addressesOnly = _.filter(addressesOnly, function(address) { return address });
    addressesService.getResults($scope.addressesOnly, $scope.placeType).success(setVariables).error(setVariables);
  };

  function setVariables() {
    $scope.processing = false;
    $scope.error      = addressesService.error;
    $scope.results    = addressesService.results;
    if ($scope.error == null) {
      $timeout(scrollToResults, 1);
    }
  }

  function scrollToResults() {
    $('body,html').animate({
      scrollTop: $("#results").offset().top
    }, 500);
  }

  $scope.selectResult = function(result) {
    $scope.selectedResult = result;
    $scope.sentText       = false;
    $scope.textError      = false; 
    $timeout(scrollToResult, 1);
  };

  function scrollToResult() {
    $('body,html').animate({
      scrollTop: $("#result").offset().top
    }, 250);
  }

  $scope.clearSelectedResult = function() {
    $timeout(scrollToResults, 1);
    $timeout(function() {
      $scope.selectedResult = null;
    }, 500);
  };

  $scope.createMessage = function() {
    $scope.sentText    = false;
    $scope.textError   = false; 
    $scope.sendingText = true;
    var phoneNumber = $scope.phoneNumber;
    var place       = $scope.selectedResult.name;
    var address     = $scope.selectedResult.address;
    addressesService.sendMessage(phoneNumber, place, address).success(setTextVariables).error(setTextVariables);
  };

  $scope.$watch('phoneNumber', function(newValue, oldValue) {
    if (newValue != oldValue) {
      $scope.sendingText = false;
      $scope.sentText    = false;
      $scope.textError   = false; 
    }
  });

  function setTextVariables() {
    $scope.sendingText = false;
    $scope.sentText    = addressesService.sentText;
    $scope.textError   = addressesService.textError;  
  }

  $scope.map = {
    center: {
      latitude: 30,
      longitude: -84
    },
    zoom: 10
  };
  $scope.options = {
    scrollWheel: false
  };

  $scope.getGeolocation = function() {
    $scope.isGeolocationProcessing = true;
    $scope.isGeolocationError = false;
    $scope.addresses[0].placeholder = "Finding your location...";
    $scope.addresses[0].address = "";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $timeout(function() {
          var coords = position.coords.latitude + ", " + position.coords.longitude;
          addressesService.addressFromGeolocation(coords);
          $scope.isGeolocationProcessing = false;
        }, 1);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      handleNoGeolocation(false);
    }
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      $scope.isGeolocationProcessing = false;
      $scope.isGeolocationError = true;
      $scope.geolocationErrorMessage = "Geolocation failed. Try again."
    } else {
      $scope.isGeolocationProcessing = false;
      $scope.isGeolocationError = true;
      $scope.geolocationErrorMessage = "Your browser does not support geolocation."
    }
  }

  $scope.removeLocation = function(address) {
    var i = $scope.addresses.indexOf(address);
    $scope.addresses.splice(i, 1);
  }

  $scope.generateCustomUrl = function() {
    var addressesOnly = _.map($scope.addresses, function(address) {
      return address.address;
    });
    addressesService.generateCustomUrl(addressesOnly).success(function(data) {
      addressesService.customUrl = "http://www.middleof.us/?l=" + data.key;
      $scope.customUrl = addressesService.customUrl;
    })
  };

}]);