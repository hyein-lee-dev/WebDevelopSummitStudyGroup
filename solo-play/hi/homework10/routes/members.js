const express = require(`express`);
const MemberList = require("../MemberList");
const router = express.Router();

const manage_member = new MemberList();

router.use(express.json())

router.get('/', function(req, res){
    res.send(`member route /`);
});

router.post('/add', function(req, res){
    console.log(`member add `, JSON.stringify(req.body));
    try {
        console.log(`1`)
        manage_member.add(req.body);
        console.log(`21`)
        res.status(200).json({response: {message: `Member created. id = ${req.body}`}})
    } catch(err) {
        
        console.log(`[member.js] error occurs during new member ${JSON.stringify(err.message)}`)
        res.status(400).json({error: err.message})
    }
});

router.get('/search/:id', function(req, res){
    console.log(`search user with param = ${req.params.id}`)
    res.status(200).send(`member search router`)
});

module.exports = router;