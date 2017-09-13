'use strict';
//Server za zadrugu nodejs
//var http            = require('http');
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var Resource        = require('resourcejs');
var favicon         = require('serve-favicon');
var morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');

var fs = require('fs');

//var methodOverride  = require('method-override');
//var errorHandler    = require('errorhandler');
//var logger = require('morgan');


var app  = express();


//use configure app
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/zadruga'); 'ovo sam dodao jer je bilo upozorenje i nasao na kako se ispravlja
mongoose.connect('mongodb://pera:171296@ds153637.mlab.com:53637/omzadruga',{ useMongoClient: true }); 
//
//mongodb://<pera>:<171296>@ds153637.mlab.com:53637/omzadruga

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("conect to mongose");
});


// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');


//use midleware

//Morgan i web logovi
var logDirectory = path.join(__dirname, 'log')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})
// setup the logger // Standard Apache combined log output. or use common Standard Apache common log output.
app.use(morgan('dev', {stream: accessLogStream}))


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/client/favicon.ico')))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/client'));

//Route in app
app.get('/', function(req, res) {
     res.render('pages/index');
});


var DrzaveRoute = require('./server/Route/DrzaveRouters')
var PosaoRoute = require('./server/Route/PosaoRouters')
var ParamRoute = require('./server/Route/ParamRouters');
var VlasnikRoute = require('./server/Route/VlasnikRouters');
var ZadrugarRouter = require('./server/Route/ZadrugarRouters');
var ZanimanjaRouter = require('./server/Route/ZanimanjaRouters');
var RadnikRouter = require('./server/Route/RadnikRouters');
var PartneriRouter = require('./server/Route/PartneriRouters');
var OpstineRouter= require('./server/Route/OpstineRouters');
var MestaRouter= require('./server/Route/MestaRouters');
var KonstantaRouter= require('./server/Route/KonstantaRouters');
var FondSatiRouter= require('./server/Route/FondSatiRouters');
var KorisnikRouter= require('./server/Route/KorisnikRouters');
var MestaRouter= require('./server/Route/MestaRouters');
var VezbeRouter= require('./server/Route/VezbaRouters');


app.use('/', [DrzaveRoute,PosaoRoute,ParamRoute,VlasnikRoute,ZadrugarRouter,
              ZanimanjaRouter,RadnikRouter,PartneriRouter,OpstineRouter,MestaRouter,
              KonstantaRouter,FondSatiRouter,KorisnikRouter,MestaRouter,VezbeRouter])




//End Route


//process.env.NODE_ENV = 'production';
//app.set('env','production');
//console.log(app.get('env'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});


//starter server
var SERVER_PORT = process.env.PORT || 3000;
 app.listen(SERVER_PORT, function() {
   console.log('listening on ' + SERVER_PORT);
})