window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'chevrons',
           location: {
               lat: 1.3367423,
               lng: 103.7022156,
           }
       },

       {
        name: 'chevrons',
        location: {
            lat: 1.3366947,
            lng: 103.70221743,
        }
    } ,

    {
        name: 'chevrons',
        location: {
            lat: 1.3367225,
            lng: 103.7023373,
        }
    },

    {
        name: 'chevrons',
        location: {
            lat: 1.3367880,
            lng: 103.7031400,
        }
    }



   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', './assets/chevrons/scene.gltf');
       model.setAttribute('rotation', '0 180 0');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '0.5 0.5 0.5');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}
