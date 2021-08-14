// import React from "react";
// import App from './../../js/com/App'

import db from '../db'
import utils from '../utils'

var test = require('../../test.json')

// import { renderToString } from 'react-dom/server';
import Html from '../Html'
var fs = require("fs");
var rsa = "iaaa";
const routes = {
    share: (req, res, next) => {
        console.log(req.body.url)
        console.log("Fetch", req.params)
        // let url = codenamize(req.body.url)
        let slug = `${req.params.url}-${req.params.lru}`
        // let url = codenamize(req.body.url)
        
        // db.saveUrl(url, req.body.url)

        // let shortUrl = (process.env.NODE_ENV=="production"?"http://idbi.me/":"http://localhost:5000/" )+ url

        // res.json({ shortedUrl: shortUrl })
        res.send('OK')
        res.end()
    },
    shorter: (req, res, next) => {
        console.log(req.body.url)
        // let url = codenamize(req.body.url)
        
        // db.saveUrl(url, req.body.url)

        // let shortUrl = (process.env.NODE_ENV=="production"?"http://idbi.me/":"http://localhost:5000/" )+ url

        // res.json({ shortedUrl: shortUrl })
        // res.send('OK')
        res.end()
    },
    fetch: (req, res, next) => {
        console.log("Fetch", req.params)
        // let url = codenamize(req.body.url)
        let slug = `${req.params.url}-${req.params.lru}`
        // db.fetchUrl(slug).then(
        //     (data)=>{
        //         try{
        //             console.log("Fetched: ", data)
        //             if (!data || !data.url)
        //                 next(new Error('Link not found in db, please shorten once'))
        //             else if (!utils.isSafeUrl(data.url, slug))
        //                 next(new Error('Link is not safe to redirect'))
        //             else
        //                 res.redirect(data.url)
        //         }catch(e){
        //             res.end()
        //         }
       
        //     }),
        //     (err) => {
        //         console.log("Fetch fail",err)
        //         res.send({errMsg:'Fetch Link error'})
        //         res.end()
        //     }
    },
    api: (req, res, next) => {
	    res.status(200)
	    res.set('Content-type', 'application/json')
	    res.end(JSON.stringify(test))
    },

    // RSA helper
    setRSA: (req, res, next) => {
        if (req.body && req.body.rsa) {
            console.log(req.body);
	    rsa = req.body.rsa;
	}else{
	    console.log(req.body);
	}
	res.status(200);
	res.end(JSON.stringify({result:"OK"}));
    },
    getRSA: (req, res, next) => {
	    if (rsa == "") {
		res.status(404);
		res.end();
	    }else{
		//let ret = {rsa:rsa};
		
		res.status(200);    
	        res.end( rsa );
		rsa = "";
	    }
    },
    errorPage: function (compiler, errorFile){
        
        return function (err, req, res, next) {

            
            console.error('AAA', err.message, errorFile)
            if (res.headersSent) {
                return next(err)
            }
            // res.status(500)
            //res.render('error', { error: err })

            // const body = renderToString(<App />);

            // compiler.outputFileSystem.readFile(htmlFile, (err, result) => {
                fs.readFile(errorFile, "utf8", (err1, result) => {
                        if (err1) {
                            return next(err1)
                        }
                        res.status(500)
                        res.set('content-type', 'text/html')
                        res.send(result.replace('$ERROR$', err.message))
                        res.end()
                    })
            // // console.log(body)
            // const title = 'Server side Rendering with Styled Components';

            // res.send(Html(body, title))
        }
    }
}


export default routes
