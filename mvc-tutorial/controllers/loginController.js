import { User }  from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerView = (req, res) => {
    res.render('register', {
    });
}

export const loginView = (req, res) => {
    res.render('login', {
    });
}
