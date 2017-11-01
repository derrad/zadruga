const mongoose = require('mongoose');
const Posao = require('../models/sfPosao.js');
const TypeA = require('../enum/serverenum');
const SetActivity = require('./SetActivity');

const TIP_TRANS_INSERT ="ADD POSAO";
const TIP_TRANS_UPDATE ="CHANGES POSAO";
const TIP_TRANS_DEL = "DELETE POSAO";


module.exports.create = function (req, res,next) {
  const uid = req.params.id ;
  const Naziv = req.body.Naziv ;
  const StepenSS = req.body.StepenSS ;
  const Skola = req.body.Skola ;
  const Sifra = req.body.Sifra ;
  const Sifra1 = req.body.Sifra1  ;
  const Opis = req.body.Opis ;
  const NameUser = req.user.email || "System";
   
  if (!Naziv || !StepenSS ) {
      return res.status(422).send({ success: false, message: 'Posted data is not correct or incompleted.', data:[] });
  } else {
  
  if (uid) {
  
  Posao.findById(uid).exec(function(err, posao){
    if(err){ 
      return res.status(400).json({ success: false, message: 'Error processing request '+ err, data:[] }); 
    }
      
    if(posao) {
     
      posao.Naziv = Naziv ;
      posao.StepenSS = StepenSS ;
      posao.Skola = Skola ;
      posao.Sifra = Sifra ;
      posao.Sifra1 = Sifra1  ;
      posao.Opis = Opis ;
      posao.NameUser = NameUser;
     
    }
    posao.save(function(err,results) {
      if(err){ 
        return res.status(400).json({ success: false, message: 'Error processing request '+ err, data:[] }); 
      }
      try{
        const updSlog =  Naziv + " "+ StepenSS;
        SetActivity.AddActivity(TypeA.Activities[1], TIP_TRANS_UPDATE, uid, updSlog , NameUser)
      } catch(ex){}
      return res.status(201).json({
        success: true,
        message: 'Posao updated successfully',
        data:results
      });
    });
  });

}else{
  
  // Add new posao
  let oPosao = new Posao({
    Naziv: Naziv,
    StepenSS: StepenSS ,
    Skola : Skola,
    Sifra : Sifra ,
    Sifra1 : Sifra1  ,
    Opis : Opis ,
    NameUser : NameUser
  });

  oPosao.save(function(err,result) {
    if(err){ 
     return  res.status(400).json(
        { success: false, message: 'Error processing request '+ err , data:[]});
    }
      
    try{
      const NoviSlog = Naziv + " "+ StepenSS;
      SetActivity.AddActivity(TypeA.Activities[3], TIP_TRANS_INSERT, result._id, NoviSlog , NameUser)
    } catch(ex){}

   return res.status(201).json({
      success: true,
      message: 'Posao saved successfully',
      data: result
    });
  });

}
}
}



module.exports.listposao = function (req, res,next) {
//  console.log("Usao u list posao - tu sam");
  
  Posao.find({}).sort({created_at:-1}).exec(function(err, result){
    if(err){ return res.status(400).json({ success: false, message:'Error processing request '+ err, data:[] }); 
    }
      return res.status(200).json({
      success: true, 
      data: result
      });
    });

}


module.exports.getposao = function (req, res,next) {
  //console.log("Usao u list posao - tu sam  " + req.params.id);
  Posao.find({_id:req.params.id}).exec(function(err, result){
    if(err){ 
      return res.status(400).json(
      { success: false, message:'Error processing request '+ err , data:[] }
      ); 
    }
      return res.status(200).json({
      success: true, 
      data: result
      });
    });

}

module.exports.deleposao = function(req, res, next) {
  //console.log("parametar je : " + req.params.id);
	Posao.remove({_id: req.params.id}, function(err){
        if(err){ return res.status(400).json({ success: false, message: 'Error processing request '+ err , data:[]}); }
        try{
          SetActivity.AddActivity(TypeA.Activities[5], TIP_TRANS_DEL, req.params.id, TypeA.Activities[5] + " Posao" , req.user.email)
          } catch(ex){}

        return res.status(201).json({
            success: true,
            message: 'Posao removed successfully',
             data:[]
          });
  });
}


