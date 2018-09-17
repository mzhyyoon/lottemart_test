const express = require('express');
const next = require('next');
const { parse } = require('url');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const session = require('express-session');
const logErrors = require('./log-errors');
const axios = require('axios');


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
        secret: '!q@w#e$r%tAND!q@w#e$r%t',
        resave: false,
        saveUninitialized: true
    }));
    server.use(logErrors);

    server.get('/', (req, res) => {
        console.log('index');

        const parsedUrl = parse(req.url, true);
        const { query = {} } = parsedUrl;
        const sess = req.session;

        if(sess && sess.user) {
            return app.render(req, res, '/' , query);
        } else {
            res.redirect('/signin');
        }
    });

    server.get('/testcase', (req, res) => {
        console.log('testcase');

        const parsedUrl = parse(req.url, true);
        const { query = {} } = parsedUrl;
        const sess = req.session;

        if(sess && sess.user) {
            return app.render(req, res, '/testcase', query);
        } else {
            res.redirect('/signin');
        }
    });

    server.get('/signin', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { query = {} } = parsedUrl;

        return app.render(req, res, '/signin', query);
    });

    server.post('/signin', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { query = {} } = parsedUrl;
        const returnUrl = query.returnUrl || '/';

        const sess = req.session;

        axios.post(`${dev === 'production' ? 'https://api-tdd-test.herokuapp.com' : 'http://localhost:3001'}/users/signin`, {
            email: req.body.email,
            password: req.body.password
        }).then((response) => {
            sess.user = response.data.user;

            if(response.status === 200) {
                return app.render(req, res, returnUrl, query);
            } else {
                return app.render(req, res, '/signin');
            }
        });
    });

    server.get('/signup', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { query = {} } = parsedUrl;

        return app.render(req, res, '/signup', query);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});