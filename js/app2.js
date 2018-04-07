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

// Create an array of alphabetical characters used to label the markers.
// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var labels = [];
for (l = 0; l< 100;l++){
    labels.push(String(l));
}

//Map Locations Array 

var atlanta = {lat: 33.748995, lng: -84.387982};
var locations = [];
var locationsobj = {};
var namesarray = [];
var namesobj = {};
var brewsobj = {};

//On click functions
// Clear Firebase
$("#clearfirebase").on("click", function(event) {
    database.ref().remove();
    $("#locationstable").empty();
    $("#BreweryTable").empty();
    locations = [];
    namesarray = [];
    i=0;
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
    for (k=0; k<namesarray.length; k++){
        if (namesarray[k] == location){
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
            // console.log(response);
            var latit = response.results[0].geometry.location.lat;
            var longi = response.results[0].geometry.location.lng;
            var add = response.results[0].formatted_address;
            var coordinates = {lat: latit, lng: longi};

            if (location !== ""){
                // Save the new post in Firebase
                // database.ref(i).set({
                database.ref(i).set({
                    name: location,
                    address: add,
                    location: coordinates,
                    index: i
                });
            }
            // initMap();
        });
    }
});  


var citiesobj = {};

function loctable() {
    // console.log(citiesobj);
    // console.log(brewsobj);
    $("#BreweryTable").empty();
    $("#locationstable").empty();
    for (i=0; i< citiesobj.length; i++){
        createRow(citiesobj[i].name,citiesobj[i].address, citiesobj[i].index)
    }

}

$("#beer").on("click", function(event) {
    // console.log(cities);
    breweryInfo.locator(cities[0]);
    console.log(breweryLocation);
    locations = [];
    showbrews();
    // console.log(breweryLocation[0].address);
});  

function showbrews() {
    for (i=0;i<breweryLocation.length;i++){
        // var breweryaddress = (breweryLocation[i].address + " " + cities[i]);
        var breweryaddress = breweryLocation[i].address +""+ cities[0];
        brewQuery(breweryLocation[i].name, breweryaddress , i);    
    }
    
    locations = Object.keys(brewerylocs).map(function(key) {
        // return [Number(key), locationsobj[key]];
        return brewerylocs[key];
      });

    initMap();
}

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
    // console.log(snapshot.val());
    citiesobj = snapshot.val();
    // console.log(citiesobj);
    // console.
    // brewsobj = snapshot.val().breweries;
    // console.log(breweryLocation);

    // i = citiesobj.length; 
    // console.log(i);
    i = snapshot.val().length; 
    loctable();
    initMap();
});

var j = 0;
// When a Firebase child is added, update your page in real-time
database.ref().on("child_added", function(snapshot) {
    // console.log(snapshot.val());
    // console.log(i);
    // console.log()
    // for (i=0; i<snapshot.val().length; i++){
    //     var newname = snapshot.val()[i].name;
    //     var newaddress = snapshot.val()[i].address;
    //     var newlocation = snapshot.val()[i].location;
    //     // console.log(newname);
    //     locationsobj[i] = newlocation;
    //     namesobj[i] = newname;
    //     createRow(newname,newaddress,i);
    // }
    // loctable();
    var newname = snapshot.val().name;
    var newaddress = snapshot.val().address;
    var newlocation = snapshot.val().location;
    createRow(newname,newaddress,j);
    locationsobj[j] = newlocation;
    namesobj[j] = newname;
    // console.log(locationsobj);

    locations = Object.keys(locationsobj).map(function(key) {
        // return [Number(key), locationsobj[key]];
        return locationsobj[key];
      });

    namesarray = Object.keys(namesobj).map(function(key) {
        // return [Number(key), locationsobj[key]];
        return namesobj[key];
    });
    j++;
});


var cities = [];
//Create Table from Firebase
var createRow = function(name, address, index){
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("#locationstable");
    var tRow = $("<tr>").attr("id", index);

    // create and save a reference to a td in the same statement we update its text
    var name = $("<td>").text(name);
    var add = $("<td>").text(address);
    // var remove = $("<td>").html("<button class='remove' index="+ index + ">X</button>");
    var index = $("<td>").text(index);

    // Append the newly created table data to the table row
    tRow.append(name,address,index);

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
    // console.log(locations);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: atlanta
    });

    
    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var marker = locations.map(function(location, i) {
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
        content:"Hello World!"
    });
    
    // console.log(marker[0].getPosition());
    var breakvar = false;
    // for (testind=0 ; testind< marker.length; testind++){
    //     if (breakvar == true ){ 
    //         console.log("break");
    //         console.log(testind);
    //         breakvar = false;
    //         break;
    //     }
        
        google.maps.event.addListener(marker,'click',function() {
            console.log("marker click");
            // console.log(testind);
            breakvar = true;
            
            // infowindow.open(map, marker[4]);
            // console.log(marker);
            // map.setZoom(9);
            // console.log(marker[i].getPosition());
            // map.setCenter(locations[0]); 
        });
    // }
    

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, marker,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
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
    infowindow.open(map,marker);
  } 


// Beer Mapping API
var breweryLocation = [];
var breweryInfo = {
    // userLocation: $("#location-input").val(),
    locator(input) {
        var locationURL = "http://beermapping.com/webservice/loccity/69532efc6359f9b54164a0a7a34c23d9/" + input + "&s=json";
        // console.log(locationURL);
        $.ajax({
            url: locationURL,
            method: "GET",
        }).then(function (response) {
            // console.log(response);
            for (ind = 0; ind < 26 && ind < response.length; ind++){
                var name = response[ind].name;
                var id = response[ind].id;
                var address = response[ind].street;
                var location = {
                    name: name,
                    id: id,
                    address: address
                };
                breweryLocation[ind] = location;
            }
        })
        // brewsobj = breweryLocation;
    }
};

var breweryRow = function(index, name, address,coordinates){
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("#BreweryTable");
    var tRow = $("<tr>").attr("id", index);

    // create and save a reference to a td in the same statement we update its text
    var ind = $("<td>").text(index);
    var name = $("<td>").text(name);
    var add = $("<td>").text(address);
    var coord = $("<td>").text(coordinates);

    // Append the newly created table data to the table row
    tRow.append(ind,name,address,coord);

    // Append the table row to the table body
    tBody.append(tRow);

  };

  var brewerylocs = [];
  function brewQuery(brewname, addr, ind) {
    var breweryQuery = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addr + "&key=" + googlemapskey;
    $.ajax({
        url: breweryQuery,
        method: "GET",
    }).then(function (response) {
        var latit = response.results[0].geometry.location.lat;
        var longi = response.results[0].geometry.location.lng;
        var add = response.results[0].formatted_address;
        var coordinates = {lat: latit, lng: longi};
        var coord = JSON.stringify(coordinates);
        brewerylocs[ind] = coordinates;

        // database.ref('breweries/'+ ind).set({
        //     name: brewname,
        //     address: add,
        //     location: coordinates,
        //     index: ind
        // });
        breweryRow(ind,brewname,add, coord);
    });
}