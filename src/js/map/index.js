import 'ol/ol.css';
import { Map, View, Overlay } from 'ol';

// import TileLayer from 'ol/layer/Tile';
// import MVT from 'ol/format/MVT';
// import VectorTileLayer from 'ol/layer/VectorTile';
// import VectorTileSource from 'ol/source/VectorTile';

// import XYZSource from 'ol/source/XYZ';
// import OSMSource from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';

// current location
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
// import the feature and geometry components we need for visualizing the GPS location
import Feature from 'ol/Feature';
import Polygon, { circular } from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
// 
import Control from 'ol/control/Control';

import { Circle, Fill, Style, Stroke } from 'ol/style';
import olms from 'ol-mapbox-style';

import location from '../part/location'

// import {useGeographic} from 'ol/proj';
// import orient from '../part/orient'

var key = '1Ngcfai0rnKxUgMDfd8O';
var attributions = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
var styleJson = 'https://api.maptiler.com/maps/topo/style.json?key=1Ngcfai0rnKxUgMDfd8O';
// var styleJson = 'http://localhost:5001/static/style.json?key=1Ngcfai0rnKxUgMDfd8O';
//var styleJson = '/static/style.json?key=1Ngcfai0rnKxUgMDfd8O';
const defaultAction = {
    locRequire: false,
    onInit: (output) => {
        var {map, source, layer2} = output
        // console.log(params)
        
        // var locs = location(coords).change()
        // console.log(locs)
        // // var source = map.utils.layer.getSource()
        // //console.log(locs[0].get("data"))
        // source.addFeatures(locs)
        var ext = source.getExtent()

        utils.render(
            ()=>{
                map.addLayer(layer2);
                
                // map.getView().fit(acc.getGeometry(), {
                setTimeout(()=>{
                    map.getView().fit(ext, {
                    maxZoom: 18,
                    duration: 2000
                    });
                }, 1000)
                
            }
        )

        return true
        // return false
    },
    onLocationChange: (map, coords, accuracy, source) => {
        console.log(coords, accuracy, source)
        //import location from './location'
        
        const acc = circular(coords, accuracy);
        
        // map.getView().setCenter(fromLonLat(coords))
        // source.clear(true);
        
        utils.drawMyLocation(map, source, coords, acc)
        
    }
}


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


const init = (opts, params) => {
    var option = Object.assign(defaultAction, opts)
    console.log(111,option)
    
    //var styleJson = 'https://api.maptiler.com/maps/streets/style.json?key=1Ngcfai0rnKxUgMDfd8O';
    
    // https://api.maptiler.com/tiles/landcover/8/202/120.pbf?key=1Ngcfai0rnKxUgMDfd8O
    // const layer = new VectorTileLayer({
    //   source: new VectorTileSource({
    //     attributions: [
    //       '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
    //       '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    //     ],
    //     format: new MVT(),
    //     url: `https://api.maptiler.com/tiles/landcover/{z}/{x}/{y}.pbf.pict?key=${key}`,
    //     maxZoom: 14
    //   })
    // });

    

    // useGeographic();

    var image = new Circle({
        radius: 5,
        fill: new Fill({ color: 'rgba(255, 153, 0, 0.4)' }),
        stroke: new Stroke({ color: 'rgb(255, 153, 0)', width: 1.25 })
    });

    var style = new Style({
        image: image,
        stroke: new Stroke({
            color: 'blue',
            width: 3
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })

    });
    // map.addLayer(layer);
    const source = new VectorSource();
    const layer2 = new VectorLayer({
        source: source,
        style: style
    });

    //console.log(layer2)
     
    
    var first = true
    // var locs
    console.log("Map")
    navigator.geolocation.watchPosition(
        (pos) => {
            const coords = [pos.coords.longitude, pos.coords.latitude];
            option.onLocationChange(map,coords, pos.coords.accuracy, source)

            if (first){
                option.onInit({map, coords, accuracy:pos.coords.accuracy, source, layer2, params}) || utils.render(function(){map.addLayer(layer2);})
                first = false
            }

        },
        function (error) {
            if(option.locRequire) 
                alert(`ERROR: ${error.message}`)
            else{
                console.log('bypass location service')
                option.onInit({map, coords:null, accuracy:0, source, layer2, params}) || utils.render(function(){map.addLayer(layer2);})             
            }

        }, {
            enableHighAccuracy: true
        }
    );

    var element = document.getElementById('popup');

    var popup = new Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10]
    });
    map.addOverlay(popup);

    function formatCoordinate(coordinate, data) {
        return ("\n    <table>\n <tbody>\n   <tr><td colspan=\"2\">" + (data && data.name) + "</td></tr>\n     <tr><th>lon</th><td>" + (coordinate[0].toFixed(2)) + "</td></tr>\n        <tr><th>lat</th><td>" + (coordinate[1].toFixed(2)) + "</td></tr>\n      </tbody>\n    </table>");
    }

    // var info = document.getElementById('info');
    // map.on('moveend', function() {
    //   var view = map.getView();
    //   var center = view.getCenter();
    //   info.innerHTML = formatCoordinate(center);
    // });

    map.on('click', function (event) {
        var feature = map.getFeaturesAtPixel(event.pixel) && map.getFeaturesAtPixel(event.pixel)[0];
        if (feature && feature.getGeometry() && feature.getGeometry().getCoordinates) {
            var coordinate = feature.getGeometry().getCoordinates();
            console.log(feature.get("data"))
            popup.setPosition(coordinate);
            var con = formatCoordinate(toLonLat(coordinate), feature.get("data"))
            //  $(element).popover('destroy');
            // console.log(con)
            map.getView().fit(map.getFeaturesAtPixel(event.pixel)[0].getGeometry(), {
                maxZoom: 18,
                duration: 500
            });
            $(element).popover({
                placement: 'top',
                html: true,
                content: con
            });

            $(element).popover('show');
            document.querySelector(".popover-content").innerHTML = con
            // $(element).popover('destroy');
            //popover-content


        } else {
            $(element).popover('destroy');
        }
    });


    /*map.on('pointermove', function(event) {
      if (map.hasFeatureAtPixel(event.pixel)) {
        map.getViewport().style.cursor = 'pointer';
      } else {
        map.getViewport().style.cursor = 'inherit';
      }
    });
    */

    // if (typeof onInit == "function"){
    //     utils.init(onInit, onPositionChange)
    // }else{
    //     utils.init()
    // }
    // map.utils = {}
    // map.utils.layer = layer2

    // map.utils.init(function(){

    //     utils.render(function(){
    //         map.addLayer(layer2);
    //         map.utils.layer = layer2
    //     })
    // })
    // option.onInit()
    return map
}

export default init 
// var info = document.getElementById('info');

// orient(
//   function(heading, accurate){
//   console.log(heading, accurate)
//   info.innerText = JSON.stringify({heading, accurate}, null, 2);
//   info.style.opacity = 1;
// }
// )


export const utils = {
    updateMyLocation: function(map, source, coords, accuracy){
        if (coords==null) return
        
        const acc = source.getFeatureById("meAcc"),
            point = source.getFeatureById("mePoint")
        if (acc && point){
            // acc.getGeometry().setCoordinates((coords));
            // point.getGeometry().setCoordinates((coords));
            const accura = circular(coords, accuracy)
            acc.setGeometry(accura.transform('EPSG:4326', map.getView().getProjection()));
            point.setGeometry(new Point(fromLonLat(coords)) )
        }
    },
    drawMyLocation : function (map, source, coords, accuracy){
        if (coords==null) return
        const accura = circular(coords, accuracy)
        const acc = new Feature(accura.transform('EPSG:4326', map.getView().getProjection())),
            point = new Feature(new Point(fromLonLat(coords)))
        
        acc.setId("meAcc")
        point.setId("mePoint")
        //console.log(acc)
        source.addFeatures([
            acc,
            point
        ]);
    },

    drawSimPos: function (map, source, coords, callback){
       
        locs = location(coords).change()
        //console.log(locs[0].get("data"))
        source.addFeatures(locs)
        var ext = source.getExtent()

        render(
            () => {
                map.addLayer(layer2);

                // map.getView().fit(acc.getGeometry(), {
                setTimeout(() => {
                    map.getView().fit(ext, {
                        maxZoom: 18,
                        duration: 2000
                    });
                }, 1000)

            }
        )
       
        console.log("SIM")

    },
    render : function ( callback) {
        olms(map, styleJson).then(
            callback
        )
    },
    drawLocateMeButton: (source, onClick, label="Locate me")=> {
        const locate = document.createElement('div');
        locate.className = 'ol-control ol-unselectable locate asaaaa';
        locate.innerHTML = '<button title="'+label+'">◎</button>';
        var onClick = typeof onClick == "function" ? onClick(source): function () {
            if (!source.isEmpty() && source.getFeatureById("meAcc")) {
                map.getView().fit(source.getFeatureById("meAcc").getGeometry(), {
                    maxZoom: 18,
                    duration: 500
                });
            }
        }
        locate.addEventListener('click', onClick);
        map.addControl(new Control({
            element: locate
        }));
    }
}
