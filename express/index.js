//express app
import express from "express";
import compression from "compression";

import { fileURLToPath } from "url";
import { dirname, sep } from "path";
import { helloRouter } from "./routes/hello.js";

//config
const __dirname = dirname(fileURLToPath( import.meta.url)) + sep;

const
    cfg = {
        port: process.PORT || 3000,

        dir: {
            root: __dirname,
            static: __dirname + 'static' + sep,
            views: __dirname + 'views' + sep
        }
    };

//log config options
console.dir(cfg, {depth : null, color : true});


//express init
const app = express();

//use EJS templates
app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);

//do not identify express
app.disable('x-powered-by');

//HTTP compression
app.use( compression() );

app.use((req, res, next) => {
    console.log(req.url);
      //abort favicon request
    if(req.url.includes('favicon.ico')){
        res.statusCode = 404;
        res.end('Not found');
        return;
    }
    next();
})

//home page route
app.get('/', (req, res) => {
    res.render('message', { title: 'hiiii' });
});

// /hello/ route
app.use('/hello', helloRouter);

//server static assets
app.use(express.static(cfg.dir.static));

//404 error
app.use((req, res) => {
    res.status(404).render('message', { title: 'Not found' });
})

//start server
app.listen(cfg.port, () => {
    console.log(`example app listening at http://localhost:${cfg.port}`);
});

//export defaults
export { cfg, app };