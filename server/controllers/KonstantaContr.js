var mongoose = require('mongoose');
var Konst = require('../models/sfKonstanta');

module.exports.create = function (req, res) {
 // var error;
  var konstanta = new Konst(req.body);
  
  konstanta.save(function (err, result) {
     console.log("Usao u save Konst ");
     if(err){
        console.log(err); 
        res.json(err); 
      }
   // console.log( " ovo saljem nazad" + result.toString());
    res.json(result);
  });
}


module.exports.list = function (req, res) {
  console.log("Usao u list Konst - tu sam");
  Konst.find({}, function (err, results) {
    //console.log( results.toString());
    res.json(results);
  });
}