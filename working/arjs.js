window.parent.document.getElementById("goCamera").addEventListener("click", () => loadRoute());

function loadRoute() {
    var arr = window.parent.window.places;
    renderPlaces(arr);
    console.log("working");
}



function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
     
     let end = document.createElement('a-entity');
     let end_lat = places[0].location.lat;
     let end_lng = places[0].location.lng;

     end.setAttribute('id', '-1');
     end.setAttribute('gps-entity-place', `latitude: ${end_lat}; longitude: ${end_lng};`);
     end.setAttribute('gltf-model', './assets/map_pointer_3d_icon/scene.gltf');
     end.setAttribute('scale', '1 1 1');
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
        model.setAttribute('gltf-model', './assets/red_arrow_chevrons_wayfinding/scene.gltf');
        model.setAttribute('scale', '0.05 0.05 0.05');
        model.setAttribute('position', '1 2 3');
        model.setAttribute('position', 'absolute');
 
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });
        
        pos = model.object3D.position;
 
        scene.appendChild(model);
        console.log("seems to be working");
    });
}
