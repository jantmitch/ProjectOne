// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyCAQ69TwLNNWW4TRn0zYsQV2GL2Tio4kSA",
//     authDomain: "first-pro-a1a2e.firebaseapp.com",
//     databaseURL: "https://first-pro-a1a2e.firebaseio.com",
//     projectId: "first-pro-a1a2e",
//     storageBucket: "first-pro-a1a2e.appspot.com",
//     messagingSenderId: "486106310535"
// };
// firebase.initializeApp(config);

// // Create a variable to reference the database
// var database = firebase.database();
// /**
//  * Data object to be written to Firebase.
//  */
// var data = {
//     sender: null,
//     timestamp: null,
//     lat: null,
//     lng: null
//   };

// //  * Starting point for running the program. Authenticates the user@param {function} Called when authentication succeeds.
// //  */
// function initAuthentication(onAuthSuccess) {
//   database.authAnonymously(function(error, authData) {
//     if (error) {
//       console.log('Login Failed!', error);
//     } else {
//       data.sender = authData.uid;
//       onAuthSuccess();
//     }
//   }, {remember: 'sessionOnly'});  // Users will get a new id for every session.
// }

function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }