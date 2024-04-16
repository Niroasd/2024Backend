import fs from "fs";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const cfg = {
    'path' : process.argv[2] || __dirname + '/test.txt'
}

fs.readFile(cfg.path, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    app.get('/', (req, res) => {
        res.send('Content from text file:<br>' + data);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});