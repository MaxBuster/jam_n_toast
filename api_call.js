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

if (fail) {
	var backupCities = [479223, 1190272, 6677187, 297747, 3556359];
	randomNumber = Math.round(5*Math.random());
	backupCity = backupCities[randomNumber];

	cityInfo = getCityInfo(backupCity);
	hotelInfo = getHotelInfo(backupCity);
	attractionInfo = getAttractionInfo(backupCity);
} else {
	cityInfo = getCityInfo(city);
	hotelInfo = getHotelInfo(city);
	attractionInfo = getAttractionInfo(city);
}
// Send these to the html page

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

	  	locationArray["location_string"] = data.location_string;
	  	locationArray["latitude"] = data.latitude;
	  	locationArray["longitude"] = data.longitude;
	  	locationArray["web_url"] = data.web_url;
	  	locationArray["hotels"] = data.see_all_hotels;
	  	locationArray["restaurants"] = data.see_all_hotels;
	  	locationArray["attractions"] = data.see_all_attractions;
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
	  	$.each(data.data, function(key, val) {
	  		var tempHotel = [];
	  		tempHotel["rating"] = val.rating;
	  		tempHotel["name"] = val.name;
	  		tempHotel["num_reviews"] = val.num_reviews;
	  		tempHotel["web_url"] = val.web_url;
	  		tempHotel["price_level"] = val.price_level;
	  		hotelArray.push(tempHotel);
	  	});

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
	  	$.each(data.data, function(key, val) {
	  		var tempAttractions = [];
	  		tempAttractions["rating"] = val.rating;
	  		tempAttractions["name"] = val.name;
	  		tempAttractions["num_reviews"] = val.num_reviews;
	  		tempAttractions["web_url"] = val.web_url;
	  		attractionsArray.push(tempAttractions);
	  	});

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
	var continents = [19, 291958, 13, 8, 6, 21, 2, 4];
	return continents[randomNum];
}