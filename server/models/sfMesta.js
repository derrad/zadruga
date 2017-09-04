var mongoose = require('mongoose');
var relationship = require("mongoose-relationship");
var mongoosePaginate = require('mongoose-paginate');
var Drzave = require('./server/models/sfOpstine');; 


 var Schema = mongoose.Schema,
     ID  = Schema.ObjectId;

var sfMesta = new Schema({
   Opstina: { type:Schema.ObjectId, ref:"sfOpstine", childPath:"child" },
   Naziv : { type: String, required: [true, 'Naziv je obavezan !!!'] },
   Ptt:{type:String},
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

sfMesta.plugin(mongoosePaginate);
sfMesta.plugin(relationship, { relationshipPathName:'Opstina' });
var child = new sfMesta({Opstina:sfOpstine._id});
var collectionName = 'sfMesta';

module.exports = mongoose.model('sfMesta', sfMesta,collectionName);