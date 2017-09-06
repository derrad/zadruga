var mongoose = require('mongoose');
var FondSati = require('../models/sfFondSati');

module.exports.create = function (req, res,next) {
  const uid = req.params.id ;

  const Mesec=req.body.Mesec || new Date().getMonth()+1;
  const Godina=req.body.Godina || new Date().getFullYear();;
  const Sati = req.body.Sati;
  const MinOsnov =req.body.MinOsnov;
  const MaxOsnov=req.body.MaxOsnov;
  const Opis = req.body.Opis ;
  const NameUser = req.body.NameUser || "TEST";

  console.log("uid je :" + uid + " ovo je Mesec " + req.body.Mesec);

  
  if (!Sati  ) {
      return res.status(422).send({ success: false, message: 'Posted data is not correct or incompleted.', data:[] });
  } else {
  
if (uid) {
  //Edit radnik
  FondSati.findById(uid).exec(function(err, fondsati){
    if(err){ 
      return res.status(400).json({ success: false, message: 'Error processing request '+ err, data:[] }); 
    }
      
    if(fondsati) {
        fondsati.Mesec = Mesec ;
        fondsati.Godina = Godina ;
        fondsati.Sati = Sati;
        fondsati.MinOsnov = MinOsnov ;
        fondsati.MaxOsnov = MaxOsnov  ;
        fondsati.Opis = Opis ;
        fondsati.NameUser = NameUser;
     
    }
    fondsati.save(function(err,results) {
      if(err){ 
        return res.status(400).json({ success: false, message: 'Error processing request '+ err, data:null }); 
      }
      return res.status(201).json({
        success: true,
        message: 'Fond Sati updated successfully',
        data:results
      });
    });
  });

}else{
  
  // Add new posao
  let oFondSati = new FondSati({
    Mesec : Mesec ,
    Godina : Godina ,
    Sati : Sati,
    MinOsnov : MinOsnov ,
    MaxOsnov : MaxOsnov  ,
    Opis : Opis ,
    NameUser : NameUser
  });

  oFondSati.save(function(err,result) {
    if(err){ 
     return  res.status(400).json(
        { success: false, message: 'Error processing request '+ err , data:null});
    }
      
   return res.status(201).json({
      success: true,
      message: 'Fond sati saved successfully',
      data: result

    });
  });

}
}
}



module.exports.listfondsati = function (req, res,next) {
  console.log("Usao u list fond sati");
  
  FondSati.find({}).exec(function(err, result){
    if(err){ return res.status(400).json({ success: false, message:'Error processing request '+ err, data:null }); 
    }
      return res.status(200).json({
      success: true,
      message:'Successfully', 
      data: result
      });
    });

}


module.exports.getfondsati = function (req, res,next) {
  console.log("Usao u get fond sati parametar je  " + req.params.id);
  FondSati.find({_id:req.params.id}).exec(function(err, result){
    if(err){ 
      return res.status(400).json(
      { success: false, message:'Error processing request '+ err , data:null }
      ); 
    }
      return res.status(200).json({
      success: true, 
      message:'Successfully',
      data: result
      });
    });

}

module.exports.delefondsati = function(req, res, next) {
  console.log("delete fond sati parametar je : " + req.params.id);
 // const uid = req.params.id || '1234';
 FondSati.remove({_id: req.params.id }, function(err){
        if(err){ return res.status(400).json({ success: false, message: 'Error processing request '+ err, data:null }); }
        return res.status(201).json({
            success: true,
            message: 'Fond sati removed successfully',
            data:null
          });
  });
}