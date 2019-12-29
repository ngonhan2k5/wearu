import map from '../map'
// import {utils} from '../map'
// import olms from 'ol-mapbox-style'

//import orient from './part/orient'
import UrlPattern from 'url-pattern'

var pattern = new UrlPattern('/:action(/:lon/:lat)', {segmentValueCharset:'a-zA-Z0-9.\\-'});
var params = pattern.match(location.pathname)

console.log('params', params)
var action = 'default'
if (params != null && ['share', 'sim'].includes(params.action)){
    action = params.action
}

console.log(params, action)
//switch (params.action) {
var ac = require('./_' + action).default
map(ac, params)

//}
// }else {
//     // Default route
//     // olms(map, styleJson).then(

//     //   );

//     map.init(function () {

//         map.utils.render(function () {
//             map.addLayer(map.utils.layer);
//             // map.utils.layer = layer2
//         })
//     })
// }
console.log(map.action)
    // map.action(params)
    // const router = config.useFakeSomething ?
    //     require('./FakeSomething').FakeSomething :
    //     require('./RealSomething').RealSomething;

// export default router;