import GeoJSON from 'ol/format/GeoJSON';

// var geojsonObject = require('./../../../data/exp.json')
// console.log(999, geojsonObject)
// var features = (new GeoJSON()).readFeatures(geojsonObject)


//   var vectorLayer = new VectorLayer({
//     source: vectorSource,
//     style: styleFunction
//   });

//
const axios = require('axios');



export default (source, start, end) => {

  console.log("From-to", start, end)
  axios({
    method: 'GET',
    //url: 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248596e8844ef134d46ab2ae2012d10a5e5&start=8.681495,49.41461&end=8.687872,49.420318',
    url: 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248596e8844ef134d46ab2ae2012d10a5e5&start='+
    +start[0]+','+start[1]+'&end='+end[0]+','+end[1],
    headers: {
      'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
    }
  }).then( function (response) {
    console.log('Status:', response.status);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', response.data);
    var features = (new GeoJSON()).readFeatures(response.data)
    features[0].getGeometry().transform('EPSG:4326', 'EPSG:3857');
    source.addFeatures(features)
  }).catch(function(error){
    console.log(JSON.stringify(error.response.data))
  })
  
}