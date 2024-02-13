import express from 'express';
import bodyParser from 'body-parser';
import formidable from 'formidable';

import { fileURLToPath } from 'url';
import { dirname, parse, sep, } from 'path';
import { clearFileCache } from './clearFileCache.js';
import { check, validationResult } from 'express-validator';



const app = express();

const
    __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
    validJobTitles = ['Junior developer', 'Developer', 'Senior Developer'],

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

//custom validation
const validateJobTitles = check('job').isIn(validJobTitles)
    .withMessage('Job must be one of these: Junior developer, Developer, or Senior Developer');

setTimeout(() => {
    clearFileCacheInterval
}, 1000);


app.set('view engine', 'ejs');
app.set('views', 'views');

//static assets
app.use(express.static(cfg.dir.uploads));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    console.log(`new request: ${req.url}`);
    res.render('form', { title: 'Parse HTTP POST file data', data: {} });
})


//render form
app.post('/', validateJobTitles, (req, res, next) => {

    // parse uploaded file data
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


        console.log(`New ${req.method} request: ${req.url}`);
        console.log('Request body:', data);

        // JOS EI MEE VALIDISTA LÄPI NII 422    
        // VIHDOIN
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(422).json({ errors: errors.array() });
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
);


app.listen(cfg.port, () => {
    console.log(`App listening at http://localhost:${cfg.port}`);
});