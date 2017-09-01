var express = require('express')
var router = express.Router()
//var RadnikController = require('../controllers/RadnikContrl');


router.get('/api/radnik',(req,res)=>{
    res.send("GET radnik");
});

router.post('/api/radnik', (req,res)=>{
    res.send("POST radnik");
});

router.put('/api/radnik', (req,res)=>{
    res.send("PUT radnik");
});

router.delete('/api/radnik', (req,res)=>{
    res.send("DELETE radnik");
});


module.exports = router