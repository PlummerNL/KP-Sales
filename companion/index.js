import { me } from "companion"
import * as messaging from "messaging";
import { geolocation } from "geolocation";
import { settingsStorage } from "settings";
import companion from "companion";

console.log("Companion Started");

var deBug = false;
var API_KEY = "";
var lat;
var lon;
var apikey;
const MILLISECONDS_PER_HOUR = 1000 * 60 * 60

companion.wakeInterval = 0.25 * MILLISECONDS_PER_HOUR;

companion.onwakeinterval = (event) => {
  if (deBug) console.log("companion is already running; wake event fired.");
  notifyDevice();
}
if (companion.launchReasons.wokenUp) {
  if (debug) console.log("Launch reason: companion has been #woke");
  notifyDevice();
}

function notifyDevice() {
  let data = {
    key: "awake",
    newValue: "now"
  };
  sendVal(data);  
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  restoreSettings();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

// Restore any previously saved settings and send to the device

function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
  // Let the device know settings are done
  let data = {
  key: "settingsready",
  newValue: "done"
  };
  sendVal(data);
}
// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

// Listen for messages from the device

messaging.peerSocket.onmessage = function(evt) {

  let msg = evt.data;

  if (evt.data && evt.data.key == "kpay" ) {
    // The device requested kpay data
    if (deBug) console.log("api key is " + (evt.data.api));
    apikey = evt.data.api;
    queryKPay();
  }
  
  if (evt.data && evt.data.key == "weather" ) {
    // The device requested weather data
    if (deBug) console.log("api key is " + (evt.data.api));
    API_KEY = evt.data.api;
    geolocation.getCurrentPosition(locationSuccess, locationError);
  }
}

function queryOwm() {

  var url = "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat + "&lon=" + lon +"&appid=" + API_KEY;    
  if (deBug) console.log("url is " + url);
  fetch(url)
  .then(function (response) {
      response.json()
      .then(function(data) {

        var description = data.weather[0].description;
        
        var weather = {
          key: "weatherinfo",
          conditions: description,
          isDay: (data.dt > data.sys.sunrise && data.dt < data.sys.sunset),
          temperatureC : data.main.temp - 273.15,
          temperatureF : (data.main.temp - 273.15)*9/5 + 32, 
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          name: data.name
        }
        // Send the weather data to the device
        
        if (deBug) console.log("weather is: " + JSON.stringify(weather));
        sendVal(weather);
      });
  })
  .catch(function (err) {
    if (deBug) console.log("Error fetching weather data: " + err);
  });
}


function locationSuccess(position) {
  if (deBug) console.log("Latitude: " + position.coords.latitude,
              "Longitude: " + position.coords.longitude);
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  queryOwm();
}

function locationError(error) {
  if (deBug) console.log("Error: " + error.code,
              "Message: " + error.message);
}

function queryKPay() {

  var url = "https://kiezelpay.com/api/merchant/summary?key=" + apikey;    
  if (deBug) console.log("url is " + url);
  fetch(url)
  .then(function (response) {
      response.json()
      .then(function(data) {
        var kpaydata = {
          key: "kpaydata",
          balance: data.currentBalance,
          nextPayout: data.nextPayout.amount,
          payoutDate: data.nextPayout.date,
          numberOfTrials : data.totalActiveTrials
        }
        
        // Send the kpay data to the device
        
        if (deBug) console.log("kpaydata is: " + JSON.stringify(kpaydata));
        sendVal(kpaydata);
      });
  })
  .catch(function (err) {
    if (deBug) console.log("Error fetching weather data: " + err);
  });
}

