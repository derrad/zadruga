var mongoose = require('mongoose');
var Opstina = require('../models/sfOpstine');

module.exports.create = function (req, res) {
  var opst = new Opstina(req.body);
  
  opst.save(function (err, result) {
     console.log("Usao u save Opstina");
     if(err){
        console.log(err); 
        res.json(err); 
      }
   // console.log( " ovo saljem nazad" + result.toString());
    res.json(result);
  });
}


module.exports.list = function (req, res) {
  console.log("Usao u list Opstina - tu sam");
  Opstina.find({}, function (err, results) {
    //console.log( results.toString());
    res.json(results);
  });
}