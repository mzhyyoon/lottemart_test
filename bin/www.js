const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout');
const session = require('express-session');
const apiRoutes = require('../server/routes/apiRoutes');
const CryptoJS = require('crypto-js');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({dir: '.', dev });
const handle = app.getRequestHandler();

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
            return app.render(req, res, '/', req.query);
        }
    });

    server.get('/testcases', (req, res) => {
        if(!req.cookies.uuid) {
            return res.redirect('/signin');
        } else {
            return app.render(req, res, '/testcases');
        }
    });

    server.get('/testcases/detail', (req, res) => {
        if(!req.cookies.uuid) {
            return res.redirect('/signin');
        } else {
            return app.render(req, res, '/testcases/detail', res.query);
        }
    });

    server.get('/signin', (req, res) => {
        return app.render(req, res, '/signin', res.query);
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