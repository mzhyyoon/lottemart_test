const express = require('express');
const cmd = require('node-cmd');
const router = express.Router();

router.get('/tc', (req, res) => {
    cmd.get(
        'mocha ./test/specs/main.spec.js --reporter json --timeout 20000',
        (err, data, stderr) => {
            if (err) {
                res.status(500)
                    .send({
                        success: false,
                        err,
                        stderr
                    })
                    .end();
            } else {
                res.status(200)
                    .json({
                        result : JSON.stringify(data)
                    })
                    .end();
            }
        }
    );
});

module.exports = router;