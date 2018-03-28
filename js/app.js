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

//Google Maps
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: -28.024, lng: 140.887}
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
        console.log(location);
        console.log(i);
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });

    // var marker = new google.maps.Marker({
    //   position: uluru,
    //   map: map
    // });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }

    
  var uluru = {lat: -25.363, lng: 131.044};
  var locations = [
    {lat: -31.563910, lng: 147.154312},
    {lat: -33.718234, lng: 150.363181},
    {lat: -33.727111, lng: 150.371124},
    {lat: -33.848588, lng: 151.209834},
    {lat: -43.999792, lng: 170.463352},
    uluru
  ]

// Clear Firebase
$("#clearfirebase").on("click", function(event) {
    database.ref().set({});
});

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
});

// When a Firebase child is added, update your page in real-time
database.ref().on("child_added", function(snapshot) {
    console.log("Child added");
});

var createRow = function(){
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("tbody");
    var tRow = $("<tr>");

    // create and save a reference to a td in the same statement we update its text
    var HW = $("<td>").text("Hello World");

    // Append the newly created table data to the table row
    tRow.append(HW)

    // Append the table row to the table body
    tBody.append(tRow);
  };

// This function handles events where the submit button is clicked

$("#submit").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();
    
    name = $("#name-input").val().trim();

    // Save the new post in Firebase
    database.ref().push({
        name: name
      });
  
});  

// function precisionRound(number, precision) {
//     var factor = Math.pow(10, precision);
//     return Math.round(number * factor) / factor;
//   }