//Server za zadrugu nodejs
var http = require('http');
var express            = require('express'),
     app               = express(),
     bodyParser        = require('body-parser'),
     mongoose          = require('mongoose');
var Resource = require('resourcejs');
var favicon = require('serve-favicon');
var path = require('path');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');



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


// mongoose.on('error', console.error.bind(console, 'connection error:'));
// mongoose.once('open', function() {
//   // we're connected!
//   console.log("conect to mongose");
// });



//use midleware
app.use(favicon(path.join(__dirname, '/client/favicon.ico')))
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(methodOverride());
// app.use(logErrors)
// app.use(clientErrorHandler)
// app.use(errorHandler)
app.use(express.static(__dirname + '/client'));
//app.use(express.static(__dirname + '/fonts'));
// app.use(express.static(__dirname + '/server'));
app.set('views', './views')
app.set('view engine', 'ejs');


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// production error handler


//use route

// app.get('/', function(req, res) {
//   //res.send('Hello World');
//   // res.render('./client/index.html');
//     res.sendFile(path.join(__dirname, 'client/index.html'));
// });

app.get('/', function(req, res) {
     res.render('pages/index');
});

//posle izbaci i rute podeli po oblastima u fajlove
var VlasnikController = require('./server/controllers/VlasnikContrl'); 
app.get('/api/vlasnik', VlasnikController.list);
app.post('/api/vlasnik', VlasnikController.create); 

  // var PosaoController = require('./server/controllers/PosaoContrl');
  // app.get('/api/posao', PosaoController.list);
  // app.post('/api/posao', PosaoController.create); 

var DrzaveRoute = require('./server/Route/DrzaveRouters')
var PosaoRoute = require('./server/Route/PosaoRouters')
var ParamRoute = require('./server/Route/ParamRouters');

app.use('/', [DrzaveRoute,PosaoRoute,ParamRoute])

// var DrzavaController = require('./server/controllers/sfDrzaveContrl');
// app.get('/api/drzave', DrzavaController.list);
// app.post('/api/drzave', DrzavaController.create);


// var ParamController = require('./server/controllers/apParametarContrl');
// app.get('/api/parametar', ParamController.list);
// app.post('/api/parametar', ParamController.create);

//var DrzavaModel = require('./server/models/sfDrzave'); 

//var PosaoModel = require('./server/models/sfPoslovi'); 

//Resource(app, '/api', 'posao', PosaoModel).rest();

//var ResourceDrzava = mongoose.model('Resource', DrzavaModel);
// var resource =  Resource(app, '/api', 'drzave', DrzavaModel).get(
//  {
//    after: function(req, res, next) {
// //      res.json(res);
//   //    res.send(JSON);
//       console.log("Get was just called!");
//     }
//   }).put().post().index();
//console.log(resource.swagger());

//  Resource(app, 'api/', 'drzave', DrzavaModel).get({

//     after: function(req, res, next) {
//         res.resource.item.title = 'I am changing!!';
//         res.error = null;
//         next();
//     }

//  });


// app.get('/', function(req, res) {
//   //res.send('Hello World');
//   // res.render('./client/index.html');
//     res.sendFile(path.join(__dirname, 'client/index.html'));
// });

// process.env.NODE_ENV = 'production';

 if (app.get('env') === 'development') {
  console.log("Koristicu error handler");
   app.use(errorHandler());
}

//error
// function logErrors (err, req, res, next) {
//   console.error(err.stack);
//   next(err);
// }

// function clientErrorHandler (err, req, res, next) {
//   if (req.xhr) {
//     res.status(500).send({ error: 'Something failed!' });
//   } else {
//     next(err);
//   }
// }

 function errorHandler (err, req, res, next) {
  console.error("errorHandler usao");
  res.status(500);
   //res.render('error', { error: err });
   res.render('error', {
              message: err.message,
              error: {}
          });
 }






//starter server

process.env.NODE_ENV = 'production';
console.log(process.env.NODE_ENV);

var server = http.createServer(app)
var SERVER_PORT = process.env.PORT || 3000;
server.listen(SERVER_PORT, function () {
  console.log('Express server listening on port ' + SERVER_PORT)
})




// app.listen(SERVER_PORT, function() {
//   console.log('listening on ' + SERVER_PORT);
// })