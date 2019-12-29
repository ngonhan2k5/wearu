import UrlPattern from 'url-pattern'

import {utils} from '../map'
import Control from 'ol/control/Control';

console.log('root')
var pattern = new UrlPattern('/:action(/:lon/:lat)', {segmentValueCharset:'a-zA-Z0-9.'});
var currentCoord = [0,0]
export default {
    onInit:(output) => {
        var {map, coords, source, layer2, accuracy} = output
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
                utils.drawLocationMe(source, function(source){
                    return function(){
                        if (!source.isEmpty() && source.getFeatureById("meAcc")) {
                            map.getView().fit(source.getFeatureById("meAcc").getGeometry(), {
                                maxZoom: 18,
                                duration: 2000
                            });
                        }
                    }
                },
                'Locate me'
                )
                
                utils.drawLocationWithAcuracy(map, source, coords, accuracy)
            }
        )

        addShareButton(map, function(){

            console.log(pattern.stringify({action: "share", lon: currentCoord[0], lat: currentCoord[1]}))
            // location = pattern.stringify({action: "share", lon: 10, lat: 20})
            if (navigator.share) {
                navigator.share({
                  title: document.title,
                  text: "Hello World",
                  url: pattern.stringify({action: "share", lon: currentCoord[0], lat: currentCoord[1]})
                }).then(() => console.log('Successful share'))
                .catch(error => console.log('Error sharing:', error));
              }
        })

        return true
    },
    onPosChange: (map, coords, accuracy, source) => {
        currentCoord = coords
        console.log(coords, accuracy, source)
        //import location from './location'

        
        // const acc = circular(coords, accuracy)

        
        // map.getView().setCenter(fromLonLat(coords))
        // source.clear(true);
        
        utils.changeMyLocation(map, source, coords, accuracy)
        
    }

}
// export default {}

function addShareButton(map, onClick){
    const locate = document.createElement('div');
    locate.className = 'ol-control ol-unselectable share';
    locate.innerHTML = '<button title="Share"><var>🔗</var></button>';
    locate.addEventListener('click', onClick);
    map.addControl(new Control({
        element: locate
    }));
}