import express from 'express';
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const cfg = {
    'path' : process.argv[2] || __dirname + '/test.txt'
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});


app.post('/submit', (req, res) => {
    const formData = req.body.data;

    fs.writeFile(cfg.path, formData, err => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Data saved successfully');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});