const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserDAO = require('../app/dao/UserDAO');
const db = require('./database');


module.exports = (app) => {                                         

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            const userDao = new UserDAO(db);
            userDao.findByEmail(email)
                .then(user => {
                    if (!user || password != user.password) {
                        return done(null, false, {
                            message: 'E-mail e/ou senha incorretos!'
                        });
                    }

                    return done(null, user);
                })
                .catch(error => done(error, false));
        }
    ));

    passport.serializeUser((user, done) => {
        const userSession = {
            name: user.full_name,
            email: user.email
        }

        done(null, userSession);
    })

    passport.deserializeUser((userSession, done) => {
        done(null, userSession);
    })

    app.use(session({
        secret: 'CODEHOUSE',
        genid: function(request) {
            return uuid();
        },
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (request, response, next) {
        request.passport = passport;
        next();
    })
};