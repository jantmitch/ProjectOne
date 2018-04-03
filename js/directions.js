//alert("linked")

//https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyAor-IbYJeG03Wv8cBP9Q_5a_lywwVJ4Pc

var apiKey = "AIzaSyAor-IbYJeG03Wv8cBP9Q_5a_lywwVJ4Pc"
var baseURL = "https://maps.googleapis.com/maps/api/directions/json?origin="
var origin = "atlanta"
var destination = "marietta"

//url = baseURL + origin + '&destination=' + destination + '&key=' + apiKey



$.ajax({
    url: baseURL + origin + '&destination=' + destination + '&key=' + apiKey,
    method: 'GET'
    

})
