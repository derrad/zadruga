var mongoose = require('mongoose');
//var Resource = require('resourcejs');

 var Schema = mongoose.Schema,
     ID  = Schema.ObjectId;

var sfPoslovi = new Schema({
   Naziv : { type: String, required: [true, 'Naziv je obavezan'] },
   StepenSS  :  {
                 type : String,
                 default : 'Nekvalifikovan',
                 enum : ['Nekvalifikovan', 'Polukvalifikovan', 'Kvalifikovan','Srednja Strucna Sprema','VKV','Visa skola','Fakultet','Magistar','Doktor Nauka']
                },
   Skola  :{ type: String },
   Sifra   :{ type: String },
   Sifra1   :{ type: String },
   Opis  :{ type: String }
 },
 {
 timestamps: { createdAt: 'created_at' }
},
{ 
    retainKeyOrder: true 
}
 );


//var resourcePosao =  Resource(app, '/api', 'drzave', DrzavaModel).rest();
//module.exports = mongoose.model('Resource', sfPoslovi);
module.exports = mongoose.model('sfPoslovi', sfPoslovi,"sfPoslovi");