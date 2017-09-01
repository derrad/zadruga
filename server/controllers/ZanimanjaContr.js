var mongoose = require('mongoose');
var Zanimanja = require('../models/sfZanimanja');

module.exports.create = function (req, res) {
 // var error;
  var zanimanja = new Zanimanja(req.body);
  
  zanimanja.save(function (err, result) {
     console.log("Usao u save Zanimanja kada je ovo");
     if(err){
        console.log(err); 
        res.json(err); 
      }
   // console.log( " ovo saljem nazad" + result.toString());
    res.json(result);
  });
}


module.exports.list = function (req, res) {
  console.log("Usao u list Zanimanja - tu sam");
  Zanimanja.find({}, function (err, results) {
    //console.log( results.toString());
    res.json(results);
  });
}