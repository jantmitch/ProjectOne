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
var googlemapskey = "AIzaSyACZMGscEwWMY3TJblK-NuIwhIRsoEaAnI";

//Coordinates
var uluru = { lat: -25.363, lng: 131.044 };
var buckinghampalace = { lat: 51.501364, lng: -0.141890 };
var atlanta = { lat: 33.748995, lng: -84.387982 }
//   var address = "Westminster, London SW1A 1AA, UK";

//Map Locations Array 
// var locations = [
//     {lat: 38.8976763, lng: -77.0365298}];
var locations = [
    // uluru,
    // buckinghampalace,
    // {lat: 50.501364, lng: -0.141890},
    // {lat: 34.0470364, lng: -84.4597416},
    // atlanta
];

var locationsobj = {};
var namesarray = [];
var namesobj = {};

//On click functions
// Clear Firebase
$("#clearfirebase").on("click", function (event) {
    database.ref().remove();
    $("#Table").empty();
    locations = [];
    namesarray = [];
});

// This function handles events where the submit button is clicked
$("#submit").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    var location = $("#location-input").val().trim();
    var geocodeQuery = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + googlemapskey;


    var repeat = false;
    if (location == ""){
        console.log("no Input");
        repeat = true;
    }
    for (i=0; i<namesarray.length; i++){
        if (namesarray[i] == location){
            console.log("name repeat");
            repeat = true;
            break;
        // } else if (coordinates == locations[i]){
        //     console.log("coordinates repeat");
        //     break;
        } else{
            // console.log("not a repeat");
        }
    }
    
    if (repeat == false) {  
        $.ajax({
        url: geocodeQuery,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            var latit = response.results[0].geometry.location.lat;
            var longi = response.results[0].geometry.location.lng;
            var add = response.results[0].formatted_address;
            var coordinates = {lat: latit, lng: longi};

            if (location !== ""){
                // Save the new post in Firebase
                database.ref(i).set({
                    name: location,
                    address: add,
                    location: coordinates,
                    index: i
                });
                i++;
            }
            // initMap();
        });
    }
  
});  


$(document).on("click", ".remove", function(){
    var del = $(this).attr("index");
    console.log(del);
    namesarray.splice(del,1);
    locations.splice(del,1);
    console.log(namesarray);
    $("#" + del).empty();
    // database.ref().update();
    if (del == 0){
        database.ref(del).child(0).remove();
        // database.ref(0).update();
    }
    database.ref(del).remove();
    database.ref(del).set(null);
});

// Save input data to Firebase and save to table

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
    // console.log(snapshot.val().length);
    // console.log(snapshot.val());
    // console.log(locations);
    i = snapshot.val().length;
    initMap();
});

var j = 0;
// When a Firebase child is added, update your page in real-time
database.ref().on("child_added", function (snapshot) {
    // console.log(snapshot.val());

    var newname = snapshot.val().name;
    var newaddress = snapshot.val().address;
    var newlocation = snapshot.val().location;
    // console.log(newlocation);
    locationsobj[j] = newlocation;
    namesobj[j] = newname;

    locations = Object.keys(locationsobj).map(function(key) {
        // return [Number(key), locationsobj[key]];
        return locationsobj[key];

      });

    namesarray = Object.keys(namesobj).map(function(key) {
        // return [Number(key), locationsobj[key]];
        return namesobj[key];
    });

    createRow(newname,newaddress,j);
    j++;
});

var cities = [];
//Create Table from Firebase
var createRow = function(name, address, index){
  
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("tbody");
    var tRow = $("<tr>").attr("id", index);

    // create and save a reference to a td in the same statement we update its text
    var name = $("<td>").text(name);
    var add = $("<td>").text(address);
    var remove = $("<td>").html("<button class='remove' index="+ index + ">X</button>");

    // Append the newly created table data to the table row

    tRow.append(name,address,remove);

    // Append the table row to the table body
    tBody.append(tRow);

    // Grab city/state. Split string by comma
    for (ind = 0; ind<address.length;ind++){
        if (address[ind] == ","){
            var city = address.slice(0,ind);
            var state = address.slice((ind+2),(ind+4));
            var cityst = city + "," + state;
            // console.log(cityst);
            cities.push(cityst);
            break;
            // console.log("comma at index: " + ind);
        }
    }

  };


//Display Maps
function initMap() {
    console.log(locations);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: atlanta
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Marker variable
    // var marker2 = new google.maps.Marker({position:atlanta});

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var marker = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Map events


    // var data;
    // map.addListener('click', function(e) {
    //     // console.log("map click");
    //     // data.lat = e.latLng.lat();
    //     // data.lng = e.latLng.lng();
    //     // addToFirebase(data);
    //   });

    google.maps.event.addListener(map, 'click', function(event) {

        console.log("map click");
        //     // placeMarker(map, event.latLng);
    });

    var infowindow = new google.maps.InfoWindow({
        content: "Hello World!"
    });

    // console.log(marker[0].getPosition());
    var breakvar = false;
    for (i=0 ; i< marker.length; i++){
        if (breakvar === true ){ 
            console.log("break");
            console.log(i);
            breakvar = false;
            break;
        }
        google.maps.event.addListener(marker[i], 'click', function () {
            console.log("marker click");
            console.log(i);
            // console.log(locations[i - 1]);

            breakvar = true;
            infowindow.open(map, marker[4]);
            // console.log(marker);
            // map.setZoom(9);
            // console.log(marker[i].getPosition());
            // map.setCenter(locations[0]);
        });
    }


    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, marker,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}


function placeMarker(map, location) {
    // var marker = new google.maps.Marker({
    //   position: location,
    //   map: map
    // });
    var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() +
            '<br>Longitude: ' + location.lng()
    });
    infowindow.open(map, marker);
}



// //Display Maps
// function initMap() {
//     console.log(locations);
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 3,
//       center: atlanta
//     });

//     // Create an array of alphabetical characters used to label the markers.
//     var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//     // Add some markers to the map.
//     // Note: The code uses the JavaScript Array.prototype.map() method to
//     // create an array of markers based on a given "locations" array.
//     // The map() method here has nothing to do with the Google Maps API.
//     var marker = locations.map(function(location, i) {
//       return new google.maps.Marker({
//         position: location,
//         label: labels[i % labels.length]
//       });
//     });

//     // Map events

//     google.maps.event.addListener(map, 'click', function(event) {
//         console.log("map click");
//     //     // placeMarker(map, event.latLng);
//         });


//     // var infowindwo
//     var infowindow = new google.maps.InfoWindow({
//         content:"Hello World!"
//     });
    
//     // var data;
//     // map.addListener('click', function(e) {
//     //     // console.log("map click");
//     //     // data.lat = e.latLng.lat();
//     //     // data.lng = e.latLng.lng();
//     //     // addToFirebase(data);
//     //   });
//     // console.log(marker[0].getPosition());

//     var breakvar = false;
//     for (ind=0 ; ind< marker.length; ind++){
//         if (breakvar === true ){ 
//             console.log("break");
//             console.log(ind);
//             breakvar = false;
//             break;
//         }
//         google.maps.event.addListener(marker[i],'click',function() {
//             console.log("marker click");
//             console.log(ind);
//             // console.log(locations[i - 1]);

//             breakvar = true;
//             // infowindow.open(map, marker[4]);
//             // console.log(marker);
//             // map.setZoom(9);
//             // console.log(marker[i].getPosition());
//             // map.setCenter(locations[0]);
//         }); 
//     }
    

//     // Add a marker clusterer to manage the markers.
//     var markerCluster = new MarkerClusterer(map, marker,
//         {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//   }


//   function placeMarker(map, location) {
//     // var marker = new google.maps.Marker({
//     //   position: location,
//     //   map: map
//     // });
//     var infowindow = new google.maps.InfoWindow({
//       content: 'Latitude: ' + location.lat() +
//       '<br>Longitude: ' + location.lng()
//     });
//     infowindow.open(map,marker);
//   } 

  

//Brewery API
var breweryLocation = [];
var locationURL = "http://beermapping.com/webservice/loccity/69532efc6359f9b54164a0a7a34c23d9/atlanta&s=json";


$.ajax({
    url: locationURL,
    method: "GET",
}).then(function (response) {
    // console.log(response);
    for (ind = 0; ind < response.length; ind++){
        var name = response[ind].name;
        var id = response[ind].id;
        var address = response[ind].street;
        var location = {
            name: name,
            id: id,
            address: address
        };
        breweryLocation.push(location);
    }
});
