const uuidv5 = require('uuid/v5');
const config = require('config');

module.exports = (req, res, client, user) => {
    let keys = [];

    for(var i = 0, len = config.secure.uuid.length; i < len; i++) {
        keys.push(config.secure.uuid.charAt(i));
    }

    const {
        _id,
        email,
        id,
        isBookMark,
        level,
        name,
        position,
        profileImage
    } = user[0];

    const uuid = uuidv5(email, keys);

    res.cookie('uuid', uuid, {
        path: '/',
        expires: new Date(Date.now() + (24 * 60 * 60 * 1000))
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
};