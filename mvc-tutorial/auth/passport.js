//js
import bcrypt from "bcryptjs";
import LocalStrategy from "passport-local";
import { User } from "../models/User.js";

export const loginCheck = passport => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            //Check customer
            User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        console.log("wrong email");
                        return done();
                    }
                    //Match Password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            console.log("Wrong password");
                            return done();
                        }
                    });
                })
                .catch((error) => console.log(error));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(error => {
                done(error, null);
            });
    });
};
