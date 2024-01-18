#!/usr/bin/env node


const
 port = (process.argv[2] || process.env.PORT || 3000),
 http = require('http');

http.createServer((req, res) => { 

  //abort favicon request
  if(req.url.includes('favicon.ico')){
    res.statusCode = 404;
    res.end('Not found');
    return;
  }

  console.log(req.url);
  const nameArg = capitalize(req.url.replace(/[^\w.,-]/g, ' ').replace(/\s+/g, ' ').trim() || 'world');


  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<p>Hello ${ nameArg }!</p>`);

}).listen(port);


console.log(`Server running at http://localhost:${ port }/`);

const capitalize = (str) => {
    return str
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// running in development mode? 
const DEVMODE = (process.env.NODE_ENV !== 'production');

if (DEVMODE) {
  console.log('application started in development mode');
}