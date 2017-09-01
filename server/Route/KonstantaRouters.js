var express = require('express')
var router = express.Router()
//var KonstantaController = require('../controllers/KonstantaContrl');


router.get('/api/konstanta',(req,res)=>{
    res.send("GET Konstanta");
});

router.post('/api/konstanta', (req,res)=>{
    res.send("POST Konstanta");
});

router.put('/api/konstanta', (req,res)=>{
    res.send("PUT Konstanta");
});

router.delete('/api/konstanta', (req,res)=>{
    res.send("DELETE Konstanta");
});


module.exports = router