'use strict';
const express         = require('express');
const bodyParser      = require('body-parser');
const cors            = require('cors');
const passport        = require('passport');
const mongoose        = require('mongoose');
const config          = require('./server/config/database')
//const favicon         = require('serve-favicon');
const morgan          = require('morgan');
const path            = require('path');
const rfs             = require('rotating-file-stream');
const fs              = require('fs');


// express initialize
const app  = express();

//use configure app
mongoose.Promise = global.Promise;
//ovo sam dodao jer je bilo upozorenje i nasao na kako se ispravlja
mongoose.connect(config.database,{ useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("conect to mongose");
});

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

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
app.use(morgan('combined', {stream: accessLogStream}))

//app.use(favicon(path.join(__dirname, '/public/favicon.ico')))

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session()); 
require('./server/config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));

//Route
var index = require('./server/Route/index');
//app.use('/', index);

const users = require('./server/Route/users');
const DrzaveRoute = require('./server/Route/DrzaveRouters');
const PosaoRoute = require('./server/Route/PosaoRouters');
const ParamRoute = require('./server/Route/ParamRouters');
const VlasnikRoute = require('./server/Route/VlasnikRouters');
const ZadrugarRouter = require('./server/Route/ZadrugarRouters');
const ZanimanjaRouter = require('./server/Route/ZanimanjaRouters');
const RadnikRouter = require('./server/Route/RadnikRouters');
const PartneriRouter = require('./server/Route/PartneriRouters');
const OpstineRouter= require('./server/Route/OpstineRouters');
//const MestaRouter= require('./server/Route/MestaRouters');
const KonstantaRouter= require('./server/Route/KonstantaRouters');
const FondSatiRouter= require('./server/Route/FondSatiRouters');
const KorisnikRouter= require('./server/Route/KorisnikRouters');
const MestaRouter= require('./server/Route/MestaRouters');
const VezbeRouter= require('./server/Route/VezbaRouters');
const ActLogRouter= require('./server/Route/ActLogRouters');

app.use('/users', users); 

app.use('/', [index,DrzaveRoute,PosaoRoute,ParamRoute,VlasnikRoute,ZadrugarRouter,
              ZanimanjaRouter,RadnikRouter,PartneriRouter,OpstineRouter,MestaRouter,
              KonstantaRouter,FondSatiRouter,KorisnikRouter,MestaRouter,VezbeRouter,
              ActLogRouter]);
//End Route


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