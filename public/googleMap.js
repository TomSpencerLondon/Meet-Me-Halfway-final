var googleMap = (function () {
    function initMap(centre, element) {
        const options = {
            zoom: 10,
            center: {
                lat: centre.lat,
                lng: centre.lon }
        };

        return Promise.resolve(new google.maps.Map(element, options));
    }

    var setCenterTo = function (map, latlng) {
        map.setCenter(latlng);
        return Promise.resolve();
    }

    var fitToBounds = function(map, latlngs)
    {
        let latlngBounds = new google.maps.LatLngBounds();
        for (const latlng of latlngs)
        {
            latlngBounds.extend(latlng);
        }
        map.fitBounds(latlngBounds);
    }

    var setMarker = function (map, latlng, labelText = null) {
        var label = null;
        if (labelText != null) {
            // MarkerLabel object: https://developers.google.com/maps/documentation/javascript/markers#marker_labels
            label = {text: labelText};
        }
        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(latlng.lat, latlng.lng),
            label: label
        });
        return marker;
    }

    var removeMarker = function (marker) {
        marker.setMap(null);
    }

    return {
        initMap: initMap,
        setCenterTo: setCenterTo,
        fitToBounds: fitToBounds,
        setMarker: setMarker,
        removeMarker: removeMarker
    };
})();
