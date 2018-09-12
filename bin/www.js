const express = require('express');
const next = require('next');
const { parse } = require('url');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const db = require('../db');
const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({dir: '.', dev });
const handle = app.getRequestHandler();
const getRoutes = require('../routes');
const routes = getRoutes();
const apiRoutes = require('../server/routes/apiRoutes.js');

console.log('MONGODB_URI : ', process.env.MONGODB_URI);

db.connect(process.env.MONGODB_URI || 'mongodb://heroku_zcss1c7w:hfcujj2kjtvh3u68r672925ove@ds251632.mlab.com:51632/heroku_zcss1c7w', 'heroku_zcss1c7w', (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

app.prepare().then(() => {
    const server = express();

    server.use(timeout('20s'));
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());

    server.use('/api', apiRoutes);

    server.get('/', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { query = {} } = parsedUrl;

        return app.render(req, res, '/' , query);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});