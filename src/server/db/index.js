// import config from '../../../webpack.server.config'
console.log('conf', process.env.mode, process.env.NODE_ENV )
//const db = require('./'+ (process.env.NODE_ENV=="development"?"memcached.js":"mongo.js") )
const db = require('./'+ "mongo.js") 
export default db.default
