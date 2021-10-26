const express = require(`express`);
const router = express.Router();

const manage_member = new MemberList();

router.get('/', function(req, res){
    res.send(`member route /`);
});

router.post('/add', function(req, res){
    console.log(`member add `, JSON.stringify(req.body));
    try {
        manage_member.add(req.body);
    } catch(err) {
        res.status(400).json({error: err})
    }
    res.status(200).json({response: `Member created. id = ${req.body.id}`})
});

router.get('/search/:id', function(req, res){
    console.log(`search user with param = ${req.params.id}`)
    res.status(200).send(`member search router`)
});

module.exports = router;