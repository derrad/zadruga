var express = require('express')
var router = express.Router()
//var ZanimanjaController = require('../controllers/ZanimanjaContrl');


router.get('/api/zanimanja',(req,res)=>{
    res.send("GET zanimanja");
});

router.post('/api/zanimanja', (req,res)=>{
    res.send("POST zanimanja");
});

router.put('/api/zanimanja', function(req,res){
    res.send("PUT zanimanja");
});

router.delete('/api/zanimanja', function(req,res){
    res.send("DELETE zanimanja");
});


module.exports = router