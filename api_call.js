var continents = [2, 4, 6, 8, 13, 19, 21, 291958];
var randomNumber = Math.round(7*Math.random());
var continentCode = continents[randomNumber];

var city;
var numTries = 0;
var fail = false;
while ((city = getRandomLevelLower(continentCode)) < 1 && numTries < 6) {
	numTries++;
	if (numTries > 4) {
		fail = true;
	}
}
if (!fail) {
	cityInfo = getCityInfo(city);
	hotelInfo = getHotelInfo(city);
	attractionInfo = getAttractionInfo(city);
}
// Get city info, hotel info, attractions

function getRandomLevelLower(currentCode) {
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
	    			levelLower = getRandomLevelLower(val.location_id); 
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
	  		alert(val.name);
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