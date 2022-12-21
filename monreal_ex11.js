"use strict"

/**
Jomar P. Monreal
CMSC 12 T23L
Shows a summary of the order after a successful submit (using an alert)
**/

//show summary of order
function showSummary(e){
	e.preventDefault();
	var name=document.getElementById("name").value;
	var mobileNumber=document.getElementById("mobileNumber").value;
	var emailAddress=document.getElementById("emailAddress").value;
	var tiers=document.getElementById("tier").value;
	var flavors=getSelectedElementsByName("flavor");
	var fillings=getSelectedElementsByName("filling");
	var icing=getSelectedElementsByName("icing");
	var insideCakeAdditions=getSelectedElementsByName("insCakeAddition");
	var decorativeAdditions=getSelectedElementsByName("decorAddition");
	var infusion=getSelectedElementsByName("infusion");
	var deliveryDateTime=getDateTime();

	var multipliers=flavors+","+fillings+","+icing+","+insideCakeAdditions+","+decorativeAdditions+","+infusion;
	var multipliersArray=multipliers.split(",");
	var cakeMultiplier=getCakeMultiplier(multipliersArray);
	var totalCost=getTotalCost(tiers,cakeMultiplier,getDeliveryFee());

	//printing
	var summary="Name: " + name;
	summary+="\n";
	summary+="Mobile #: " + mobileNumber;
	summary+="\n";
	summary+="Email: " + emailAddress;
	summary+="\n";
	summary+="Tiers: " + tiers;
	summary+="\n";
	summary+="Cake Flavor: " + flavors;
	summary+="\n";
	summary+="Filling: " + fillings;
	summary+="\n";
	summary+="Icing: " + icing;
	summary+="\n";
	summary+="Inside cake additions: " + insideCakeAdditions;
	summary+="\n";
	summary+="Decorative additions: " + decorativeAdditions;
	summary+="\n";
	summary+="Infusions: " + infusion;
	summary+="\n";;
	if(document.getElementById("delivery").checked==true){	
		summary+="+ 500 delivery fee";
		summary+="\n";
		summary+="Delivery address: " + document.getElementById("deliveryAddress").value;
		summary+="\n";
		summary+="Delivery date & time: " + deliveryDateTime;
		summary+="\n";
	}
	summary+="Total cost: " + totalCost;
	summary+="\n";
	alert(summary);
}

//get delviery date and time
function getDateTime(){
	if(checkDate() && checkTime()){
		return document.getElementById("deliveryDate").value+" "+document.getElementById("deliveryTime").value;
	}
	return "";
}

//get total cost of the order
function getTotalCost(tiers,cakeMultiplier,deliveryFee){
	tiers=parseInt(tiers);
	var cost=0;
	for(var i=0;i<tiers;i++){
		var tier=i+1;
		cost+=getTierCost(tier,cakeMultiplier);
	}
	cost+=deliveryFee;
	return cost;
}

//get the cake tier cost
function getTierCost(tier,cakeMultiplier){
	var radius=tier+1;
	return Math.PI * radius**2 * 5 * cakeMultiplier;
}

//get the total cake multiplier from multipliers
function getCakeMultiplier(multipliers){
	var cakeMultiplier=0;
	for(var i=0;i<multipliers.length;i++){
		var multiplier=multipliers[i];
		cakeMultiplier+=convertToMultiplier(multiplier);
	}
	return cakeMultiplier;
}

//convert element value into its corresponding multiplier
function convertToMultiplier(element){
	if (["Walnut","Chocolate Chips","Pecans","White Chocolate Chips","Raspberry Jam","Strawberry Jam"].includes(element)){
		return 1;
	}
	else if(["Rum","Kaluha","Cream Cheese","Buttercream"].includes(element)){
		return 2;
	}
	else if(["Mocha Espresso"].includes(element)){
		return 3;
	}
	else if(["Traditional White"].includes(element)){
		return 4;
	}
	else if(["Amaretto"].includes(element)){
		return 5;
	}
	else if(["Red Velvet","Lemon"].includes(element)){
		return 6;
	}
	else if(["Devil's Food Chocolate"].includes(element)){
		return 10;
	}
	else{
		return 0;
	}
}

//get a string of selected elements seperated by comma
function getSelectedElementsByName(name){
	var selectedElements="";
	var elements=document.getElementsByName(name);
	for(var i=0;i<elements.length;i++){
		var element=elements[i];
		if(element.checked==true || element.selected==true){
			selectedElements+=element.value+",";
		}
	}
	return selectedElements.slice(0,-1);
}

//gets delivery fee
function getDeliveryFee(){
	if(document.getElementById("delivery").checked==true){
		return 500;
	}
	return 0;
}

//disable or enable deliveries
function disableDeliveries(bool){
	document.getElementById("deliveryAddress").disabled=bool;
	document.getElementById("deliveryDate").disabled=bool;
	document.getElementById("deliveryTime").disabled=bool;
}

//check if the date provided is in the future
function checkDate(){
	var today = new Date();
	var todayDate=String(today.getFullYear())+"-"+String(today.getMonth())+"-"+String(today.getDate());
	var inputDate=document.getElementById("deliveryDate").value;

	if(Date.now()>Date.parse(inputDate)){
		document.getElementById("deliveryDateReminder").innerHTML="Please provide a future date!";
		return false;
	}
	else{
		document.getElementById("deliveryDateReminder").innerHTML="";
		return true;
	}
}

//check if the time provided is between 6am-6pm
function checkTime(){
	var inputTime=document.getElementById("deliveryTime").value;
	if(parseInt(inputTime.slice(0,2))>=6 && parseInt(inputTime.slice(0,2))<=18){
		document.getElementById("deliveryTimeReminder").innerHTML="";
		return true;
	}
	else{
		document.getElementById("deliveryTimeReminder").innerHTML="Delivery times are only from 6am to 6pm.";
		return false;
	}
}
