var mongoose = require('mongoose');
var UserAktiv = require('../models/UserLog');


module.exports.list = function (req, res) {

  UserAktiv.find({}).sort({created_at:-1}).exec(function(err, result){

    if(err){ 
        return res.status(400).json({ success: false, message:'Error processing request '+ err, data:[] }); 
      }

      return res.status(200).json({success: true,message:'Successfully', data: result});
    });
 
}