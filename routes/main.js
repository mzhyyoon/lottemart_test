const express = require('express');
const cmd = require('node-cmd');
const router = express.Router();

router.get('/', (req, res, next) => {
    cmd.get(
        'npm run main',
        (err, data, stderr) => {
            if (err) {
                res.status(500)
                    .send({
                        success: false,
                        err,
                        stderr
                    });
            } else {
                res.status(200).render('main', {title: 'main', message: 'loading'});
            }
        }
    );
    next();
});

module.exports = router;