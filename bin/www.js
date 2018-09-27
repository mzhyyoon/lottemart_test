const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const session = require('express-session');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({dir: '.', dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(timeout('20s'));
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());
    server.use(session({
        secret: 'super-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 60000}
    }));

    server.get('/', (req, res) => {
        return app.render(req, res, '/' , req.query);
    });

    server.get('/testcases', (req, res) => {
        return app.render(req, res, '/testcases');
    });

    server.get('/testcases/detail', (req, res) => {
        return app.render(req, res, '/testcases/detail', res.query);
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