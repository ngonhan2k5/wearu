import 'ol/ol.css';
import {Map, View} from 'ol';

// import TileLayer from 'ol/layer/Tile';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';

import XYZSource from 'ol/source/XYZ';
// import OSMSource from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';

// current location
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
// import the feature and geometry components we need for visualizing the GPS location
import Feature from 'ol/Feature';
import {circular} from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
// 
import Control from 'ol/control/Control';

var key ='1Ngcfai0rnKxUgMDfd8O';
var attributions = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

var map = new Map({
  target: 'map-container',
  // layers: [
  //   // new TileLayer({
  //   //   source: new OSMSource()
  //   //   // source: new XYZSource({
  //   //   //   url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
  //   //   // })
  //   // })
  //   //https://api.maptiler.com/tiles/v3/1/0/0.pbf?key=1Ngcfai0rnKxUgMDfd8O
  //   // new TileLayer({
  //   //   source: new XYZSource({
  //   //     attributions: attributions,
  //   //     //url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}@2x.png?key=' + key,
  //   //     url: 'https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=' + key,
  //   //     tileSize: 512,
  //   //     maxZoom: 22
  //   //   })
  //   // })
  // ],
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2
  })
});
var styleJson = 'https://api.maptiler.com/maps/streets/style.json?key=1Ngcfai0rnKxUgMDfd8O';
// https://api.maptiler.com/tiles/landcover/8/202/120.pbf?key=1Ngcfai0rnKxUgMDfd8O
const layer = new VectorTileLayer({
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: `https://api.maptiler.com/tiles/landcover/{z}/{x}/{y}.pbf.pict?key=${key}`,
    maxZoom: 14
  })
});
// map.addLayer(layer);

const source = new VectorSource();
const layer2 = new VectorLayer({
  source: source
});
map.addLayer(layer2);

import {apply} from 'ol-mapbox-style';

apply(map, styleJson);

navigator.geolocation.watchPosition(function(pos) {
  const coords = [pos.coords.longitude, pos.coords.latitude];
  const accuracy = circular(coords, pos.coords.accuracy);
  source.clear(true);
  source.addFeatures([
    new Feature(accuracy.transform('EPSG:4326', map.getView().getProjection())),
    new Feature(new Point(fromLonLat(coords)))
  ]);
}, function(error) {
  alert(`ERROR: ${error.message}`);
}, {
  enableHighAccuracy: true
});


const locate = document.createElement('div');
locate.className = 'ol-control ol-unselectable locate asaaaa';
locate.innerHTML = '<button title="Locate me">◎</button>';
locate.addEventListener('click', function() {
  if (!source.isEmpty()) {
    map.getView().fit(source.getExtent(), {
      maxZoom: 18,
      duration: 500
    });
  }
});
map.addControl(new Control({
  element: locate
}));