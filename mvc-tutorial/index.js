import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import { router } from "./routes/login.js";
const app = express();

const cfg = {
    "port": process.env.PORT || 3000,
    "database": process.env.MONGOLAB_URL
}

//js
//BodyParsing
app.use(express.urlencoded({extended: false}));

mongoose
    .connect(cfg.database)
    .then(() => console.log(`connected to mongo.`))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use('/', router);


app.listen(cfg.port, console.log(`Running on http://localhost:${cfg.port}`));
