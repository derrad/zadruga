var express = require('express');
var router = express.Router();
var RadnikController = require('../controllers/RadnikContr');

// router.get('/api/radnik',(req,res)=>{
//     res.send("GET radnik");
// });

router.get('/api/radnik', RadnikController.listradnik);
router.get('/api/radnik/:id', RadnikController.getradnik); // API returns radnik details of given radnik id
router.post('/api/radnik', RadnikController.create);
router.put('/api/radnik', RadnikController.create);

// router.put('/api/radnik', (req,res)=>{
//     res.send("PUT radnik");
// });

router.delete('/api/radnik', (req,res)=>{
    res.send("DELETE radnik");
});




module.exports = router