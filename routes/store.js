var users = [{
	id : 0,
	fname : 'Guest',
	lname : '',
	address : '',
	city : '',
	state : '',
	country : '',
	zipcode : '',
	phone : '',
	username : '',
	email : '',
	password : '',
	question : '',
	answer : ''
},{
	id : 1,
	fname : 'Derick',
	lname : 'Melendez',
	address : 'Carr 828 Km 2.2',
	city : 'Toa Alta',
	state : 'PR',
	country : 'US',
	zipcode : '00953-8130',
	phone : '7874008093',
	username : 'macalao914',
	email : 'macalao914@yahoo.com',
	password : '123',
	question : 'question',
	answer : 'answer'
}];

function adduser(arr) {

	users = users.concat({
		id : users.length,
		fname : arr[0],
		lname : arr[1],
		address : arr[2],
		city : arr[3],
		state : arr[4],
		country : arr[5],
		zipcode : arr[6],
		phone : arr[7],
		username : arr[8],
		email : arr[9],
		password : arr[10],
		question : arr[11],
		answer : arr[12]
	});

	return users[users.length - 1];
};

function isValid(arr, renter) {

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].length == 0)
			return "Form is not complete.";
	};

	if (arr[10] != renter)
		return "Passwords don't match.";

	for (var i = 0; i < users.length; i++) {
		if (arr[8] == users[i])
			return "Username " + arr[8] + " is already taken.";
		else if (arr[9] == users[i])
			return "Email " + arr[9] + " is already registerd.";
	};

	return "valid";
}

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
	else {
		var user = findByUsername(req.session.username);
		res.send(user.fname+" "+user.lname);
	}
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
	// if the username is not submitted, give it a default of "Anonymous"
	console.log(req.body);
	user = findByUsername(req.body.username);
	// store the username as a session variable

	if (user.id != -1 && req.body.password == user.password) {
		req.session.username = user.username;
		res.render('user.html');
	} else
		res.render("index.html");
};

exports.register = function(req, res) {
	var temp = new Array(req.body.fname, req.body.lname, req.body.address, req.body.city, req.body.state, req.body.country, req.body.zipcode, req.body.phone, req.body.new_username, req.body.email, req.body.new_password, req.body.question, req.body.answer);
	var val = isValid(temp,req.body.renter);
	if (val != "valid"){
		res.send(val);
	}
		
	adduser(temp);
	res.render("signedUp.html");

};

exports.account = function(req,res){
	res.render("account.html");
	
	
};

