import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import webpackHotMiddleware from 'webpack-hot-middleware'

// import history from 'connect-history-api-fallback'

import config from '../../webpack.dev.config.js'
import routes from './routes'

const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'dist/public', 'index.html'),
    ERROR_FILE = path.join(DIST_DIR, 'public', 'error.html'),
    compiler = webpack(config)

    // app.use(history()); 

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

var hotMiddleware = webpackHotMiddleware(compiler, {'path': '/__webpack_hmr'})
app.use(hotMiddleware)
compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {  
    hotMiddleware.publish({  
      action: 'reload'  
    });  
});

app.use(express.json())


app.post('/api/shorter', routes.shorter)

app.get('/:url-:lru', routes.fetch)

app.use('/static', express.static(__dirname +'/public', { maxAge: '1d' }))

// app.get('/share/:lon-:lat', routes.share)
app.get('*', (req, res, next) => {
    console.log("here")
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

// app.use(routes.errorPage(compiler, ERROR_FILE))


const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
