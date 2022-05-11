window.parent.document.getElementById("goCamera").addEventListener("click", () => loadRoute());

function loadRoute() {
    var arr = window.parent.window.places;
    var ramps = window.parent.window.ramps;
    renderPlaces(arr);
    renderRamps(ramps);
}

function renderRamps(places) {
    if (places.length == 0) {
        console.log("no ramps");
        return
    }
    let scene = document.querySelector('a-scene');
    
    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
    
        let model = document.createElement('a-image');
        

        model.setAttribute('look-at', "[gps-camera]");
        model.setAttribute('scale', '1 1 1');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('src', './assets/nearest_ramp_g.png');
        
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}



function renderPlaces(places) {
    if (places.length == 0) {
        console.log("no places");
        return
    }

    let scene = document.querySelector('a-scene');
     
     let end = document.createElement('a-entity');
     let end_lat = places[0].location.lat;
     let end_lng = places[0].location.lng;

     end.setAttribute('id', '-1');
     end.setAttribute('gps-entity-place', `latitude: ${end_lat}; longitude: ${end_lng};`);
     end.setAttribute('gltf-model', './assets/map_pointer_3d_icon/scene.gltf');
     end.setAttribute('scale', '0.5 0.5 0.5');
     end.setAttribute('position', '1 2 3');
     end.setAttribute('position', 'absolute');
     
     var pos = end.object3D.position;
     scene.appendChild(end);
    

    places.shift();


     if (places.length == 0) {
        console.log("no places");
        return
    }

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let id = place.name;
 
        let model = document.createElement('a-entity');
        
        model.setAttribute('id', id.toString());
        model.setAttribute('look-at', pos);
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', './assets/red_arrow_chevrons_wayfinding/scene.gltf');
        model.setAttribute('scale', '0.02 0.02 0.02');
        model.setAttribute('position', '1 2 3');
        model.setAttribute('position', 'absolute');
        model.setAttribute('rotation', '90 270 0');
 
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });
        
        pos = model.object3D.position;
 
        scene.appendChild(model);
        
    });
}
