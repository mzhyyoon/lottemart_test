const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient('redis://h:pacc5258add8616497c4187cd6ed453cc70f5a254718bd197973f320e196d4fff@ec2-18-214-176-192.compute-1.amazonaws.com:53689');
const HOST = process.env.NODE_ENV === 'production'
    ? 'https://api-megazonetester.herokuapp.com'
    : 'http://localhost:3001';

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
        HOST,
        client
    )
});

router.post('/signup', (req, res) => {
    setSignup(
        req,
        res,
        HOST,
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
        HOST
    );
});

router.get('/testcase/:id', (req, res) => {
    getTestcase(
        req,
        res,
        HOST
    );
});

router.get('/testcases/:id/:type/:page/:per', (req, res) => {
    getTestcases(
        req,
        res,
        HOST
    );
});

module.exports = router;