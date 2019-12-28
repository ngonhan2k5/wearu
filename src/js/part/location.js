import 'ol/ol.css';
import {Map, View} from 'ol/index';
import {Point} from 'ol/geom';
import Feature from 'ol/Feature';
// import TileLayer from 'ol/layer/Tile';
// import Stamen from 'ol/source/Stamen';
import {Circle, Fill, Style} from 'ol/style';
import {getVectorContext} from 'ol/render';
import {fromLonLat} from 'ol/proj';
import {upAndDown} from 'ol/easing';

import test from "../../server/db/test"

// var image = new Circle({
//     radius: 8,
//     fill: new Fill({color: 'rgb(255, 153, 0)'})
//   });
  
// var style = new Style({
//     image: image
// });
// var geoMarkerStyle = new Style({
//     image: new CircleStyle({
//       radius: 7,
//       fill: new Fill({color: 'black'}),
//       stroke: new Stroke({
//         color: 'white', width: 2
//       })
//     })
//   })

export default  (coords)=>{

    if (test.geometries.length == 0)
        test.geometries = test.genTestNear(10, coords)
    // layer.on('postrender', function(event) {
    //     var vectorContext = getVectorContext(event);
    
    //     for (var i = 0; i < n; ++i) {
    //     var importance = upAndDown(Math.pow((n - i) / n, 0.15));
    //     if (importance < 0.1) {
    //         continue;
    //     }
    //     image.setOpacity(importance);
    //     image.setScale(importance);
    //     vectorContext.setStyle(style);
    //     vectorContext.drawGeometry(geometries[i]);
    //     }
    
    //     var lon = 360 * Math.random() - 180;
    //     var lat = 180 * Math.random() - 90;
    //     geometries.push(new Point([lon, lat]));
    //     geometries.shift();
    //     map.render();
    // });
    return {
        change: () => {
            var features = test.changeTest();
            var ret = [];
            for (var i=0; i< features.length; i++){
                var p = features[i];
                var feature = new Feature({ geometry: new Point(fromLonLat([p.lon, p.lat]))});
                // vectorContext.drawFeature(feature, image);
                feature.set('data', p)
                ret.push(feature)
            }
            return ret
        }
    }
//   window.setInterval(updateFeatures, 1000);
}

