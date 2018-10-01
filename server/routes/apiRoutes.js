const express = require('express');
const fetch = require('node-fetch');
const crypto = require('crypto');
const router = express.Router();
const uuidv5 = require('uuid/v5');
const redis = require('redis');

const client = redis.createClient('redis://h:pacc5258add8616497c4187cd6ed453cc70f5a254718bd197973f320e196d4fff@ec2-18-214-176-192.compute-1.amazonaws.com:53689');

const HOST = process.env.NODE_ENV === 'production'
    ? 'https://api-megazonetester.herokuapp.com'
    : 'http://localhost:3001';

client.on('error', (err) => {
    console.log('Redis Error : ', err);
});

router.get('/user/:uuid', (req, res) => {
    const uuid = req.params.uuid;

    client.hgetall(uuid, (err, obj) => {
        const {
            _id,
            email,
            id,
            isBookMark,
            level,
            name,
            position,
            profileImage
        } = obj;
        res.status(200)
            .json({
                _id,
                email,
                id,
                isBookMark,
                level,
                name,
                position,
                profileImage
            })
            .end();
    });
});

router.post('/signin', (req, res) => {
    const decipher = crypto.createCipher('aes-256-ctr', 'megazonetdd1998');

    fetch(`${HOST}/users`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: req.body.email
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        if(!data.errors) {
            let decPassword = decipher.update(data.user[0].password, 'hex', 'utf8');
            decPassword += decipher.final('utf8');

            if(decPassword === decodeURIComponent(req.body.password)) {
                const uuid = uuidv5(data.user[0].email, ['1','q','2','w','3','e','4','r','5','t','6','y','7','u','8','i']);
                const user = data.user[0];

                const {
                    _id,
                    email,
                    id,
                    isBookMark,
                    level,
                    name,
                    position,
                    profileImage
                } = user;

                res.cookie('uuid', uuid, {
                    path : '/',
                    expires : new Date(Date.now() + 600000)
                });

                client.hmset(uuid, {
                    _id,
                    email,
                    id,
                    isBookMark,
                    level,
                    name,
                    position,
                    profileImage
                }, (err, obj) => {
                    res.status(200)
                        .json({
                            success : true
                        })
                        .end();
                });
            } else {
                res.status(200)
                    .json({
                        success : false,
                        errors : {
                            message : 'Please check your email or password.'
                        }
                    })
                    .end();
            }
        } else {
            res.status(200)
                .json(data)
                .end();
        }
    });
});

router.post('/testcase', (req, res) => {
    fetch(`${HOST}/testcases`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: req.body.id,
            type: req.body.type
        })
    }).then((response) => {
        if(response.status === 200) {
            res.status(200).end();
        } else {
            res.status(500).end();
        }
    });
});

router.get('/testcase/:id', (req, res) => {
    fetch(`${HOST}/testcases/${req.params.id}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            res.status(200)
                .json({
                    success: true,
                    data
                })
                .end();
        });
});

router.get('/testcases/:id/:type/:page/:per', (req, res) => {
    fetch(`${HOST}/testcases/${req.params.id}?type=${req.params.type}&page=${req.params.page}&per=${req.params.per}`,{
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then((res) => {
        return res.json();
    })
        .then((data) => {
            res.status(200)
                .json({
                    success: true,
                    data
                })
                .end();
        });
});

module.exports = router;