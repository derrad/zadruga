var mongoose = require('mongoose');
var Radnik = require('../models/sfRadnik');

module.exports.create = function (req, res) {
 // var error;
  var worker = new Radnik(req.body);
  
  worker.save(function (err, result) {
     console.log("Usao u save Zadrugar kada je ovo");
     if(err){
        console.log(err); 
        res.json(err); 
      }
   // console.log( " ovo saljem nazad" + result.toString());
    res.json(result);
  });
}


module.exports.list = function (req, res) {
  console.log("Usao u list Zadrugar - tu sam");
  Radnik.find({}, function (err, results) {
    //console.log( results.toString());
    res.json(results);
  });
}