import location from '../part/location'
import Polygon, { circular } from 'ol/geom/Polygon';
import {utils} from '../map'

console.log('sim1')

export default {
    onInit:(output) => {
        var {map, coords, source, layer2, accuracy} = output
        // console.log(params)
        
        var locs = location(coords).change()
        console.log(locs)
        // var source = map.utils.layer.getSource()
        //console.log(locs[0].get("data"))
        source.addFeatures(locs)
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
                
                utils.drawLocationWithAcuracy(map, source, coords, accuracy)
            }
        )

        return true
    },
    onPosChange: (map, coords, accuracy, source) => {
        console.log(coords, accuracy, source)
     
        const acc = circular(coords, accuracy);

        utils.changeMyLocation(map, source, coords, accuracy)
        
    }

}