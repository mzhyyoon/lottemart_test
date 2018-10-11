const fetch = require('node-fetch');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const config = require('config');
const setUUID = require('../../../bin/set-uuid');

module.exports = (req, res, HOST, client) => {
    const cipher = crypto.createCipher('aes-256-ctr', config.secure.password);
    let encPassword = cipher.update(req.body.password, 'utf8', 'hex');
    encPassword += cipher.final('hex');

    console.log('encPassword :', encPassword);

    fetch(`${HOST}/users/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: req.body.email,
            id: req.body.id,
            password: encPassword
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        if (!data.success) {
            res.status(500).end();
        }

        setUUID(req, res, client, data.user);
    });
};