var express = require('express')
var router = express.Router()
//var OpstineController = require('../controllers/OpstineContrl');


router.get('/api/opstine',(req,res)=>{
    res.send("GET opstine");
});

router.post('/api/opstine', (req,res)=>{
    res.send("POST opstine");
});

router.put('/api/opstine', (req,res)=>{
    res.send("PUT opstine");
});

router.delete('/api/opstine', (req,res)=>{
    res.send("DELETE opstine");
});


module.exports = router