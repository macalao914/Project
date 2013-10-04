var express = require('express')
  , http = require('http')
  , path = require('path');

var store = store = require('./routes/store');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//Home page
app.get('/', store.home);

//User page, user logged in
app.post('/user', store.home_post_handler);

app.post('/user', store.home_post_handler);

app.post('/register', store.register);

//User logout, back to home page
app.get('/logout', function(req, res) {
    // delete the session variable
    delete req.session.username;
    res.render('index.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
