var mongoose = require('mongoose');
var Parametar = require('../models/apParametar');

module.exports.create = function (req, res) {
 // var error;
  var parametar = new Parametar(req.body);
//  posao.pre('save', function(next) {
//   // do stuff
//   console.log("PRE SAVE");
//   next();
// });
//  error = posao.validateSync();
//  if(error){
 //   error.CustomError ="Nisam ni otisao na server";
 //    res.json(error); 
//  }
  parametar.save(function (err, result) {
      console.log("Usao u save Parametar");
     debugger;
      if(err){
         //console.log(err); 
        res.json(err); 
      }
    //console.log( " ovo saljem nazad" + result.toString());
    res.json(result);
  });
}


module.exports.list = function (req, res) {
  console.log("Usao u list parametara");
  Parametar.find({}, function (err, results) {
    //console.log( results.toString());
    res.json(results);
  });
}