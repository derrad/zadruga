var mongoose = require('mongoose');
// var mongoosePaginate = require('mongoose-paginate');
var EnumSS = require('../enum/serverenum');

 var Schema = mongoose.Schema,
     ID  = Schema.ObjectId;

var sfPosao = new Schema({
   Naziv : {  type:String,trim:true,required: [true, 'Naziv je obavezan !!!'],unique: true},
   StepenSS  :  {
                 type : String,
                 required: [true, 'StepenSS je obavezan !!!'],
                 default : 'Nekvalifikovan',
                 enum : EnumSS.StepenSS //['Nekvalifikovan', 'Polukvalifikovan', 'Kvalifikovan','Srednja Strucna Sprema','VKV','Visa skola','Fakultet','Magistar','Doktor Nauka']
                },
   Skola  :{ type: String,trim: true  },
   Sifra   :{ type: String,trim: true  },
   Sifra1   :{ type: String,trim: true },
   Opis  :{ type: String,trim: true },
   NameUser: {type:String,trim: true}
 },
 {
 timestamps: { createdAt: 'created_at' }
 },
 { 
     retainKeyOrder: true 
 }
 );


//  sfPosao.pre('save', function(next) {
//    // do stuff
//    console.log("PRE SAVE POSAO");
//   next();
// });

//  sfPosao.plugin(mongoosePaginate);
//  var collectionName = 'sfPosao';

module.exports = mongoose.model('sfPosao', sfPosao,'sfPosao');