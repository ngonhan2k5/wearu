import UrlPattern from 'url-pattern'

import location from '../part/location'
import Polygon, { circular } from 'ol/geom/Polygon';
import {utils} from '../map'
import { fromLonLat, toLonLat } from 'ol/proj';
import Control from 'ol/control/Control';

console.log('root')
var pattern = new UrlPattern('/:action(/:lon/:lat)', {segmentValueCharset:'a-zA-Z0-9.'});

export default {
    onInit:(output) => {
        var {map, coords, source, layer2} = output
        // console.log(params)
        
        // var locs = location(coords).change()
        // console.log(locs)
        // var source = map.utils.layer.getSource()
        //console.log(locs[0].get("data"))
        // source.addFeatures(locs)
        // var ext = source.getExtent()

        utils.render(
            ()=>{
                map.addLayer(layer2);
                
                // map.getView().fit(acc.getGeometry(), {
                // setTimeout(()=>{
                //     map.getView().fit(ext, {
                //     maxZoom: 18,
                //     duration: 2000
                //     });
                // }, 1000)
                
            }
        )

        addShareButton(map, function(){
            console.log(pattern.stringify({action: "share", lon: 10, lat: 20}))
            // location = pattern.stringify({action: "share", lon: 10, lat: 20})
            if (navigator.share) {
                navigator.share({
                  title: document.title,
                  text: "Hello World",
                  url: pattern.stringify({action: "share", lon: 10, lat: 20})
                }).then(() => console.log('Successful share'))
                .catch(error => console.log('Error sharing:', error));
              }
        })

        return true
    },
    onPosChange: (map, coords, accuracy, source) => {
        console.log(coords, accuracy, source)
        //import location from './location'

        
        const acc = circular(coords, accuracy);

        
        // map.getView().setCenter(fromLonLat(coords))
        // source.clear(true);
        
        utils.drawLocationWithAcuracy(map, source, coords, acc)
        
    }

}
// export default {}

function addShareButton(map, onClick){
    const locate = document.createElement('div');
    locate.className = 'ol-control ol-unselectable share';
    locate.innerHTML = '<button title="Share">🔗</button>';
    locate.addEventListener('click', onClick);
    map.addControl(new Control({
        element: locate
    }));
}