var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema,
     ID  = Schema.ObjectId;
     
var sfRadnik = new Schema({
   SifraRad:{
            type:String,
            required: [true, 'Sifra radnika je obavezna !!!'],
            unique: true,
            trim: true, 
            match : [
                    new RegExp('^[a-z0-9_-]+$', 'i'),
                    '{PATH} \'{VALUE}\' is not valid. Use only letters, numbers, underscore.'
                    ],
            minlength:[4,"Minimalna duzina 4 karaktera"],
            maxlength:[4,"Maksimalna duzina 4 karaktera"]},
   Ime:{type:String,required: [true, 'Ime je obavezno !!!']},
   Prezime : { type: String, required: [true, 'Prezime je obavezno !!!'] },
   Jmbg:{ type: String},
   Aktivan:{type:Boolean,default:false},
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

sfRadnik.pre('save', function(next) {
   // do stuff
   console.log("PRE SAVE RADNIK");
   next();
 });

var collectionName = 'sfRadnik';

sfRadnik.plugin(mongoosePaginate);

module.exports = mongoose.model('sfRadnik', sfRadnik,collectionName); 

// {
//     Schema :"sfDrzave"
// }






//   [Table("sfRadnik")]
//   public class sfRadnik:IsfRadnik
//   {

//       #region IsfRadnik Members

//       [Key]
//       [ScaffoldColumn(false)]
//       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//       public int RadnikID { set; get; }

//       [Column("SifraRad", Order = 1)]
//       public string SifraRad { set; get; }

//       [Column("Ime", Order = 2)]
//       public string Ime { set; get; }

//       [Column("Prezime", Order = 3)]
//       public string Prezime { set; get; }

    //   [Column("Jmbg", Order = 4)]
    //   public string Jmbg { set; get; }

    //   [Column("Aktivan", Order = 5)]
    //   public bool Aktivan { set; get; }

    //   [DataType(DataType.MultilineText)]
    //   [Column("Opis", Order = 6)]
    //   public string Opis { set; get; }

    //   [ScaffoldColumn(false)]
    //   public DateTime? DatCreate { set; get; }


    //   [ScaffoldColumn(false)]
    //   public int? Uneo { set; get; }


    //   [ScaffoldColumn(false)]
    //   public string NameUser { set; get; }


    //   [ScaffoldColumn(false)]
    //   public DateTime? DatUpdate { set; get; }

    //   [Timestamp]
    //   [ConcurrencyCheck]
    //   [ScaffoldColumn(false)]
    //   public byte[] Timestamp { set; get; }

    //   #endregion

