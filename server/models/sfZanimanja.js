var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

 var Schema = mongoose.Schema,
     ID  = Schema.ObjectId;

var sfZanimanja = new Schema({
   IDZanimanjaID:{type:Schema.Types.Mixed},
   Sifra  :{ type: String , unique: true,
    trim: true, 
    match : [
            new RegExp('^[a-z0-9_-]+$', 'i'),
            '{PATH} \'{VALUE}\' is not valid. Use only letters, numbers, underscore.'
            ],
    minlength:[4,"Minimalna duzina 4 karaktera"],
    maxlength:[4,"Maksimalna duzina 4 karaktera"]},
   Naziv : { type: String, required: [true, 'Naziv je obavezan'] },
   StepenSS  :  {
                 type : String,
                 default : 'Nekvalifikovan',
                 enum : ['Nekvalifikovan', 'Polukvalifikovan', 'Kvalifikovan','Srednja Strucna Sprema','VKV','Visa skola','Fakultet','Magistar','Doktor Nauka']
                },
   NivoUnosa   : {
                 type : String,
                 required: [true, 'Nivo unosa je obavezan'],
                 default : 'Unos',
                 enum : ['Unos', 'Pregled']
                },
   Opis  :{ type: String },
   NameUser: {type:String}
 },
 {
 timestamps: { createdAt: 'created_at' }
},
{ 
    retainKeyOrder: true 
}
 );

 var collectionName = 'sfZanimanja';
 sfZanimanja.plugin(mongoosePaginate);

module.exports = mongoose.model('sfZanimanja', sfZanimanja,collectionName);