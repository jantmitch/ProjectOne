// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBIevTR-mQFdjL0Up4vopFmlROoboi0p9I",
    authDomain: "test-4e111.firebaseapp.com",
    databaseURL: "https://test-4e111.firebaseio.com",
    projectId: "test-4e111",
    storageBucket: "test-4e111.appspot.com",
    messagingSenderId: "50749461627"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();


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