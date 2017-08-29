var express = require('express')
var router = express.Router()
var VlasnikController = require('../controllers/VlasnikContrl'); 

router.get('/api/vlasnik', VlasnikController.list);
router.post('/api/vlasnik', VlasnikController.create); 

router.put('/api/vlasnik', function(req,res){
    res.send("PUT VLASNIK");
});

router.delete('/api/vlasnik', function(req,res){
    res.send("DELETE VLASNIK");

});


module.exports = router