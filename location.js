var userLat = 0; 
var userLong = 0;

window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    userLat = startPos.coords.latitude;
    userLong = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};

var weatherCall = "api.openweathermap.org/data/2.5/weather?lat="+userLat+"&lon="+userLong; 

$.ajax({
	url: weatherCall,
	dataType: 'json',
	success: function(data){
		var temp = data.main.temp ; 
		alert(temp);
	}
});