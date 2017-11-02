var mongoose = require('mongoose');
var Drzava = require('../models/sfDrzave');

module.exports.create = function (req, res) {
 // var error;
  var drzava = new Drzava(req.body);
//  drzava.pre('save', function(next) {
//   // do stuff
//   console.log("PRE SAVE");
//   next();
// });
//  error = drzava.validateSync();
//  if(error){
 //   error.CustomError ="Nisam ni otisao na server";
 //    res.json(error); 
//  }

drzava.save(function (err, result) {
      console.log("Usao u save drzave");
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
  //console.log("Usao u list drzave - tu sam");

  Drzava.find({}).sort({created_at:-1}).exec(function(err, result){
      if(err){ 
        return res.status(400).json({ success: false, message:'Error processing request '+ err, data:[] }); 
      }
   // console.log( "Hvatam ga " +  result.Drzava.Naziv);
      return res.status(200).json({
      success: true,
      message:'Successfully', 
      data: result
      });
    });


  // Drzava.find({}, function (err, results) {
  //   //console.log( results.toString());
  //   res.json(results);
  // });
}