const location = [
    {group:"aaa", user:"001", lon: "", lat: ""},
    {group:"aaa", user:"001", lon: "", lat: ""}
]
const users = [
    {id:"001", name:"ngonhan"},    
    {id:"002", name:"ngonhan2"},
    {id:"003", name:"ngonhan3"},
    {id:"004", name:"ngonhan4"}
]



const test = {
    geometries: [],
    getUpdate: function (){

    },
    generateLocations: () => {
        var n = Math.round(Math.random() * 20);
        for (var i=0; i<n; i++){
            var lon = Math.random() * 360 - 180;
            var lat = Math.random() * 180 - 90;
            var group = "aaa";
            var user = ""
        }
    },
    genTest: (n) => {
        var geometries = []
        for (var i = 0; i < n; ++i) {
            var lon = 360 * Math.random() - 180;
            var lat = 180 * Math.random() - 90;
            var id = "" + i
            var name = "ngonhan"+i 
            geometries.push( {lon, lat, id, name});
          }
          //console.log(geometries)
        return geometries;
    },
    genTestNear: (n, coord) => {
        var geometries = []
        for (var i = 0; i < n; ++i) {
            var lon = coord[0] + (Math.random() - 0.5 )/1000;
            var lat = coord[1] + (Math.random() - 0.5 )/1000;
            var id = "" + i
            var name = "ngonhan"+i 
            geometries.push( {lon, lat, id, name});
          }
        return geometries;
    },
    changeTest: () => {
        for (var i = 0; i < test.geometries.length; ++i) {
            var obj = test.geometries[i];
            obj.lon += (Math.random() - 0.5 )/1000
            obj.lat += (Math.random() - 0.5 )/1000
            
        }
        return test.geometries
    }
}

// test.geometries = test.genTest(10);

export default test