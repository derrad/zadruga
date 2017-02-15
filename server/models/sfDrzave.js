var mongoose = require('mongoose');
//Resource(app, '', 'drzave', ResourceDrzava).rest();
//var Resource = require('resourcejs');

 var Schema = mongoose.Schema,
     ID  = Schema.ObjectId;

var sfDrzave = new Schema({
   KodDrzave:{type:String,required: [true, 'Kod je obavezan !!!']},
   Naziv : { type: String, required: [true, 'Naziv je obavezan !!!'] },
   EuClan: {type:Boolean, default:false},
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

sfDrzave.pre('save', function(next) {
   // do stuff
   console.log("PRE SAVE");
   next();
 });

var collectionName = 'sfDrzave';

module.exports = mongoose.model('sfDrzave', sfDrzave,collectionName); //mongoose.model('sfDrzave', sfDrzave);

// {
//     Schema :"sfDrzave"
// }