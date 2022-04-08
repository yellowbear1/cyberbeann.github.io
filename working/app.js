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
            const places = arrToPlaces(arr);
            console.log(places);
            renderPlaces(places);
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

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
     
     let end = document.createElement('a-entity');
     let end_lat = places[0].location.lat;
     let end_lng = places[0].location.lng;

     end.setAttribute('id', '-1');
     end.setAttribute('gps-entity-place', `latitude: ${end_lat}; longitude: ${end_lng};`);
     end.setAttribute('gltf-model', './assets/chevrons/scene.gltf');
     end.setAttribute('scale', '2 2 2');
     end.setAttribute('position', '1 2 3');
     end.setAttribute('position', 'absolute');
     
     var pos = end.object3D.position;
     scene.appendChild(end);
    
    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let id = place.name;
 
        let model = document.createElement('a-entity');
        
        model.setAttribute('id', id.toString());
        model.setAttribute('look-at', pos);
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', './assets/chevrons/scene.gltf');
        model.setAttribute('scale', '2 2 2');
        model.setAttribute('position', '1 2 3');
        model.setAttribute('position', 'absolute');
 
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });
        
        pos = model.object3D.position;
        console.log("seems to be working");
        scene.appendChild(model);
    });
}
