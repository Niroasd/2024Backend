import { User }  from "../models/User.js";
import bcrypt from "bcryptjs";
import passport from "passport";


export const loginUser = (req, res) => {
    const { email, password } = req.body;
    //Required
    if (!email || !password) {
      console.log("Please fill in all the fields");
      res.render("login", {
        email,
        password,
      });
    } else {
      passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true,
      })(req, res);
    }
  };


export const registerView = (req, res) => {
    res.render('register', {
    });
}

export const loginView = (req, res) => {
    res.render('login', {
    });
}
