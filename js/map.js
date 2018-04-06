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

//Map Locations Array 

var breweryRow = function(name, address, index){
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("tbody");
    var tRow = $("<tr>").attr("id", index);

    // create and save a reference to a td in the same statement we update its text
    var ind = $("<td>").text(index);
    var name = $("<td>").text(name);
    var add = $("<td>").text(address);

    // Append the newly created table data to the table row
    tRow.append(ind,name,address);

    // Append the table row to the table body
    tBody.append(tRow);

  };