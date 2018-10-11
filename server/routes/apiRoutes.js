const express = require('express');
const config = require('config');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient(config.redisUrl);

const getToken = require('./apis/getToken');
const getUser = require('./apis/getUser');
const setSignin = require('./apis/setSignin');
const setSignup = require('./apis/setSignup');
const setTestcase = require('./apis/setTestcase');
const getTestcase = require('./apis/getTestcase');
const getTestcases = require('./apis/getTestcases');

client.on('error', (err) => {
    console.log('Redis Error : ', err);
});

router.post('/token', getToken);
router.get('/user/:uuid', (req, res) => {
    getUser(
        req,
        res,
        client
    );
});

router.post('/signin', (req, res) => {
    setSignin(
        req,
        res,
        config.hosts.api,
        client
    )
});

router.post('/signup', (req, res) => {
    setSignup(
        req,
        res,
        config.hosts.api,
        client
    );
});

router.post('/logout', (req, res) => {
    if(!req.cookies.uuid) {
        res.status(200).end();
    }
    try {
        client.del(req.cookies);
        res.clearCookie('uuid', {path: '/'});
        res.status(200).end();
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/testcase', (req, res) => {
    setTestcase(
        req,
        res,
        config.hosts.api,
    );
});

router.get('/testcase/:id', (req, res) => {
    getTestcase(
        req,
        res,
        config.hosts.api,
    );
});

router.get('/testcases/:id/:type/:page/:per', (req, res) => {
    getTestcases(
        req,
        res,
        config.hosts.api,
    );
});

module.exports = router;