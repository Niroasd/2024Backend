//express app
import express from "express";
import compression from "compression";

import { fileURLToPath } from "url";
import { dirname, sep } from "path";

//config
const __dirname = dirname(fileURLToPath( import.meta.url)) + sep;

const
    cfg = {
        port: process.PORT || 3000,

        dir: {
            root: __dirname,
            static: __dirname + 'static' + sep
        }
    };

//log config options
console.dir(cfg, {depth : null, color : true});

//express init
const app = express();

//do not identify express
app.disable('x-powered-by');

//HTTP compression
app.use( compression() );

app.use((req, res, next) => {
    console.log(req.url);
    next();
})

//home page route
app.get('/', (req, res) => {
    res.send('asdf');
});

app.get('/hello', (req, res) => {
    res.send('hiii');
})

//server static assets
app.use(express.static(cfg.dir.static));

//404 error
app.use((req, res) => {
    res.status(404).send('Not found');
})

//start server
app.listen(cfg.port, () => {
    console.log(`example app listening at http://localhost:${cfg.port}`);
});

//export defaults
export { cfg, app };