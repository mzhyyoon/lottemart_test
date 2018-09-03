const express = require('express');
const cmd = require('node-cmd');
const router = express.Router();

router.get('/', (req, res, next) => {
    cmd.get(
        'mocha ./test/specs/main.spec.js --reporter json-stream --timeout 20000',
        (err, data, stderr) => {
            if (err) {
                res.status(500)
                    .send({
                        success: false,
                        err,
                        stderr
                    });
            } else {
                res.status(200)
                    .render('main', {title: 'main', message: data});
            }
        }
    );
    next();
});

module.exports = router;