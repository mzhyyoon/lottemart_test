const fetch = require('node-fetch');

module.exports = (req, res, HOST) => {
    fetch(`${HOST}/testcases`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: req.body.id,
            type: req.body.type
        })
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            res.status(500).end();
        }
    }).then((data) => {
        res.status(200)
            .json([data])
            .end();
    })
};