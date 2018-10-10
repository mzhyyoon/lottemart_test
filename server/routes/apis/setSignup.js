const fetch = require('node-fetch');
const crypto = require('crypto');
const uuidv5 = require('uuid/v5');

module.exports = (req, res, HOST, client) => {
    const cipher = crypto.createCipher('aes-256-ctr', 'megazonetdd1998');
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

        const uuid = uuidv5(data.user[0].email, ['1', 'q', '2', 'w', '3', 'e', '4', 'r', '5', 't', '6', 'y', '7', 'u', '8', 'i']);
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
            path: '/',
            expires : new Date(Date.now() + (24 * 60 * 60 * 1000))
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
            client.expire(uuid, 60 * 60 * 24);
            res.status(200).end();
        });
    });
};