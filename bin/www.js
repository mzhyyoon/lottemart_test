const express = require('express');
const next = require('next');
const { parse } = require('url');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({dir: '.', dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(timeout('20s'));
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());

    server.get('/', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { query = {} } = parsedUrl;

        return app.render(req, res, '/' , query);
    });

    server.get('/testcase', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { query = {} } = parsedUrl;

        return app.render(req, res, '/testcase', query);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});