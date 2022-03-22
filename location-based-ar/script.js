window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'chevrons',
           location: {
               lat: 1.3413229, 
               lng: 103.7224207,
           }
       },
       {
           name: 'chevrons',
           location: {
               lat: 1.3413018, 
               lng: 103.7225642,
           }
       },

       {
        name: 'chevrons',
        location: {
            lat: 1.3411785, 
            lng: 103.7227473,
        }
    } ,

    {
        name: 'chevrons',
        location: {
            lat: 1.3410330,
            lng: 103.7230118,
        }
    },

    {
        name: 'chevrons',
        location: {
            lat: 1.3410049, 
            lng: 103.7231848,
        }
    },
      

  {
        name: 'chevrons',
        location: {
            lat: 1.3408497, 
            lng: 103.7233920,
        }
    },
       
        {
        name: 'chevrons',
        location: {
            lat: 1.3398810,
            lng: 103.7211118,
        },
{
        name: 'chevrons',
        location: {
            lat: 1.341220,
            lng: 103.722782,
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
       //model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '0.5 0.5 0.5');
       //model.setAttribute('position', '1 2 3');
       //model.setAttribute('position', 'absolute');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}
