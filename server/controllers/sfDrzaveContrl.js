var mongoose = require('mongoose');
var Drzava = require('../models/sfDrzave');

module.exports.create = function (req, res) {
 // var error;
  var drzava = new Drzava(req.body);
  
//  error = drzava.validateSync();
//  if(error){
 //   error.CustomError ="Nisam ni otisao na server";
 //    res.json(error); 
//  }

drzava.save(function (err, result) {
    console.log("Usao u save drzave");
      
     //debugger;
      if(err){
      //  console.log(err); 
        res.json(err); 
      }
    //console.log( " ovo saljem nazad" + result.toString());
    res.json(result);
  });
}


module.exports.list = function (req, res) {
  console.log("Usao u list drzave - tu sam");
  Drzava.find({}, function (err, results) {
    //console.log( results.toString());
    res.json(results);
  });
}