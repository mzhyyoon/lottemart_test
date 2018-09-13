const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/users/:id', (req, res) => {
    const user = db.get().collection('users');

    user.find({
        id : decodeURIComponent(req.params.id)
    }).toArray((err, user) => {
        if(err) {
            throw err;
        }

        if(user.length === 0) {
            res.sendStatus(404).end();
        } else {
            res.status(200)
                .json({
                    user
                })
                .end();
        }
    });
});

router.get('/testcases/:id', (req, res) => {
    const testcases = db.get().collection('testcases');

    testcases.find({
        id: decodeURIComponent(req.params.id)
    }).toArray((err, testcase) => {
        if(err) {
            throw err;
        }

        if(testcase.length === 0) {
            res.sendStatus(404).end();
        } else {
            res.status(200)
                .json({
                    testcase
                })
                .end();
        }
    });
});

module.exports = router;