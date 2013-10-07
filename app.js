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

var item = require("./public/js/srv_item.js");
var Item = item.Item;

var itemList = new Array(
	new Item("Star Wars", "Episode 1", "1999", "Two Jedi Knights escape a hostile blokade...", "$22.00", "starwars.png", "190mm", "135mm", "14mm","2.26 oz", "WorldwideTest", "Puerto Rico", "new", "0.50"),
	new Item("Megaman", "NT", "2003", "Join MegaMan and Battle Network pal, Lan, are in trouble again. It's only been a month since the evil WWW terrorist's attempts to...", "$10.00", "megaman.png", "125mm", "8mm", "142mm","2.26 oz", "WorldwideTest2", "China", "used", "2.75")	
);
 var itemNextId = 0;
 
for (var i=0; i < itemList.length;++i){
	itemList[i].id = itemNextId++;
}


//Home page
app.get('/', store.home);

//User page, user logged in
app.post('/user', store.home_post_handler);

app.get('/user',store.user);

app.post('/register', store.register);

app.get('/account', store.account);

app.get('/account/buying', store.account_buying);

app.get('/account/selling', store.account_selling);

app.get('/account/watching', store.account_watching);

app.get('/account/administrator', store.account_administrator);


//User logout, back to home page
app.get('/logout', function(req, res) {
    // delete the session variable
    delete req.session.username;
    res.render('index.html');
});


//REST Operation - HTTP GET to read all items
app.get('/items', function(req, res) {
	console.log("GET waki FK");
	//var tom = {"make" : "Ford", "model" : "Escape", "year" : "2013", "description" : "V4 engine, 30mpg, Gray", "price" : "$18,000"};
	//var tom = new Item("Ford", "Escape", "2013", "V4 engine, 30mpg, Gray", "$18,000");
	//console.log("tom: " + JSON.stringify(tom));
	var response = {"items" : itemList};
  	res.json(response);
});

// REST Operation - HTTP GET to read a item based on its id
app.get('/items/:id', function(req, res) {
	var id = req.params.id;
		console.log("GET item: " + id);

	if ((id < 0) || (id >= itemNextId)){
		// not found
		res.statusCode = 404;
		res.send("Item not found.");
	}
	else {
		var target = -1;
		for (var i=0; i < itemList.length; ++i){
			if (itemList[i].id == id){
				target = i;
				break;	
			}
		}
		if (target == -1){
			res.statusCode = 404;
			res.send("Item not found.");
		}
		else {
			var response = {"item" : itemList[target]};
  			res.json(response);	
  		}	
	}
});

// REST Operation - HTTP PUT to updated a item based on its id
app.put('/items/:id', function(req, res) {
	var id = req.params.id;
		console.log("PUT item: " + id);

	if ((id < 0) || (id >= itemNextId)){
		// not found
		console.log("1");
		res.statusCode = 404;
		res.send("Item not found.");
		
	}
	else if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('model')
  	|| !req.body.hasOwnProperty('year') || !req.body.hasOwnProperty('price') || !req.body.hasOwnProperty('description')|| !req.body.hasOwnProperty('bid')) {
    	console.log("2");
    	res.statusCode = 400;
    	return res.send('Error: Missing fields for item.');
    	
  	}
	else {
		var target = -1;
		for (var i=0; i < itemList.length; ++i){
			if (itemList[i].id == id){
				console.log("3");
				target = i;
				break;	
				
			}
		}
		if (target == -1){
			console.log("4");
			res.statusCode = 404;
			res.send("Item not found.");			
		}	
		else {
			console.log("5");
			var theItem= itemList[target];
			theItem.name = req.body.name;
			theItem.model = req.body.model;
			theItem.year = req.body.year;
			theItem.price = req.body.price;
			theItem.description = req.body.description;
			theItem.bid = req.body.bid;
			var response = {"item" : theItem};
  			res.json(response);		
  		}
	}
});

app.get('/search', function(req,res){
	res.render('search.html');
});





http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
