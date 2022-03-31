window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

    function staticLoadPlaces() {
    const arr1 =   [
           103.70143,1.3367
          103.70143,1.33686,
          103.70143,1.33694,
          103.70143,1.33703,
          103.70144,1.33709,
          103.70144,1.3371,
          103.70144,1.3372,
          103.70144,1.33728,
          103.70144,1.33736,
          103.70145,1.33746,
          103.70126,1.33748,
          103.70117,1.33749,
          103.70103,1.33749,
          103.70095,1.33749,
          103.70062,1.33749,
          103.70049,1.33745,
          103.70033,1.33745,
          103.70023,1.33747,
          103.70012,1.33746,
          103.70002,1.33748,
          103.6999,1.33744,
          103.69927,1.3374,
          103.69907,1.3374,
          103.69895,1.3374,
          103.69888,1.33742,
          103.69887,1.33742,
          103.69872,1.33744,
          103.69853,1.33744,
          103.69846,1.33744,
          103.69747,1.33745,
          103.69717,1.33744,
          103.69709,1.33744,
          103.69676,1.33745,
          103.69663,1.33744,
          103.69642,1.33744,
          103.69631,1.33746,
          103.69626,1.33746,
          103.69615,1.33747,
          103.69602,1.33746,
          103.69586,1.33742,
          103.69586,1.33749,
          103.6956,1.33747,
          103.69558,1.33747,
          103.69551,1.33748,
          103.69548,1.33749,
          103.69544,1.3375,
          103.69537,1.33752,
          103.69533,1.33754,
          103.69528,1.33753,
          103.69519,1.33752,
          103.69511,1.3375,
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
        places.push({name: i, location: {lat: arr2[i][1], lng: arr2[i][0],}});
    }

    
   return places;
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');
   
   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;
       let id = place.name;

       let model = document.createElement('a-entity');
       
       model.setAttribute('id', id.toString());
       model.setAttribute('look-at', (id+1).toString());
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
