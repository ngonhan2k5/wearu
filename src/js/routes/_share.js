import { circular } from 'ol/geom/Polygon';
import {utils} from '../map'
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';


console.log('SHARE')

export default {
    locRequire:false,
    onInit:(output) => {
        var {map, coords, source, layer2, params, accuracy} = output
        console.log(params)
        if (params && params.lon && params.lat){
            var fea = new Feature(new Point(fromLonLat([params.lon, params.lat])))
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
                    utils.drawLocationMe(source, function(source){
                        return function(){
                            if (!source.isEmpty() && source.getFeatureById("share")) {
                                map.getView().fit(source.getFeatureById("share").getGeometry(), {
                                    maxZoom: 18,
                                    duration: 2000
                                });
                            }
                        }
                    
                    }, 'Locate Shared')

                    utils.drawLocationWithAcuracy(map, source, coords, accuracy)
                }
            )
            return true
        }
        return false
    },
    onPosChange: (map, coords, accuracy, source) => {
        console.log('onPosChange', coords, accuracy, source)
  
        const acc = circular(coords, accuracy);

        utils.changeMyLocation(map, source, coords, accuracy)

        
    }

}