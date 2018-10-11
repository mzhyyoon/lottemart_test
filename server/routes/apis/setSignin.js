const fetch = require('node-fetch');
const crypto = require('crypto');
const config = require('config');
const setUUID = require('../../../bin/set-uuid');

module.exports = (req, res, HOST, client) => {
    const cipher = crypto.createCipher('aes-256-ctr', config.secure.password);

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
            let decPassword = cipher.update(data.user[0].password, 'hex', 'utf8');
            decPassword += cipher.final('utf8');

            console.log(decPassword);

            if(decPassword === decodeURIComponent(req.body.password)) {
                setUUID(req, res, client, data.user);
            } else {
                res.status(301).end();
            }
        } else {
            res.status(500).end();
        }
    });
}