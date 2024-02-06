import express from 'express';
import { writeFile } from 'fs/promises';
import { dirname, parse, sep, } from 'path';
import { fileURLToPath } from 'url';


const app = express();

const
    __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
    cfg = {
        dataPath: __dirname + `questions.json`,
        port: process.env.PORT || 3000,
    }

//fetch urls to general, computer, gadgets categories.
//triviadb
const urlArray = [
    `https://opentdb.com/api.php?type=multiple&amount=1&category=9`,
    `https://opentdb.com/api.php?type=multiple&amount=1&category=18`,
    `https://opentdb.com/api.php?type=multiple&amount=1&category=30`,
]

const fetchTrivia = async () => {
    const response = await fetch(urlArray[0]);
    const data = await response.json();

    //getting the question
    const questionData = data.results[0];
    const question = questionData.question;

    const correctAnswer = questionData.correct_answer;
    const possibleAnswers = questionData.incorrect_answers;

    console.log('Question:', question);
    console.log(`Possible answers : `, possibleAnswers);
    console.log(`Correct answer : `, correctAnswer);

    console.log(data);

    return questionData;
}

const writeTriviaToFile = async () => {
    await writeFile(cfg.dataPath, JSON.stringify(question), err => {
        if (err) {
            console.log(err);
        } else {
            console.log(`wrote to file.`);
        }
    })
}

fetchTrivia();