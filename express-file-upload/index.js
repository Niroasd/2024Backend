import express from 'express';
import formidable from 'formidable';

import { fileURLToPath } from 'url';
import { dirname, parse, sep, } from 'path';
import { clearFileCache } from './clearFileCache.js';

const app = express();

const
    __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
    cfg = {
        port: process.env.PORT || 3000,
        dir: {
            root: __dirname,
            uploads: __dirname + 'uploads' + sep
        },
        interval: 60000
    };


// Checking for uploads folder purging every interval, defined in conf.
const clearFileCacheInterval = setInterval(clearFileCache, cfg.interval, cfg.dir.uploads);

setTimeout(() => {
    clearFileCacheInterval
}, 1000);


app.set('view engine', 'ejs');
app.set('views', 'views');

//static assets
app.use(express.static(cfg.dir.uploads));

app.get('/', (req, res, next) => {
    console.log(`new request: ${req.url}`);
    next();
})


//render form
//use .all to handle initial GET and POST
app.all('/', (req, res, next) => {

    if (req.method === 'GET' || req.method === 'POST') {
        //parse uploaded file data
        const form = formidable({
            uploadDir: cfg.dir.uploads,
            keepExtensions: true,
            multiples: false
        });

        form.parse(req, (err, data, files) => {
            if (err) {
                next(err);
                return;
            }

            if (files && files.image && files.image.size > 0) {
                data.filename = files.image.originalFilename;
                data.filetype = files.image.mimetype;
                data.filesize = Math.ceil(files.image.size / 1024) + ' KB';
                data.uploadto = files.image.filepath;
                data.imageurl = '/' + parse(files.image.filepath).base;
            }

            res.render('form', { title: 'Parse HTTP POST file data', data });
        })
    }
    else {
        next();
    }
});


app.listen(cfg.port, () => {
    console.log(`App listening at http://localhost:${cfg.port}`);
});