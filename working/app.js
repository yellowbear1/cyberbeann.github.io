var mylatlng = {lat:1.3521, lng:  103.8198};

var map, marker;

var mapOptions = {
    center: mylatlng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var places = [];

map = new google.maps.Map(document.getElementById("map"), mapOptions);

var directionsService = new google.maps.DirectionsService();

var directionDisplay = new google.maps.DirectionsRenderer();

directionDisplay.setMap(map);

document.getElementById("click").addEventListener("click",() => calcRoute());

function getCoordinates(result) {
    var currentRouteArray = result.routes[0];  //Returns a complex object containing the results of the current route
    var currentRoute = currentRouteArray.overview_path; //Returns a simplified version of all the coordinates on the path
    const arr = [];

    obj_newPolyline = new google.maps.Polyline({ map: map }); //a polyline just to verify my code is fetching the coordinates
    var path = obj_newPolyline.getPath();
    for (var x = 0; x < currentRoute.length; x++) {
        arr.push(currentRoute[x].lng());
        arr.push(currentRoute[x].lat());
    }
    return arr;
}

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
            const arr = getCoordinates(result);
            places = arrToPlaces(arr);
            console.log(places);
        } else {
            directionDisplay.setDirections({routes: []});

        }
    });
}

function arrToPlaces(arr1) {
    const arr2 = [];

    let count = 0;

    var temp = new Array();
    for (let i = 0; i < arr1.length;i++) {
    
        if (count == 0) {
            temp.push(arr1[i]);
            count += 1;
        } else if (count == 1) {
            temp.push(arr1[i]);
            count += 1;
        }
        if (count == 2) {
            arr2.push(temp);
            count = 0;
            temp = [];
        }
    }


    const places = [];

    for (let i = 0; i < arr2.length; i++) {
        places.push({name: i, location: {lat: arr2[i][1], lng: arr2[i][0],}});
    }

   places.reverse();    
   return places;
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2);

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Your position'
            });
            map.setCenter(pos);
        },
        () => {
            console.log("errored");
        });
}

function getUserLocation(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var point = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            if (typeof getUserLocation.user_marker == 'undefined') {
                marker = new google.maps.Marker({
                    position:point,
                    map:map,
                    title: 'update'
                });
                getUserLocation.user_marker = marker;
                getUserLocation.user_marker_window = new google.maps.InfoWindow({
                    content:'You'
                });

                google.maps.event.addListener(getUserLocation.user_marker, 'click', function () {
                    getUserLocation.user_marker_window.open(getUserLocation.user_marker);
                });
            }
            getUserLocation.user_marker.setPosition(point);
        });
    }
}

function calculateDist() {
    if (places.length == 0) {

    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var p1 = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
                var p2 = new google.maps.LatLng(places[0].location.lat, places[0].location.lng);
                document.getElementById("distance").innerHTML = Math.round(google.maps.geometry.spherical.computeDistanceBetween(p1, p2)) + "m";
                console.log(google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
            });
        }
    }
}


if (navigator.geolocation) {
    calculateDist();
    getUserLocation(map);
    setInterval(function () {
        getUserLocation(map);
        calculateDist();
    }, 5000);
}



document.getElementById("currentLocation").addEventListener("click",() => getCurrentLocation());

