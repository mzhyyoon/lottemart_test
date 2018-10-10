const isEmpty = require('../../../bin/is-empty');

module.exports = (req, res, client) => {
    const uuid = req.params.uuid;

    client.hgetall(uuid, (err, obj) => {
        if(isEmpty(obj) || !obj) {
            res.status(401).json({
                success : false,
                error : 'session termiated.'
            }).end();
            return;
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
};