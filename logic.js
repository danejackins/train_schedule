$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDNfA0Gq22d8oo09-up1-Zz6h_6764T-mA",
    authDomain: "train-project-13636.firebaseapp.com",
    databaseURL: "https://train-project-13636.firebaseio.com",
    projectId: "train-project-13636",
    storageBucket: "",
    messagingSenderId: "459209724381"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#add-train').on('click', function(event) {
  event.preventDefault();

  var trainName = $('#train-name').val().trim();
  var destination = $('#destination').val().trim();
  var firstTrainTime = $('#first-train-time').val().trim();
  var frequency = $('#frequency').val().trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  }

  database.ref().push(newTrain)

  var trainName = $('#train-name').val(null);
  var destination = $('#destination').val(null);
  var firstTrainTime = $('#first-train-time').val(null);
  var frequency = $('#frequency').val(null);
  });

  database.ref().on('child_added', function(childSnapshot, prevChildKey) {
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;

  var frequency = parseInt(frequency);
  // Subtracts one year so looking at same day but not the future
  var trainTimeConvert = moment(firstTrainTime, 'hh:mm A').subtract(1, 'year');
  var currentTime = moment();
  var diffTime = moment().diff(moment(trainTimeConvert), 'minutes');
  var tRemainder = diffTime % frequency;
  var minutesUntilNext = frequency - tRemainder;

  var nextTrain = moment().add(minutesUntilNext, 'minutes');
  var nextTrainTimePretty = moment(nextTrainTimePretty).format('hh:mm A')

  $('#train-table > tbody').append(
    '<tr>' + 
    '<td>' + trainName +
    '<td>' + destination +
    '<td>' + frequency +
    '<td>' + nextTrainTimePretty +
    '<td>' + minutesUntilNext
  )
  });
});