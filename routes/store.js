// our 'database'
var items = {
	SKN : {
		name : 'Shuriken',
		price : 100
	},
	ASK : {
		name : 'Ashiko',
		price : 690
	},
	CGI : {
		name : 'Chigiriki',
		price : 250
	},
	NGT : {
		name : 'Naginata',
		price : 900
	},
	KTN : {
		name : 'Katana',
		price : 1000
	}
};

var users = [{
	id : -1,
	username : 'Guest',
	password : 'none',
	email : ''
}, {
	id : 1,
	username : 'bob',
	password : 'secret',
	email : 'bob@example.com'
}, {
	id : 2,
	username : 'joe',
	password : 'birthday',
	email : 'joe@example.com'
}];

function findByUsername(username) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
			return user;
		}
	}
	return users[0];
}

// handler for homepage
exports.home = function(req, res) {
	// if user is not logged in, ask them to login
	if ( typeof req.session.username == 'undefined')
		res.render('index.html');
	// if user is logged in already, take them straight to the items list
	else {

		res.send(req.session.username);
	}
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
	// if the username is not submitted, give it a default of "Anonymous"
	user = findByUsername(req.body.username);
	// store the username as a session variable

	if (user.id != -1 && req.body.password == user.password) {
		req.session.username = user.username;
		res.render('user.html');
	} else
		res.render("index.html");
};

// handler for displaying the items
exports.items = function(req, res) {
	// don't let nameless people view the items, redirect them back to the homepage
	if ( typeof req.session.username == 'undefined')
		res.redirect('/');
	else
		res.render('items', {
			title : 'Ninja Store - Items',
			username : req.session.username,
			items : items
		});
};

// handler for displaying individual items
exports.item = function(req, res) {
	// don't let nameless people view the items, redirect them back to the homepage
	if ( typeof req.session.username == 'undefined')
		res.redirect('/');
	else {
		var name = items[req.params.id].name;
		var price = items[req.params.id].price;
		res.render('item', {
			title : 'Ninja Store - ' + name,
			username : req.session.username,
			name : name,
			price : price
		});
	}
};

// handler for showing simple pages
exports.page = function(req, res) {
	var name = req.query.name;
	var contents = {
		about : 'Ninja Store sells the coolest ninja stuff in the world. Anyone shopping here is cool.',
		contact : 'You can contact us at <address><strong>Ninja Store</strong>,<br>1, World Ninja Headquarters,<br>Ninja Avenue,<br>NIN80B7-JP,<br>Nihongo.</address>'
	};
	res.render('page', {
		title : 'Ninja Store - ' + name,
		username : req.session.username,
		content : contents[name]
	});
};
