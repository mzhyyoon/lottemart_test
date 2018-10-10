const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout');
const apiRoutes = require('../server/routes/apiRoutes');
const redis = require('redis');
const isEmpty = require('./is-empty');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({dir: '.', dev });
const handle = app.getRequestHandler();
const client = redis.createClient('redis://h:pacc5258add8616497c4187cd6ed453cc70f5a254718bd197973f320e196d4fff@ec2-18-214-176-192.compute-1.amazonaws.com:53689');

app.prepare().then(() => {
    const server = express();

    server.use(timeout('20s'));
    server.use(cookieParser());
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());

    server.use('/api', apiRoutes);

    server.get('/', (req, res) => {
        if(!req.cookies.uuid) {
            return res.redirect('/signin');
        } else {
            client.hgetall(req.cookies.uuid, (err, obj) => {
                if(isEmpty(obj) || !obj) {
                    res.redirect('/signin');
                    return;
                } else {
                    return app.render(req, res, '/', req.query);
                }
            });
        }
    });

    server.get('/testcases', (req, res) => {
        if(!req.cookies.uuid) {
            return res.redirect('/signin');
        } else {
            client.hgetall(req.cookies.uuid, (err, obj) => {
                if(isEmpty(obj) || !obj) {
                    res.redirect('/signin');
                    return;
                } else {
                    return app.render(req, res, '/testcases');
                }
            });
        }
    });

    server.get('/testcases/detail', (req, res) => {
        if(!req.cookies.uuid) {
            return res.redirect('/signin');
        } else {
            client.hgetall(req.cookies.uuid, (err, obj) => {
                if(isEmpty(obj) || !obj) {
                    res.redirect('/signin');
                    return;
                } else {
                    return app.render(req, res, '/testcases/detail', res.query);
                }
            });
        }
    });

    server.get('/signin', (req, res) => {
        return app.render(req, res, '/signin', res.query);
    });

    server.get('/logout', (req, res) => {
        return app.render(req, res, '/logout');
    });

    server.get('/password_reset', (req, res) => {
        return app.render(req, res, '/password_reset', res.query);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });


    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});