window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'chevrons',
           location: {
               lat: 1.3365811, 
               lng: 103.7022626,
           }
       },
       {
           name: 'chevrons',
           location: {
               lat: 1.336784, 
               lng: 103.703321,
           }
       },

       {
        name: 'chevrons',
        location: {
            lat: 1.336725, 
            lng: 103.703227,
        }
    } ,

    {
        name: 'chevrons',
        location: {
            lat: 1.336734,
            lng: 103.702891,
        }
    },

    {
        name: 'chevrons',
        location: {
            lat: 1.336743, 
            lng: 103.702785,
        }
    },
      

  {
        name: 'chevrons',
        location: {
            lat: 1.336690, 
            lng: 103.702520,
        }
    },
       
        {
        name: 'chevrons',
        location: {
            lat: 1.3370507,
            lng: 103.7037153,
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
       //model.setAttribute('rotation', '0 180 0');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '0.5 0.5 0.5');
       model.setAttribute('position', '-3 0.59 -3');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}
