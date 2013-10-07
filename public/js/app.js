//Se ejecuta antes de que la pagina con el id search se llame.
$(document).on('pagebeforeshow', "#search", function( event, ui ) {
	console.log("pageBeforeShow Search");
	$.ajax({
		url : "/items",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var itemList = data.items;
			var len = itemList.length;
			var list = $("#items-list");
			list.empty();
			var item;
			for (var i=0; i < len; ++i){
				item = itemList[i];
				list.append("<li><a onclick=GetItem(" + item.id + ")\>" + 
					"<img src= images/"+ item.picture +">"+
					"<center>" +
					"<p>" + item.name + item.model + "</br>"+  item.year + "</br>"+ item.description + "</p>" + "</center>" +
					"<p class=\"ui-li-aside\">" + item.price + "</p>" +
					"</a></li>" 
					);		
			}
			list.listview("refresh");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#details", function( event, ui ) {
	console.log("pageBeforeShow Details");
	
	var detailsHeader = $("#detailsHeader");
	detailsHeader.empty();
	detailsHeader.append(""+currentItem.name);
	
	var detailsImg = $("#detailsImg");
	detailsImg.empty();
	detailsImg.append("<img src= images/"+ currentItem.picture +">");
	
	var detailsPara = $("#detailsPara");
	detailsPara.empty();
	detailsPara.append(""+currentItem.description);
	
	var detailsBid = $("#detailsBid");
	detailsBid.empty();
	detailsBid.append("$"+currentItem.bid);
	
	var detailsPrice = $("#detailsPrice");
	detailsPrice.empty();
	detailsPrice.append(""+currentItem.price);
	
	var detailsShipFrom = $("#detailsShipFrom");
	detailsShipFrom.empty();
	detailsShipFrom.append(""+currentItem.shipFrom);
	
	var detailsShipTo = $("#detailsShipTo");
	detailsShipTo.empty();
	detailsShipTo.append(""+currentItem.shipTo);

	var detailsCondition = $("#detailsCondition");
	detailsCondition.empty();
	detailsCondition.append(""+currentItem.condition);			
});

$(document).on('pagebeforeshow', "#bidPage", function( event, ui ) {
	console.log("pageBeforeShow Description");
			
			var prodBidName = $("#prodBitName");
			prodBidName.empty();
			prodBidName.append(""+currentItem.name);
			
			var prodBidInfo = $("#imgSpace");
			prodBidInfo.empty();
			prodBidInfo.append("<img src= images/"+ currentItem.picture +" height='62' width='62'>");
			
			
			var currentBid = $("#currentBid");
			currentBid.empty();
			currentBid.append(""+currentItem.bid);
});


$(document).on('pagebeforeshow', "#descriptionPage", function( event, ui ) {
	console.log("pageBeforeShow Description");
	$.ajax({
		url : "/items",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			
			var descHSpace = $("#descHeader");
			descHSpace.empty();
			descHSpace.append("Description");
			
			var prodDescSpace = $("#prodDesPara");
			prodDescSpace.empty();
			prodDescSpace.append(""+currentItem.description);
			
			var detailsParaSpace = $("#detailsPara");
			detailsParaSpace.empty();
			detailsParaSpace.append("Name: "+currentItem.name +
			"<br/> Model: "+currentItem.model + "<br/> Year: "+
			currentItem.year+ "<br/> Dimension: "+ currentItem.dimension +"<br/> Weigth: " +currentItem.weigth + 
			"<br/> Ship to:"+ currentItem.shipTo +" <br/> Ship from: "+ currentItem.shipFrom);
				
			},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

/*=====================================================================
								Functions
======================================================================*/

var currentItem = {};

function GetItem(id){
	$.mobile.loading("show");
	$.ajax({
		url : "/items/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentItem = data.item;
			
			$.mobile.loading("hide");
			$.mobile.navigate("details.html");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Item not found.GETITEM");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

function getSubmitValue(){
	var bidValue = document.getElementsByName('bidValue')[0].value;
	
	var userConfirmation = confirm("Are you sure of the current Bid? \n Bid: $"+bidValue);
	if (userConfirmation==false)
	  {
	  	return;
	  }
	
    var jsonData={"name":""+currentItem.name, "model":""+currentItem.model, "year":""+currentItem.year, "price":""+currentItem.price, "description":""+currentItem.description, "bid":""+bidValue};
    var j = JSON.stringify(jsonData);
	
	$.ajax({
		url : "/items/" + currentItem.id,
		method: 'put',
		data : j,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			GetItem(currentItem.id); //refresh Current Item			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Item not found.GETITEM");
			}
			else {
				alert("Internal Server Error.");
			}
		}
	});
	
}

function checkBid(){
	var bidValue = document.getElementsByName('bidValue')[0].value;
	//Se le suma 0.50 para un bid aceptado- No implementado aun.
	if(parseFloat(bidValue).toFixed(2)-parseFloat(currentItem.bid).toFixed(2) <= 0 ){
		$('#submit').addClass('ui-disabled');
	}
	else if(parseFloat(bidValue).toFixed(2)-parseFloat(currentItem.bid).toFixed(2) > 0 ){
		$('#submit').removeClass('ui-disabled');
	}
	else{
		$('#submit').addClass('ui-disabled');
	}
	}

function displayunicode(e){
	var unicode = e.keyCode ? e.keyCode : e.charCode;
	var searchValue = document.getElementsByName('searchValue')[0].value;// Got the User Search Value;
	
	//Check if Enter was received. 
	if(unicode == 13){
		$.mobile.navigate("/search");
	}
}

/**
function ConverToJSON(formData){
	var result = {};
	$.each(formData, function(i, o){
			result[o.name] = o.value;
	});
	return result;
}*/
