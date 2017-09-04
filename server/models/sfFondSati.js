var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

 var Schema = mongoose.Schema,
     ID  = Schema.ObjectId;

var sfFondSati = new Schema({
    Mesec:{ type: Number,default:1,required:true},
    Godina:{ type: Number,default:1,required:true},
    Sati:{ type: Number,default:0,required:true},
    MinOsnov:{ type: Number,default:0,required:true},
    MaxOsnov:{ type: Number,default:0,required:true},
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

sfFondSati.pre('save', function(next) {
   // do stuff
   console.log("PRE SAVE");
   next();
 });

sfFondSati.plugin(mongoosePaginate);

var collectionName = 'sfFondSati';

module.exports = mongoose.model('sfKonstanta', sfFondSati,collectionName);


// #region IsfFondSati Members

//         [Key]
//         [ScaffoldColumn(false)]
//         [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//         public int FondSatiID { set; get; }

        // [Column("Mesec", Order = 1)]
        // public int Mesec { set; get; }

        // [Column("Godina", Order = 2)]
        // public int Godina { set; get; }

        // [Column("Sati", Order = 3)]
        // public decimal Sati { set; get; }

        // [Column("MinOsnov", Order = 4)]
        // public decimal MinOsnov { set; get; }

        // [Column("MaxOsnov", Order = 5)]
        // public decimal MaxOsnov { set; get; }




        // [DataType(DataType.MultilineText)]
        // [Column("Opis", Order = 6)]
        // public string Opis { set; get; }

        // [ScaffoldColumn(false)]
        // public DateTime? DatCreate { set; get; }


        // [ScaffoldColumn(false)]
        // public int? Uneo { set; get; }


        // [ScaffoldColumn(false)]
        // public string NameUser { set; get; }


        // [ScaffoldColumn(false)]
        // public DateTime? DatUpdate { set; get; }

        // [Timestamp]
        // [ConcurrencyCheck]
        // [ScaffoldColumn(false)]
        // public byte[] Timestamp { set; get; }

        // #endregion

