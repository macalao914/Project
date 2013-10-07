function test() {
	$.ajax({
		url : "/",
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			$("#user_header").append('<a href="/account" data-rel="page"  class="ui-btn-left"\
			style="color: #FFFFFF" >Welcome ' + data.fname + ' ' + data.lname + '! Account: ' + data.id + '</a>');

			if (data.isAdmin) {
				document.getElementById('admin_btn').style="";
			}
		},
		error : function(data, textStatus, jqXHR) {
			console.log("try again");

		}
	});
}