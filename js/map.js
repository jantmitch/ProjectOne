// Javascript for map.html

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

//Google Maps initialization
var googlemapskey = "AIzaSyACZMGscEwWMY3TJblK-NuIwhIRsoEaAnI";

//Coordinates
var uluru = {lat: -25.363, lng: 131.044};
var buckinghampalace = {lat: 51.501364, lng: -0.141890};
var atlanta = {lat: 33.748995, lng: -84.387982};
// Initialize Firebase
var config2 = {
    apiKey: "AIzaSyA2zEy6sKcGz7Euctkzz4FpanpiDpxoAmM",
    authDomain: "first-project-brewery-map.firebaseapp.com",
    databaseURL: "https://first-project-brewery-map.firebaseio.com",
    projectId: "first-project-brewery-map",
    storageBucket: "",
    messagingSenderId: "1092161497265"
  };
  firebase.initializeApp(config2);
var database2 = firebase.database();

//Map Locations Array 
var locations = [
    // uluru,
    // buckinghampalace,
    // {lat: 50.501364, lng: -0.141890},
    // {lat: 34.0470364, lng: -84.4597416},
    // atlanta
];

var locationsobj = {};
// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
    // console.log(snapshot.val().length);
    // console.log(snapshot.val());
    // console.log(locations);
    i = snapshot.val().length;  
    initMap();
});
