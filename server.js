//Server za zadrugu nodejs
const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
//const favicon           = require('serve-favicon');    
const config            = require('./server/config/database')
const path              = require('path');
const Resource          = require('resourcejs');

//use configure app
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/zadruga'); 'ovo sam dodao jer je bilo upozorenje i nasao na kako se ispravlja
mongoose.connect(config.database,{ useMongoClient: true });
//mongoose.connect('mongodb://pera:171296@ds153637.mlab.com:53637/omzadruga',{ useMongoClient: true }); 
//
//mongodb://<pera>:<171296>@ds153637.mlab.com:53637/omzadruga

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("conect to mongose");
});


//use midleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); ;
app.use(express.static(path.join(__dirname,'/client')));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, '/client/favicon.ico')))

//use route
app.get('/', function(req, res) {
    res.render('pages/index');
});

//posle izbaci i rute podeli po oblastima u fajlove
var VlasnikController = require('./server/controllers/VlasnikContrl'); 
app.get('/api/vlasnik', VlasnikController.list);
app.post('/api/vlasnik', VlasnikController.create); 

var PosaoController = require('./server/controllers/PosaoContrl');
app.get('/api/posao', PosaoController.list);
app.post('/api/posao', PosaoController.create); 

var DrzavaController = require('./server/controllers/sfDrzaveContrl');
app.get('/api/drzave', DrzavaController.list);
app.post('/api/drzave', DrzavaController.create);

var ParamController = require('./server/controllers/apParametarContrl');
app.get('/api/parametar', ParamController.list);
app.post('/api/parametar', ParamController.create);

var Activ = require('./server/controllers/Activ');

app.get('/api/activities', Activ.lista);



//error
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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