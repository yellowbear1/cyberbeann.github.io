var mylatlng = {lat:1.3521, lng:  103.8198};
var mapOptions = {
    center: mylatlng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var directionsService = new google.maps.DirectionsService();

var directionDisplay = new google.maps.DirectionsRenderer();

directionDisplay.setMap(map);

document.getElementById("click").addEventListener("click",() => calcRoute());

function calcRoute() {
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    directionsService.route(request, (result,status) => {
        if (status == google.maps.DirectionsStatus.OK) {
            directionDisplay.setDirections(result);
        } else {
            directionDisplay.setDirections({routes: []});


        }
    });
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2);

