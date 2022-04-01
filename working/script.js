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
    103.70382,1.33654,
                      103.72244,1.3414,
          103.72245,1.34138,
          103.72252,1.34133,
          103.72267,1.34123,
          103.72275,1.34117,
          103.72318,1.34102,
          103.72329,1.341,
          103.72342,1.34099,
          103.72364,1.34096,
          103.72364,1.34091,
          103.72364,1.34089,
          103.72363,1.34086,
          103.72362,1.34083,
          103.72361,1.3408,
          103.72369,1.34077,
          103.72378,1.34072,
          103.72388,1.34065,
          103.72396,1.34057,
          103.72405,1.34044,
          103.72412,1.3403,
          103.7242,1.34013,
          103.72427,1.34003,
          103.72432,1.33999,
          103.72437,1.34003,
          103.72439,1.34005,
          103.7244,1.34006,
          103.72439,1.34012,
          103.72438,1.34015,
          103.72438,1.34022,
          103.72439,1.34028,
          103.72439,1.34029,
          103.7244,1.3403,
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
        places.push({name: 'chevrons', location: {lat: arr2[i][1], lng: arr2[i][0],}});
    }

    
   return places;
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

     let end = document.createElement('a-entity');
    end.setAttribute('id', '-1');
    end.setAttribute('gps-entity-place', `latitude: 1.33637; longitude: 103.70246;`);
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

       scene.appendChild(model);
   });
}
