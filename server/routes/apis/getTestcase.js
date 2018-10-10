const fetch = require('node-fetch');

module.exports = (req, res, HOST) => {
    fetch(`${HOST}/testcases/${req.params.id}`)
        .then((response) => {
            if(response.status === 200) {
                return response.json();
            } else {
                res.status(500).end();
            }
        })
        .then((data) => {
            res.status(200)
                .json(data)
                .end();
        });
};