const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/users/:email', (req, res) => {
    const user = db.get().collection('users');

    console.log(user);

    user.find({
        email : decodeURIComponent(req.params.email)
    }).toArray((err, user) => {
        if(err) {
            throw err;
        }

        if(user.length === 0) {
            res.status(404).end();
        } else {
            res.status(200)
                .json({
                    user
                })
                .end();
        }
    });
});

module.exports = router;