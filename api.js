let express = require('express');
let router = express.Router();

router.route('/posts')

    .get((req, res) => {
        // tem
        res.send({message: 'TODO return all posts'})
    })
    .post((req, res) => {
        res.send({message: 'make new post'})
    });

module.exports = router;