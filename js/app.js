// Initialize Firebase
var config = {
    apiKey: "AIzaSyCAQ69TwLNNWW4TRn0zYsQV2GL2Tio4kSA",
    authDomain: "first-pro-a1a2e.firebaseapp.com",
    databaseURL: "https://first-pro-a1a2e.firebaseio.com",
    projectId: "first-pro-a1a2e",
    storageBucket: "first-pro-a1a2e.appspot.com",
    messagingSenderId: "486106310535"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
var i = 0;

//Google Maps initialization
var googlemapskey = "AIzaSyDGFGtDjFjtK0HwWh-z08kyw-WAgNSg98E";

//Coordinates
var uluru = {lat: -25.363, lng: 131.044};
var buckinghampalace = {lat: 51.501364, lng: -0.141890};
var atlanta = {lat: 33.748995, lng: -84.387982}
//   var address = "Westminster, London SW1A 1AA, UK";

var locations = [
    // uluru,
    // buckinghampalace,
    // {lat: 50.501364, lng: -0.141890},
    // {lat: 34.0470364, lng: -84.4597416},
    // atlanta
];

var locationsobj = {};


$("#test").on("click", function(event) {
    console.log("test   ");
    var result = Object.keys(locations).map(function(key) {
        return [Number(key), locations[key]];
      });
      
    console.log(result);
});


// var map;
// function initMap() {
// map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 2,
//     center: new google.maps.LatLng(2.8,-187.3),
//     mapTypeId: 'terrain'
// });

// // Create a <script> tag and set the USGS URL as the source.
// var script = document.createElement('script');
// // This example uses a local copy of the GeoJSON stored at
// // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
// script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
// document.getElementsByTagName('head')[0].appendChild(script);
// }

// // Loop through the results array and place a marker for each
// // set of coordinates.
// window.eqfeed_callback = function(results) {
// for (var i = 0; i < results.features.length; i++) {
//     var coords = results.features[i].geometry.coordinates;
//     var latLng = new google.maps.LatLng(coords[1],coords[0]);
//     var marker = new google.maps.Marker({
//     position: latLng,
//     map: map
//     });
// }
// }


//Show Map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: buckinghampalace
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });

    // Creates a marker at the position on map
    // var marker = new google.maps.Marker({
    //   position: buckinghampalace,
    //   map: map
    // });
    

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }
  
// Clear Firebase
$("#clearfirebase").on("click", function(event) {
    database.ref().remove();
    $("#Table").empty();
});

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
    // console.log(snapshot.val().length);
    console.log(snapshot.val());
    console.log(locations);
    i = snapshot.val().length;  
});

var j = 0;
// When a Firebase child is added, update your page in real-time
database.ref().on("child_added", function(snapshot) {
    // console.log(snapshot.val());
    
    var newname = snapshot.val().name;
    var newaddress = snapshot.val().address;
    var newlocation = snapshot.val().location;

    locationsobj[j] = newlocation;
    j++;

    // console.log(locations);
    // locations.push(newlocation);
    // console.log(newlocation);
    locations = Object.keys(locationsobj).map(function(key) {
        // return [Number(key), locationsobj[key]];
        return [locationsobj[key]];
      });
    // console.log(locations);

    createRow(newname,newaddress);
});

var createRow = function(name, address){
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("tbody");
    var tRow = $("<tr>");

    // create and save a reference to a td in the same statement we update its text
    var name = $("<td>").text(name);
    var address = $("<td>").text(address);

    // Append the newly created table data to the table row
    tRow.append(name,address);

    // Append the table row to the table body
    tBody.append(tRow);
  };

// This function handles events where the submit button is clicked
$("#submit").on("click", function(event) {
    console.log("Submit");
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();
    
    var name = $("#name-input").val().trim();
    var address = $("#address-input").val().trim();
    var geocodeQuery = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + googlemapskey;
    
    $.ajax({
      url: geocodeQuery,
      method: "GET"
    }).then(function(response) {
        // console.log(response);
        // console.log(response.results[0].geometry.location.lat);
        var latit = response.results[0].geometry.location.lat;
        var longi = response.results[0].geometry.location.lng;
        // console.log(response.results[0].geometry.location.lng);
        // console.log(response.results[0].formatted_address);
        var add = response.results[0].formatted_address;
        var coordinates = {lat: latit, lng: longi};

        if (address !== ""){
            // Save the new post in Firebase
            database.ref(i).set({
                name: name,
                address: add,
                location: coordinates,
                index: i
            });
            i++;
        }
    });
  
});  


// // Get the size of an object
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
//   // Get the size of an object
// var size = Object.size(myArray);