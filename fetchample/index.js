import express from 'express';
import { writeFile } from 'fs/promises';
import { dirname, parse, sep, } from 'path';
import { fileURLToPath } from 'url';


const app = express();

const
    __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
    cfg = {
        dataPath: __dirname + `FILES${sep}questions.json`,
        port: process.env.PORT || 3000,
    }

//fetch urls to general, computer, gadgets categories.
//triviadb
const urlArray = [
    `https://opentdb.com/api.php?type=multiple&amount=1&category=9`,
    `https://opentdb.com/api.php?type=multiple&amount=1&category=18`,
    `https://opentdb.com/api.php?type=multiple&amount=1&category=30`,
]

const fetchTrivia = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.results[0];
}

const writeTriviaToFile = async (questions) => {
    try {
        await writeFile(cfg.dataPath, JSON.stringify(questions));
        console.log(`Wrote to file.`);
    } catch (error) {
        console.error("Error writing to file:", error);
    }
}

const fetchDataAndWriteToFile = async () => {
    try {
        const questions = [];
        for (const url of urlArray) {
            const question = await fetchTrivia(url);
            questions.push(question);
            await new Promise(resolve => setTimeout(resolve, 5000)); // 5-second delay
        }
        await writeTriviaToFile(questions);
        console.log("Finished fetching data and writing to file.");
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

app.get('/', async(req, res) => {
    fetchDataAndWriteToFile();
    res.send('djfjd')
})


app.listen(cfg.port, () => {
    console.log(`Server is running on port ${cfg.port}`);
});