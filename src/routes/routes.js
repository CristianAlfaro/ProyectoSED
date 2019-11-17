var multer = require('multer');
var upload = multer({ dest: '../uploads/' });
var path = require('path');
var fs = require('fs');
var server  = 'http://localhost:8010/';
    

module.exports = (app, passport) => {


    app.get('/', (req, res) => {
        res.render('index');
    });

    //Agregando ruta de inicio
    app.get('/inicio', (req, res) => {
        res.render('inicio');
    });
    //

    app.post(server + '/', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    //LOGIN

    app.get(server + '/login/', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });

    });

    app.post(server + '/login', passport.authenticate('local-login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }));

    //SIGN UP

    app.get('/signup', isLoggedInAdmin,(req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post(server + '/signup', passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    //HOME

    app.get('/home', isLoggedIn, (req, res) => {
        res.render('home', {
            user: req.user
        });
    });

    //LOG OUT

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    }

    function isLoggedInAdmin(req, res, next) { 
        if (req.isAuthenticated()) {
            if(req.user.local.usuario == "RimuruTempest"){
                return next();
            }
        }
        return res.redirect('/');
    }
    
};