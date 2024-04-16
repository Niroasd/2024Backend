const express = require('express');
const { encode, decode } = require('./modules/rot13.mjs');

// configuration
const cfg = {
  port: process.env.PORT || 3000
};

// Express initiation
const app = express();

// use EJS templates
app.set('view engine', 'ejs');
app.set('views', 'views');

// render form
app.get('/', (req, res) => {
  res.render('form', {
    title: 'ROT13 Encoder/Decoder',
    data: req.query,
  });
});

// handle encoding
app.get('/encode', (req, res) => {
  const encodedText = encode(req.query.text);
  res.render('form', {
    title: 'Encoded Text:',
    data: { encoded: encodedText },
  });
});

// handle decoding
app.get('/decode', (req, res) => {
  const decodedText = decode(req.query.text);
  res.render('form', {
    title: 'Decoded Text:',
    data: { decoded: decodedText },
  });
});

// start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});
