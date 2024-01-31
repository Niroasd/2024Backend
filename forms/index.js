import express from 'express';

const cfg = { port: process.env.PORT || 3000 };

const app = express();

//EJS templates
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('form', {
        title: 'Parse HTTP GET data',
        data : req.query
    });
});

app.listen(cfg.port, () => {
    console.log(`App listening at http://localhost:${cfg.port}`);
});
