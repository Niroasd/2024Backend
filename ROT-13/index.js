// Express.js application
import express from 'express';

// configuration
const cfg = {
  port: process.env.PORT || 3000
};

const alphabet = {};

alphabet.input = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
alphabet.output = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"
const name = ''

// Express initiation
const app = express();

const decypher = (word) => {
  return Array.from(word).map(char => {
    // console.log(alphabet.input.charAt(
    //   alphabet.output.indexOf(char)
    // ));
    return alphabet.input.charAt(
      alphabet.output.indexOf(char)
    )
  }).join('');
  }

// use EJS templates
app.set('view engine', 'ejs');
app.set('views', 'views');

// render form
app.get('/', (req, res) => {
  console.log(req.query.isEnc);
  decypher(req.query.name)
  
  res.render('form', {
    title: decypher(req.query.name),
    data: req.query,
  });
});

// start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${ cfg.port }`);
});
