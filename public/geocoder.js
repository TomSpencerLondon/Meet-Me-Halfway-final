var geocodeFuncs = (function () {

    var createGeoCoder = function()
    {
        return new google.maps.Geocoder();
    }

    var getLatLng = function (geoCoder, address) {
        return new Promise(function (resolve, reject) {
            geoCoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === 'OK') {
                    resolve( {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()});
                } else {
                    reject('Geocode was not successful. Could not return latitude for the following reason: ' + status);
                }
            });
        });
    }

    var calculateMiddlePoint =  function (geoCoder, latlng1, latlng2) {
      return Promise.resolve( {lat: (latlng1.lat + latlng2.lat) / 2, lng: (latlng1.lng + latlng2.lng) / 2} );
    }

    return {
        createGeoCoder: createGeoCoder,
        getLatLng: getLatLng,
        calculateMiddlePoint: calculateMiddlePoint
    }
})();
