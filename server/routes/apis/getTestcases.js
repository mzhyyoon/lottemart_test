const fetch = require('node-fetch');

module.exports = (req, res, HOST) => {
    fetch(`${HOST}/testcases/${req.params.id}?type=${req.params.type}&page=${req.params.page}&per=${req.params.per}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then((response) => {
        if(response.status !== 200) {
            res.status(500).end();
        } else {
            return response.json();
        }
    }).then((data) => {
        res.status(200)
            .json(data)
            .end();
    });
};