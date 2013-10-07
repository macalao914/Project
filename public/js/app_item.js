function Item(name, model, year, description, price, picture , width, length, heigth, weigth, shipTo, shipFrom, condition ,bid){
	this.name = name;
	this.model = model;
	this.year = year;
	this.description = description;
	this.price = price;
	this.picture = picture;
	this.dimension = " "+width+""+length+""+heigth;
	this.weigth = weigth; 
	this.shipTo = shipTo;
	this.shipFrom = shipFrom;
	this.condition = condition;	
	this.bid = bid;
}
