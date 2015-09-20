var continentCode = getContinent(7); // This will be passed in by the html 2, 5, or 7

var city;
var numTries = 0;
var fail = false;
while ((city = getRandomCity(continentCode)) < 1 && numTries < 6) {
	numTries++;
	if (numTries > 4) {
		fail = true;
	}
}

var cityInfo;
var hotelInfo;
var attractionInfo;

if (fail) {
	var backupCities = [479223, 1190272, 6677187, 297747, 3556359];
	randomNumber = Math.round(5*Math.random());
	city = backupCities[randomNumber];

	cityInfo = getCityInfo(city);
	hotelInfo = getHotelInfo(city);
	attractionInfo = getAttractionInfo(city);
	//photoInfo = getPhotoInfo(city);
} else {
	cityInfo = getCityInfo(city);
	hotelInfo = getHotelInfo(city);
	attractionInfo = getAttractionInfo(city);
	//photoInfo = getPhotoInfo(city);
}

function getRandomCity(currentCode) {
	var levelLower = 0;
	var apiString = getAPIString(currentCode, "/geos"); // Continent level
	$.ajax({
	  url: apiString,
	  dataType: 'json',
	  async: false,
	  success: function(data) {
	    var numResults = data.paging.results;
		var randomNumber = Math.round(numResults*Math.random());
		var counter = 0;
		$.each( data.data, function( key, val ) {
			if (counter == randomNumber) {
				if (val.address_obj.city == null) {
	    			levelLower = getRandomCity(val.location_id); 
		    	} else {
		    		levelLower = val.location_id;
		    	}
			}
			counter++;
		});
	  },
	  failure: function(data) {
	  	levelLower = -1;
	  }
	});

	return levelLower;
}

function getCityInfo(cityID) {
	var apiString = getAPIString(cityID, "");
	$.ajax({
	  url: apiString,
	  dataType: 'json',
	  async: false,
	  success: function(data) {
	  	var locationArray = [];
	  	document.getElementById("location_string").innerHTML = data.location_string;
	  	document.getElementById("hotel_li").innerHTML += "<a href=\""+data.see_all_hotels+"\">See All Hotels</a>";
	  	document.getElementById("attraction_li").innerHTML += "<a href=\""+data.see_all_attractions+"\">See All Attractions</a>";
	 //  	locationArray["location_string"] = data.location_string;
		// document.getElementById("location_string").innerHTML = data.location_string;
	 //  	locationArray["latitude"] = data.latitude;
	 //  	locationArray["longitude"] = data.longitude;
	 //  	locationArray["web_url"] = data.web_url;
	 //  	locationArray["hotels"] = data.see_all_hotels;
	 //  	locationArray["restaurants"] = data.see_all_hotels;
	 //  	locationArray["attractions"] = data.see_all_attractions;
	 //  	var activityArray = [];
	 //  	$.each(data.category_counts, function(key, val){
	 //  		var tempArray = [];
	 //  		$.each(val, function(ke, va) {
	 //  			tempArray[ke] = va;
	 //  		});
	 //  		activityArray[key] = tempArray;
	 //  	});

	 //  	locationArray["activities"] = activityArray;

		document.getElementById("distance").innerHTML = Math.round(distance(-90.19, 38.62, data.latitude, data.longitude, "K")) + " km";

	  	var activityArray = [];
	  	$.each(data.category_counts, function(key, val){
	  		var tempArray = [];
	  		$.each(val, function(ke, va) {
	  			tempArray[ke] = va;
	  		});
	  		activityArray[key] = tempArray;
	  	});

	  	locationArray["activities"] = activityArray;
	  	return locationArray;
	  },
	  failure: function(data) {
	  	alert("fail");
	  	return null;
	  }
	});
}

function getHotelInfo(cityID) {
	var apiString = getAPIString(cityID, "/hotels");
	$.ajax({
	  url: apiString,
	  dataType: 'json',
	  async: false,
	  success: function(data) {
	  	var hotelArray = [];

	  	document.getElementById("hotel_ul1").innerHTML += data.data[0].name+ "\t";
	  	document.getElementById("hotel_ul2").innerHTML += data.data[0].rating + " out of ";
	  	document.getElementById("hotel_ul3").innerHTML += data.data[0].num_reviews + " reviews\n";
	  	document.getElementById("hotel_ul4").innerHTML += data.data[0].price_level +"\t";
	  	document.getElementById("hotel_ul5").innerHTML += "<a href=\""+data.data[0].web_url+"\">See Hotel</a>";
	  	// $.each(data.data, function(key, val) {
	  	// 	var tempHotel = [];
	  	// 	tempHotel["rating"] = val.rating;
	  	// 	tempHotel["name"] = val.name;
	  	// 	tempHotel["num_reviews"] = val.num_reviews;
	  	// 	tempHotel["web_url"] = val.web_url;
	  	// 	tempHotel["price_level"] = val.price_level;
	  	// 	hotelArray.push(tempHotel);
	  	// });

	  	return hotelArray;
	  },
	  failure: function(data) {
	  	alert("fail");
	  	return null;
	  }
	});
}

function getAttractionInfo(cityID) {
	var apiString = getAPIString(cityID, "/attractions");
	$.ajax({
	  url: apiString,
	  dataType: 'json',
	  async: false,
	  success: function(data) {
	  	var attractionsArray = [];

	  	document.getElementById("attraction_ul1").innerHTML = data.data[0].name;
	  	document.getElementById("attraction_ul2").innerHTML = data.data[0].rating + " Stars";
	  	document.getElementById("attraction_ul3").innerHTML = data.data[0].num_reviews + "Reviews";
	  	document.getElementById("attraction_ul4").innerHTML = "<a href=\""+data.data[0].web_url+"\">See Site</a>";
	  	// $.each(data.data, function(key, val) {
	  	// 	var tempAttractions = [];
	  	// 	tempAttractions["rating"] = val.rating;
	  	// 	tempAttractions["name"] = val.name;
	  	// 	tempAttractions["num_reviews"] = val.num_reviews;
	  	// 	tempAttractions["web_url"] = val.web_url;
	  	// 	attractionsArray.push(tempAttractions);
	  	// });

	  	return attractionsArray;
	  },
	  failure: function(data) {
	  	alert("fail");
	  	return null;
	  }
	});
}

function getAPIString(locationID, type) {
	return "http://api.tripadvisor.com/api/partner/2.0/location/" + locationID + type + "?key=8B89F4BDB7F64B79A1533D6EA207C3D5";
}

function getContinent(priceRange) {
	var randomNum = Math.round(priceRange*Math.random());
	var numDollas = "";
	if (randomNum <= 2) {
		numDollas = "$";
	} else if (randomNum <= 5) {
		numDollas = "$$";
	} else {
		numDollas = "$$$";
	}
	document.getElementById("price").innerHTML = numDollas;
	var continents = [19, 291958, 13, 8, 6, 21, 2, 4];
	return continents[randomNum];
}

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

function getPhotoInfo(city){
	var apiString = getAPIString(city,"/photos");
	$.ajax({
	  url: apiString,
	  dataType: 'json',
	  async: false,
	  success: function(data) {

	  	var imageUrl = data.data[0].images.large.url;
	  	$('#body').css("background-image", "url("+imageUrl+")"); 

	  },
	  failure: function(data) {
	  	alert("fail");
	  	return null;
	  }
	});

}

$( ".learn_more" ).click(function() {
  	$('.more_info').show();
});
