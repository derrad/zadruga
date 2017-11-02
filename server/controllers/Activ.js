const mongoose = require('mongoose');
const LogAct = require('../models/apActlog');

module.exports.lista = function (req, res) {
    //console.log("Usao u list Radnik - tu sam");
    LogAct.find({}).sort({created_at:-1}).exec(function(err, result){
     // res.json(result);
        if(err){ 
          res.statusMessage = err;
          return res.status(400).json({ success: false, message:'Error processing request ' , data:[]}).end(); 
        }
      // // console.log(" proba"  + result);
          return res.status(200).json({
          success: true, 
          data: result
          });
        });
  
  }