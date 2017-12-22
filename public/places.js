var places = (function() {
  function nearbySearch(map, location, type = 'cafe') {

    var _request = {
      location: location,
      radius: '500',
      type: type
    };

    return new Promise(function(resolve, reject) {
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(_request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }

  return { nearbySearch: nearbySearch };
})();
