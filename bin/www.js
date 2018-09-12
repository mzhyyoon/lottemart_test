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
const getRoutes = require('../routers/index');
const routes = getRoutes();
const users = require('../routers/user');

console.log('MONGODB_URI : ', process.env.MONGODB_URI);

db.connect(process.env.MONGODB_URI || 'mongodb://heroku_zcss1c7w:hfcujj2kjtvh3u68r672925ove@ds251632.mlab.com:51632/heroku_zcss1c7w', 'users', (err) => {
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

    server.use('/api/users', users);

    server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query = {} } = parsedUrl;
        const route = routes[pathname];

        if (route) {
            return app.render(req, res, route.page, query);
        }
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});