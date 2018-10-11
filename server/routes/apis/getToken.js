const config = require('config');

module.exports = (req, res) => {
    let keys = [];

    for(var i = 0, len = config.secure.uuid.length; i < len; i++) {
        keys.push(config.secure.uuid.charAt(i));
    }

    const uuid = uuidv5(req.body.email, keys);

    res.status(200)
        .json({
            id_token : uuid
        })
        .end();
};