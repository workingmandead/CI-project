var assert = require('chai').assert;
var express = require('express');
var request = require('supertest');

describe('Redirect Middleware', function () {


    it('Does not redirect if URL is not listed in redirects.json', function (done) {

        var app = express();
        require('../')(app);
        app.get('/test', function (req, res) {
            res.send("Response");
        });

        request(app)
            .get('/test')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('App redirects when absolute redirect exists in redirects.json', function (done) {

        request = request.bind(request, 'http://localhost:3000');

        var app = express();
        app.listen(3000);
        require('../')(app);

        request(app)
            .get('/redirecttest')
            .expect(302)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });


    });


    it('App redirects when relative redirect exists in redirects.json', function (done) {


        var app = express();
        require('../')(app);

        request(app)
            .get('/redirecttest2')
            .expect(302)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    });

    it('App redirects when a *wildcard* redirect exists in redirects.json', function (done) {


        var app = express();
        require('../')(app);

        request(app)
            .get('/test/redirecttest3/end')
            .expect(302)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    });

    it('App redirects when a wildcard* redirect exists in redirects.json', function (done) {

        request = request.bind(request, 'http://localhost:3000');

        var app = express();
        require('../')(app);

        request(app)
            .get('/redirecttest4/end')
            .expect(302)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    });

    it('App redirects when a *wildcard redirect exists in redirects.json', function (done) {


        var app = express();
        require('../')(app);

        request(app)
            .get('/start/redirecttest5')
            .expect(302)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    });

    it('App redirects when a regex redirect exists in redirects.json', function (done) {


        var app = express();
        require('../')(app);

        request(app)
            .get('/regextest')
            .expect(302)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    });



});
