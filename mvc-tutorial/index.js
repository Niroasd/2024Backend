import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import { router } from "./routes/login.js";
import { loginCheck } from './auth/passport.js';
import session from 'express-session'
import passport from 'passport';

const app = express();


const cfg = {
    "port": process.env.PORT || 3000,
    "database": process.env.MONGOLAB_URL
}


mongoose
    .connect(cfg.database)
    .then(() => console.log(`connected to mongo.`))
    .catch(err => console.log(err));

loginCheck(passport);
//js
//BodyParsing
app.use(express.urlencoded({extended: false}));


app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
}));


app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/', router);


app.listen(cfg.port, console.log(`Running on http://localhost:${cfg.port}`));
