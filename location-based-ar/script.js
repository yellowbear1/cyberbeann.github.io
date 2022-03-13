window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'chevrons',
           location: {
               lat: 1.336685, 
               lng: 103.702723,
           }
       },

       {
        name: 'chevrons',
        location: {
            lat: 1.336747, 
            lng: 103.703091,
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
            lat: 1.336854, 
            lng: 103.703408,
        }
    },
      

  {
        name: 'chevrons',
        location: {
            lat: 1.336905, 
            lng: 103.703711,
        }
    },
       
        {
        name: 'chevrons',
        location: {
            lat: 1.336255,
            lng: 103.702904,
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
