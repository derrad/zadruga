var mongoose = require('mongoose');
//Resource(app, '', 'drzave', ResourceDrzava).rest();
//var Resource = require('resourcejs');

 var Schema = mongoose.Schema,
     ID  = Schema.ObjectId;

var sfDrzave = new Schema({
   KodDrzave:{type:String,required: [true, 'Kod je obavezan !!!'],unique: true},
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


 


var collectionName = 'sfDrzave';

//var varModelExport = mongoose.model('sfDrzave', sfDrzave, collectionName); //mongoose.model('sfDrzave', sfDrzave);

sfDrzave.pre("save", function(next) {
    var self = this;
    console.log("PRE SAVE sfdrzave");

    self.model.findOne({KodDrzave : this.KodDrzave}, 'KodDrzave', function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
            console.warn('results', results);
            self.invalidate("KodDrzave", "KodDrzave must be unique");
            next(new Error("KodDrzave must be unique"));
        } else {
            next();
        }
    });
});

module.exports =  mongoose.model('sfDrzave', sfDrzave, collectionName); //mongoose.model('sfDrzave', sfDrzave)
