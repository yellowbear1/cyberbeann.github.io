let endPageContainer = document.querySelector("#end__container");
let ARCameraPageContainer = document.querySelector("#AR__container");
let welcomePageContainer = document.querySelector("#welcome__container");

function ARCamToEndPage() {
    console.log("this is getting called");
    ARCameraPageContainer.style.transform = "translateX(-90%)";
    ARCameraPageContainer.addEventListener("transitionend", ()=>{welcomePageContainer.style.display="none"})
    ARCameraPageContainer.style.display = "none";
  
    endPageContainer.style.transform = "translateX(0)";
    endPageContainer.style.display = "block"
  }

const jlgRoute = {
    distance:
    "0.37km",
    duration:
    "5 mins",
    difficulty:
    "Easy",
    ramps:
    [ 103.722419, 1.341494,
    103.722461, 1.341538,
    103.722772,1.34138,
    103.72252, 1.341208,
    103.722802,1.341264,
    103.723184,1.341054,
    103.723635,1.340998,
    ],
    coords:
    [ 103.72244,1.3414,
    103.72252,1.34133,
    103.72275,1.34117,
    103.72329,1.341,
    103.72342,1.34099,
    103.72364,1.34096,
    103.72364,1.34091,
    103.72363,1.34086,
    103.72362,1.34083,
    103.72361,1.3408,
    103.72369,1.34077,
    103.72378,1.34072,
    103.72396,1.34057,
    103.72405,1.34044,
    103.72412,1.3403,
    103.7242,1.34013,
    103.72427,1.34003,
    103.72437,1.34003,
    103.72439,1.34005,
    103.72439,1.34012,
    103.72438,1.34015,
    103.72438,1.34022,
    103.72439,1.34028,
    103.72439,1.34029]
};

var mylatlng = {lat:1.3521, lng:  103.8198};

var map, marker;

var commMarkerO, commMarkerD, flightPath;

let customRoute = document.querySelector("#route_name");
let origin = document.querySelector("#from");
let dest = document.querySelector("#to");

var mapOptions = {
    center: mylatlng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var places = [];
var ramps = [];
var rampPoints = [];

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

    if (customRoute.value == "none") {
        directionsService.route(request, (result,status) => {
            if (status == google.maps.DirectionsStatus.OK) {
                directionDisplay.setDirections(result);
                const arr = getCoordinates(result);
                ramps = [];
                places = arrToPlaces(arr);
                if (commMarkerD) {
                    commMarkerD.setMap(null);
                    commMarkerO.setMap(null);
                    flightPath.setMap(null);
                }
                document.getElementById("selectHead").innerHTML = "Distance: " + result.routes[0].legs[0].distance.text + "<br />Duration: " + result.routes[0].legs[0].duration.text;
            } else {
                directionDisplay.setDirections({routes: []});
                document.getElementById("selectHead").innerHTML = "Try selecting route again";

            }
        });
    }

    else if (customRoute.value == "jlg") {
        plotCommunityRoute(jlgRoute);
    }

    else if (customRoute.value == "jw") {
        directionsService.route(request, (result,status) => {
            if (status == google.maps.DirectionsStatus.OK) {
                directionDisplay.setDirections(result);
                const arr = getCoordinates(result);
                ramps = arrToPlaces(arr);
                places = [];
                if (commMarkerD) {
                    commMarkerD.setMap(null);
                    commMarkerO.setMap(null);
                    flightPath.setMap(null);
                }
                document.getElementById("selectHead").innerHTML = "Distance: " + result.routes[0].legs[0].distance.text + "<br />Duration: " + result.routes[0].legs[0].duration.text;
            } else {
                directionDisplay.setDirections({routes: []});
                document.getElementById("selectHead").innerHTML = "Try selecting route again";

            }
        });
    }
}

function plotCommunityRoute(route) {
    directionDisplay.setDirections({routes: []});
        plotRoute(route.coords);
        ramps = arrToPlaces(route.ramps);     
        plotRamps(ramps);  
        document.getElementById("selectHead").innerHTML = "Distance: " + route.distance + "<br />Duration: " + route.duration 
        + "<br />Difficulty: ";
        
        if (route.difficulty == "Easy") {
            document.getElementById("selectHead").innerHTML = document.getElementById("selectHead").innerHTML 
            + '<i class="fa-solid fa-face-smile"></i>';
        } else {
            document.getElementById("selectHead").innerHTML = document.getElementById("selectHead").innerHTML 
            + '<i class="fa-solid fa-face-frown"></i>';
        }
        

}


function zoomToObject(obj){
    var bounds = new google.maps.LatLngBounds();
    var points = obj.getPath().getArray();
    for (var n = 0; n < points.length ; n++){
        bounds.extend(points[n]);
    }
    map.fitBounds(bounds);
}

function plotRamps(places) {

    if (rampPoints.length == 0) {

    } else {
        rampPoints.forEach((point) => { 
            point.setMap(null);
        });
        rampPoints = [];
    }

    if (places.length == 0) {
        console.log("no ramps for plot");
        return
    }

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let pos = {
            lat: latitude,
            lng: longitude
        };

        let new_marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'Ramp',
            label: 'Ramp'
        });
        
        rampPoints.push(new_marker);
        console.log("ramp plot is working");
    });
}

function plotRoute(arr) {
    places = arrToPlaces(arr);
    console.log(places);
    const posO = {
        lat: places[places.length-1].location.lat,
        lng:  places[places.length-1].location.lng
      };
    commMarkerO = new google.maps.Marker({
        position: posO,
        map: map,
        title: 'Origin',
        label: 'A'
    });

    const posD = {
        lat: places[0].location.lat,
        lng:  places[0].location.lng
      };
    commMarkerD = new google.maps.Marker({
        position: posD,
        map: map,
        title: 'Destination',
        label: 'B'
    });

    const flightPlanCoordinates = arrToPolyline(arr);
    console.log(flightPlanCoordinates);
    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#0088FF',
       strokeWeight: 6,
       strokeOpacity: 0.6
      });

      flightPath.setMap(map);
      zoomToObject(flightPath);
}

function arrToPolyline(arr) {
    const arr2 = [];

    let count = 0;

    var temp = new Array();
    for (let i = 0; i < arr.length;i++) {
    
        if (count == 0) {
            temp.push(arr[i]);
            count += 1;
        } else if (count == 1) {
            temp.push(arr[i]);
            count += 1;
        }
        if (count == 2) {
            arr2.push(temp);
            count = 0;
            temp = [];
        }
    }

    const polyline = [];
    for (let i = 0; i < arr2.length; i++) {
        polyline.push({lat: arr2[i][1], lng: arr2[i][0]});
    }

    return polyline;
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
            return point;
        });
    }
}

function setCurrentLocation() {
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
            origin.value = point.toString().replace(/[()]/g, "");
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
                const dist =  Math.round(google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
                if (dist <= 10) {
                    document.getElementById("distance").innerHTML = "You have arrived!"
                    ARCamToEndPage();
                } else {
                    document.getElementById("distance").innerHTML = dist + "m";
                }
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

customRoute.onchange = function() {
    let d = customRoute.value;
    if (d === "none") {
      origin.disabled = false;
      dest.disabled = false;
      origin.value = "";
      dest.value = "";
      document.getElementById("set_curr_loc").disabled = false;
    } else if (d === "jlg") {
      origin.disabled = true;
      dest.disabled = true;
      origin.value = "Yuan Ching Rd Bus Stop";
      dest.value = "Clusia Cove";
      document.getElementById("set_curr_loc").disabled = true;
    } else if (d === "jw") {
      origin.disabled = true;
      dest.disabled = true;
      origin.value = "644659";
      dest.value = "Boon Lay MRT";
      document.getElementById("set_curr_loc").disabled = true;
    }
}






document.getElementById("currentLocation").addEventListener("click",() => { getCurrentLocation(); getUserLocation(map); });
document.getElementById("set_curr_loc").addEventListener("click", setCurrentLocation);
