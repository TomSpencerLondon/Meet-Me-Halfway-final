function initializeProject() {

    const mapElement = document.getElementById('map');

    fetch("http://ip-api.com/json")     // get user's location
    .then( res => res.json() )
    .then( usersLocation => googleMap.initMap(usersLocation, mapElement) )
    .then( map => setupClickListener(map) )
    .catch( errorStatus => alert(errorStatus) );

}

function setupClickListener(map)
{
    const submitButtonElement = document.getElementById('submit');
    const hiddenAddress1Element = document.getElementById('hiddenAddress1Result');
    const hiddenAddress2Element = document.getElementById('hiddenAddress2Result');
    const hiddenMidpoint = document.getElementById('hiddenMidpoint');
    const placesPanel = document.getElementById('placesPanel');

    var markers = [];

    submitButtonElement.addEventListener('click', function() {
        const geoCoder = geocodeFuncs.createGeoCoder();

        var address1 = document.getElementById('address1').value;
        var address2 = document.getElementById('address2').value;

        // Remove previous markers
        for(let marker of markers)
        {
            googleMap.removeMarker(marker);
        }
        markers = [];

        Promise.all(
            [geocodeFuncs.getLatLng(geoCoder, address1),
             geocodeFuncs.getLatLng(geoCoder, address2)]
        )
        .then( function(latlngResults) {

            markers.push( googleMap.setMarker(map, latlngResults[0], "1") );
            markers.push( googleMap.setMarker(map, latlngResults[1], "2") );

            googleMap.fitToBounds( map, [latlngResults[0], latlngResults[1]] );

            // For tests to pick up on
            hiddenAddress1Element.innerHTML = JSON.stringify(latlngResults[0]);
            hiddenAddress2Element.innerHTML = JSON.stringify(latlngResults[1]);

            return geocodeFuncs.calculateMiddlePoint(geoCoder, latlngResults[0], latlngResults[1]);
        })
        .then( function(midpoint) {
            console.log("midpoint: " + JSON.stringify(midpoint));

            // For tests to pick up on
            hiddenMidpoint.innerHTML = JSON.stringify(midpoint);

            markers.push( googleMap.setMarker(map, midpoint, "M") );

            return places.nearbySearch(map, midpoint, getTypeOfPlace())
        })
        .then( function(places) {
            addPlaces(places, placesPanel, map, markers);
        })
        .catch(function(status) {
            alert(status);
        });
    });
}

function addPlaces(places, placesPanel, map, markers)
{
    let char = 'A';
    let resultHTML = "";
    for (const place of places)
    {
        resultHTML += `<div class="place">${char}: ${place.name}</div>`;

        let latlng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
        markers.push( googleMap.setMarker(map, latlng, char) );

        char = String.fromCharCode( char.charCodeAt(0) + 1 );
    }
    placesPanel.innerHTML = resultHTML;
    placesPanel.style.display = "block";
}

function getTypeOfPlace() {
    var cafe = document.getElementById('cafe');
    var restaurant = document.getElementById('restaurant');
    var bar = document.getElementById('bar');

    if (cafe.checked) {
        return 'cafe';
    } else if (restaurant.checked) {
        return 'restaurant';
    } else {
        return 'bar';
    }
}
