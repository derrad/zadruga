var express = require('express')
var router = express.Router()
//var MestaController = require('../controllers/MestaContrl');


router.get('/api/mesta',(req,res)=>{
    res.send("GET mesta");
});

router.post('/api/mesta', (req,res)=>{
    res.send("POST mesta");
});

router.put('/api/mesta', (req,res)=>{
    res.send("PUT mesta");
});

router.delete('/api/mesta', (req,res)=>{
    res.send("DELETE mesta");
});


module.exports = router