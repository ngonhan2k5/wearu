import UrlPattern from 'url-pattern'

import {utils} from '../map'
import Control from 'ol/control/Control';
import direction from '../part/direction'

console.log('root')
var pattern = new UrlPattern('/:action(/:lon/:lat)', {segmentValueCharset:'a-zA-Z0-9.\\-'});
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
                utils.drawLocateMeButton(source, function(source){
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
                
                utils.drawMyLocation(map, source, coords, accuracy)

                direction(source)
            }
        )

        addShareButton(map, function(){

            console.log(pattern.stringify({action: "share", lon: currentCoord[0], lat: currentCoord[1]}))
            // location = pattern.stringify({action: "share", lon: 10, lat: 20})
            if (navigator.share) {
                navigator.share({
                  title: document.title,
                  text: "I am here",
                  url: pattern.stringify({action: "share", lon: currentCoord[0], lat: currentCoord[1]})
                }).then(() => console.log('Successful share'))
                .catch(error => console.log('Error sharing:', error));
            }else{
                var info = document.getElementById('info');

                // orient(
                //   function(heading, accurate){
                //   console.log(heading, accurate)
                  info.innerText = pattern.stringify({action: "share", lon: currentCoord[0], lat: currentCoord[1]});
                  info.style.opacity = 1;
                // }
                // )
            }
        })

        return true
    },
    onLocationChange: (map, coords, accuracy, source) => {
        currentCoord = coords
        console.log(6666,coords, accuracy, source)
        //import location from './location'

        
        // const acc = circular(coords, accuracy)

        
        // map.getView().setCenter(fromLonLat(coords))
        // source.clear(true);
        
        utils.updateMyLocation(map, source, coords, accuracy)
        
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