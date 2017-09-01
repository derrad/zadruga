var express = require('express')
var router = express.Router()
//var FondSatiController = require('../controllers/FondSatiContrl');


router.get('/api/fondsati',(req,res)=>{
    res.send("GET FondSati");
});

router.post('/api/fondsati', (req,res)=>{
    res.send("POST FondSati");
});

router.put('/api/fondsati', (req,res)=>{
    res.send("PUT FondSati");
});

router.delete('/api/fondsati', (req,res)=>{
    res.send("DELETE FondSati");
});

module.exports = router