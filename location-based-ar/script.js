window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

    function staticLoadPlaces() {
    const arr1 =   [103.70246,1.33637,
    103.7026,1.33637,
    103.70275,1.33637,
    103.70282,1.33633,
    103.70331,1.33633,
    103.70338,1.33633,
    103.70343,1.33634,
    103.70347,1.33635,
    103.70357,1.33639,
    103.70359,1.33641,
    103.70363,1.33647,
    103.70366,1.33651,
    103.70369,1.33653,
    103.70371,1.33654,
    103.70375,1.33654,
    103.70382,1.33654
    ];

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
        places.push({name: 'Chevron', location: {lat: arr2[i][0], lng: arr2[i][1],}});
    }

    
   return places;
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', './assets/chevrons/scene.gltf');
       model.setAttribute('scale', '0.5 0.5 0.5');
       model.setAttribute('position', '1 2 3');
       model.setAttribute('position', 'absolute');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}
