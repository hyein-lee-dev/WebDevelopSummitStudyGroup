const express = require(`express`);
const router = express.Router();

router.get('/', function(req, res){
    res.send(`member route /`);
});

router.post('/add', function(req, res){
    console.log(`member add `)
    res.send(`member add router`)
});

router.get('/search/:id', function(req, res){
    console.log(`search user with param = ${req.params.id}`)
    res.status(200).send(`member search router`)
});

module.exports = router;