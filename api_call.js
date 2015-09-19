var continents = [2, 4, 6, 8, 13, 19, 21, 291958];
var randomNumber = Math.round(7*Math.random());
var continentCode = continents[randomNumber];

var apiString = getAPIString(continentCode, "/geos"); // Continent level
$.getJSON( apiString).done(function(data) {
	var numResults = data.paging.results;
	var randomNumber = Math.round(numResults*Math.random());
	var counter = 0;
	$.each( data.data, function( key, val ) {
    	if (counter == randomNumber) {
    		apiString = getAPIString(val.location_id, "/geos"); // Country level
    		$.getJSON( apiString).done(function(data) {
				// Set best
				$.each( data.data, function( key, val ) {
					alert(val.location_id);
					// alert(val.location_id);
			    	// If better than current best, replace
				});
				// Return the best attraction
			});
    	}
 		counter++;
	});
});

function getAPIString(locationID, type) {
	return "http://api.tripadvisor.com/api/partner/2.0/location/" + locationID + type + "?key=HackTripAdvisor-ade29ff43aed";
}