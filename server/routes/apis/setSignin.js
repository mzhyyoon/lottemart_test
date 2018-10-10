const fetch = require('node-fetch');
const crypto = require('crypto');
const uuidv5 = require('uuid/v5');


module.exports = (req, res, HOST, client) => {
    const cipher = crypto.createCipher('aes-256-ctr', 'megazonetdd1998');

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
            } else {
                res.status(301).end();
            }
        } else {
            res.status(500).end();
        }
    });
}