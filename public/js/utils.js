function login() {

	var user = document.getElementById('username').value;
	var pass = document.getElementById('password').value;
	$.ajax({
		url : "/user",
		type : "post",
		username : user,
		password : pass,
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			var a = data;
			alert("Success!");
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);

		}
	});

};