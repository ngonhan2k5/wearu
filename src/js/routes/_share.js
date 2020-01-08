import { circular } from 'ol/geom/Polygon';
import {utils} from '../map'
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { LineString } from 'ol/geom';
import { Style, Stroke } from 'ol/style';

import direction from '../part/direction'

console.log('SHARE')

export default {
    locRequire:false,
    onInit:(output) => {
        var {map, coords, source, layer2, params, accuracy} = output
        console.log(params)
        if (params && params.lon && params.lat){
            var lon = params.lon % 180,
                lat = params.lat % 90
            // Draw location from url lon lat
            var fea = new Feature(new Point(fromLonLat([lon, lat])))
            fea.setId('share')
            source.addFeature(fea)
            // var locs = fromLonLat([params.lon, params.lat])
            console.log(2222, fea)
        
            // var source = map.utils.layer.getSource()
            //console.log(locs[0].get("data"))
            // source.addFeatures(locs)
            // var ext = source.getExtent()

            utils.render(
                ()=>{
                    map.addLayer(layer2);
                    
                    // map.getView().fit(acc.getGeometry(), {
                    // setTimeout(()=>{
                    //     map.getView().fit(fea.getGeometry(), {
                    //         maxZoom: 18,
                    //         duration: 2000
                    //     });
                    // }, 1000)
                    

                    utils.drawMyLocation(map, source, coords, accuracy)
                    // drawConnectLine(source)

                    drawRoute(source, [lon, lat], coords)

                    utils.drawLocateMeButton(source, function(source){
                        return function(){
                            if (!source.isEmpty() && source.getFeatureById("share")) {
                                var ms = map.getSize()
                                var h = ms[1]*5/100, w = ms[0]*5/100
                                // map.getView().fit(source.getFeatureById("share").getGeometry(), {
                                map.getView().fit(source.getExtent(), {
                                    padding:[h,w,h,w],
                                    maxZoom: 18,
                                    duration: 2000
                                });
                            }
                        }
                    
                    }, 'Locate Shared')
                }
            )
            return true
        }
        return false
    },
    onLocationChange: (map, coords, accuracy, source) => {
        console.log('onPosChange', coords, accuracy, source)
  
        utils.updateMyLocation(map, source, coords, accuracy)
        updateConnectLine(source)

    }

}

function drawConnectLine(source){
    var from = source.getFeatureById("share") && source.getFeatureById("share").getGeometry().getFirstCoordinate()
    var to = source.getFeatureById("mePoint") &&  source.getFeatureById("mePoint").getGeometry().getFirstCoordinate()
    console.log("draw", from, to)
    // return
    if (from && to){
        var line = new Feature(new LineString([from, to]))
        line.setStyle(
            new Style({stroke: new Stroke({
                    color: 'green',
                    width: 1
                })
            })
        )
        line.setId("connect")
        source.addFeature(line)
    }
}

function drawRoute(source, start, end){
    console.log("drawRoute", start, end)
    direction(source, start, end)
}


function updateConnectLine(source){
    var from = source.getFeatureById("share") && source.getFeatureById("share").getGeometry().getFirstCoordinate()
    var to = source.getFeatureById("mePoint") && source.getFeatureById("mePoint").getGeometry().getFirstCoordinate()
    if (from && to){
        var line = source.getFeatureById("connect")
        if (line){
            line.setGeometry(new LineString([from, to]))
        }
    }
}