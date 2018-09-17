const express = require('express');
const router = express.Router();

router.post('/signin', async (req, res) => {
    console.log(`${dev === 'production' ? 'https://api-tdd-test.herokuapp.com' : 'http://localhost:3001'}/users/signin`);

    const response = await fetch(`${dev === 'production' ? 'https://api-tdd-test.herokuapp.com' : 'http://localhost:3001'}/users/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: req.body
    });
    const jsonData = await response.json();

    console.log('jsonData : ', jsonData);

    res.status(200)
        .json({
            jsonData
        })
        .end();
});


module.exports = router;