import document from "document";
import * as messaging from "messaging";
import * as util from "../common/util";
import clock from "clock";
import document from "document";
import userSettings from "user-settings";
import { vibration } from "haptics";
import * as prefs from "../common/shared_preferences";

//import { memory } from "system";

//import { display } from "display";
//display.autoOff = false;
//display.on = true;

console.log("App Started");
var settingsKeys = [
  "bgcolor",
  "framecolor",
  "dialcolor",
  "colorhour",
  "colorminute",
  "colorsecond",
  "colorkpl",
  "colorkpd",
  "colordate",
  "showweather",
  "weatherinfo",
  "apikey",
  "kpaydata"
];
var deBug=false;
var outercolor="white";
var arccolor="green";
var imgcolor="white";
var handshcolor="#F83C40";
var handsmcolor="blue";
var handsscolor="#FFA500";
var kplabelcolor="green";
var kpdatacolor="black";
var settingsDone=false;
var currentCode=0;
var currentIsDay=true;
var currentTempC=0;
var currentTempF=0;
var prevDay=0;
var prevDate=0;
var prevHour=-1;
var prevMin=-1;
var curBpm=0;
var displayWeather=true;
var apikey="0123456789abcdef0123456789abcdef";
var saveCity="";

var weekday=["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"];

// Update the clock every second
clock.granularity = "seconds";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");
let dateView = document.getElementById("dateview");
let background = document.getElementById("background");
let frame = document.getElementById("frame");
let dial = document.getElementById("dial");
let clickMe = document.getElementById("clickme");
let temp = document.getElementById("temp");
let description = document.getElementById("description");
let city = document.getElementById("city");
let balance = document.getElementById("balance");
let nextpo = document.getElementById("nextpo");
let podate = document.getElementById("podate");
let trials = document.getElementById("trials");
var weatherCount = 0;
let socketStatus = document.getElementById("socketstatus");
function fetchKPay() {

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    if (deBug) console.log("fetchKPay api is " + apikey);
    messaging.peerSocket.send({
                 key: "kpay",
                 api: apikey
    });
  }
}

function fetchWeather() {
  if (!displayWeather) {
    return;
  }
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    if (deBug) console.log("fetchWeather");
    messaging.peerSocket.send({
                 key:"weather",
                 api:"PUT IN YOUR OWM API KEY HERE"
    });
  }
}
function setWeather(data)  {
  if (!displayWeather) {
    return;
  }
  if (deBug) console.log("Weather on device " + JSON.stringify(data));

  if (userSettings.units.distance == "us") {
    temp.text =  data.temperatureF.toFixed(1) + "°f";
  }
  else {
    temp.text = data.temperatureC.toFixed(1) + "°c";
  }
  description.text = toTitleCase(data.conditions);

  city.text = toTitleCase(data.name);
  saveCity = toTitleCase(data.name);;
}
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

clickMe.onclick = function(e) {
  if (deBug) console.log ("click");
  city.text = "Fetching KPay statistics";
  fetchKPay();
}

// Message is received
messaging.peerSocket.onmessage = evt => {
  let msg = evt.data;

  if (deBug) console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "bgcolor" && evt.data.newValue) {
    let color = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log(`Setting background color: ${color}`);
    background.style.fill = color;
    prefs.setItem("bgcolor", color);
  }
  if (evt.data.key === "framecolor" && evt.data.newValue) {
    let color = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log(`Setting dial color: ${color}`);
    frame.style.fill = color;
    prefs.setItem("framecolor", color);
  }
  if (evt.data.key === "dialcolor" && evt.data.newValue) {
    let color = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log(`Setting dial color: ${color}`);
    dial.style.fill = color;
    prefs.setItem("dialcolor", color);
  }
  if (evt.data.key === "colorhour" && evt.data.newValue) {
    let color = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log(`Setting hourhand color: ${color}`);
    handshcolor = color;
    prefs.setItem("colorhour", color);
    if (settingsDone) setWidgetColors();
  }
  if (evt.data.key === "colorminute" && evt.data.newValue) {
    let color = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log(`Setting minutehand color: ${color}`);
    handsmcolor = color;
    prefs.setItem("colorminute", color);
    if (settingsDone) setWidgetColors();
  }
  if (evt.data.key === "colorsecond" && evt.data.newValue) {
    let color = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log(`Setting secondhand color: ${color}`);
    handsscolor = color;
    prefs.setItem("colorsecond", color);
    if (settingsDone) setWidgetColors();
  }
  if (evt.data.key === "colorkpl" && evt.data.newValue) {
    let color = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log(`Setting secondhand color: ${color}`);
    kplabelcolor = color;
    prefs.setItem("colorkpl", color);
    if (settingsDone) setWidgetColors();
  }
  if (evt.data.key === "colorkpd" && evt.data.newValue) {
    let color = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log(`Setting secondhand color: ${color}`);
    kpdatacolor = color;
    prefs.setItem("colorkpd", color);
    if (settingsDone) setWidgetColors();
  }
  if (evt.data.key === "colordate" && evt.data.newValue) {
    let color = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log(`Setting text color: ${color}`);
    dateView.style.fill = color;
    temp.style.fill = color;
    description.style.fill = color;
    city.style.fill = color;
    socketStatus.style.fill = color;
    prefs.setItem("colordate", color);
  }

  if (evt.data.key === "showweather" && evt.data.newValue) {
    let number = util.stripQuotes(evt.data.newValue);
    if (deBug) console.log("Setting weather display: " + number);
    prefs.setItem("showweather", number);
    if (number == "false") {
      displayWeather = false;
      temp.style.display = "none";
      description.style.display = "none";
      city.style.display= "none";
    }
    else {
      temp.style.display = "inline";
      description.style.display = "inline";
      city.style.display= "inline";
      if (settingsDone) fetchWeather();
      displayWeather = true;
    }
  }
  if (evt.data.key === "weatherinfo") {
    prefs.setItem("weatherinfo", evt.data);
    setWeather(evt.data);
  }
  if (evt.data.key === "apikey") {
    let data = JSON.parse(evt.data.newValue);
    let lr=data.name;
    if (deBug) console.log(`Setting api key for kpay ${lr}`);
    apikey = lr;
    prefs.setItem("apikey", apikey);
    if (settingsDone) fetchKPay();
  }
  if (evt.data.key === "kpaydata") {
    prefs.setItem("kpaydata", evt.data);
    setKPay(evt.data);
  }
  if (evt.data.key === "settingsready") {
    setWidgetColors();
    fetchWeather();
    fetchKPay();
    setInterval(function() {
      fetchKPay();
    }, 1000*60*5);

    settingsDone = true;
  }
};
function getLocalStorage() {
  var i = 0;
  var val;
  var x = settingsKeys.length;
  for (i = 0; i < x; i++) {
    val = prefs.getItem(settingsKeys[i]);
    if (val) doSettings (settingsKeys[i], val);
  }
  setWidgetColors();
}
function doSettings (key, value) {
  if (key === "bgcolor") {
    let color = value;
    if (deBug) console.log(`Setting spf background color: ${color}`);
    background.style.fill = color;
  }
  if (key === "framecolor") {
    let color = value;
    if (deBug) console.log(`Setting spf dial color: ${color}`);
    frame.style.fill = color;
  }
  if (key === "dialcolor") {
    let color = value;
    if (deBug) console.log(`Setting spf dial color: ${color}`);
    dial.style.fill = color;
  }
  if (key === "colorhour") {
    let color = value;
    if (deBug) console.log(`Setting spf hourhand color: ${color}`);
    handshcolor = color;
  }
  if (key === "colorminute") {
    let color = value;
    if (deBug) console.log(`Setting spf minutehand color: ${color}`);
    handsmcolor = color;
  }
  if (key === "colorsecond") {
    let color = value;
    if (deBug) console.log(`Setting spf secondhand color: ${color}`);
    handsscolor = color;
  }
  if (key === "colorkpl") {
    let color = value;
    if (deBug) console.log(`Setting spf kpaylabel color: ${color}`);
    kplabelcolor = color;
  }
  if (key === "colorkpd") {
    let color = value;
    if (deBug) console.log(`Setting spf kpaydata color: ${color}`);
    kpdatacolor = color;
  }
  if (key === "colordate") {
    let color = value;
    if (deBug) console.log(`Setting spf text color: ${color}`);
    dateView.style.fill = color;
    temp.style.fill = color;
    description.style.fill = color;
    city.style.fill = color;
    socketStatus.style.fill = color;
  }

  if (key === "showweather") {
    let number = value;
    if (deBug) console.log("Setting spf  weather display: " + number);
    if (number == "false") {
      displayWeather = false;
      temp.style.display  = "none";
      description.style.display = "none";
      city.style.display= "none";
    }
    else {
      temp.style.display = "inline";
      description.style.display = "inline";
      city.style.display= "inline";
      if (settingsDone) fetchWeather();
      displayWeather = true;
    }
  }
  if (key === "weatherinfo") {
    setWeather(value);
  }
  if (key === "apikey") {
    if (deBug) console.log(`Setting api key for kpay ${value}`);
    apikey = value;
  }
  if (key === "kpaydata") {
    setKPay(value);
  }
}
function setKPay(data) {
  var x = Number (data.balance);
  balance.text = parseFloat(Math.round(x * 100) / 100).toFixed(2);
  x = Number(data.nextPayout);
  nextpo.text = parseFloat(Math.round(x * 100) / 100).toFixed(2);
  if (userSettings.units.distance == "us") {
    let stringetje = data.payoutDate.substring(5,7) +
                     "-" +
                     data.payoutDate.substring(8,10);
  }
  else {
    let stringetje = data.payoutDate.substring(8,10) +
                     "-" +
                     data.payoutDate.substring(5,7);
  }
  podate.text = stringetje;
  trials.text = data.numberOfTrials;
  city.text = saveCity;
}
function setWidgetColors() {
  var i = 0;
  var elements = document.getElementsByClassName("kplabels");
  for (i=0; i < elements.length; i++) {
    elements[i].style.fill = kplabelcolor;
  }
  var elements = document.getElementsByClassName("kpinfo");
  for (i=0; i < elements.length; i++) {
    elements[i].style.fill = kpdatacolor;
  }
  var elements = document.getElementsByClassName("handh");
  for (i=0; i < elements.length; i++) {
    elements[i].style.fill = handshcolor;
  }
  var elements = document.getElementsByClassName("handm");
  for (i=0; i < elements.length; i++) {
    elements[i].style.fill = handsmcolor;
  }
  var elements = document.getElementsByClassName("hands");
  for (i=0; i < elements.length; i++) {
    elements[i].style.fill = handsscolor;
  }
}
// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
  //socketStatus.text = "ConOK";
  //vibration.start("confirmation");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
  //socketStatus.text = "NoCon";
  //vibration.start("confirmation-max");
};

function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  let date = today.getDate();
  let day  = today.getDay();

  let datestring = weekday[day] + " " + date;
  dateView.text = datestring;

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
  if (prevHour != hours) {
    weatherCount++;
    prevHour = hours;
    if (weatherCount > 2) {
      weatherCount = 0;
      fetchWeather();
    }
  }
  // console.log("JS memory: " + memory.js.used + "/" + memory.js.total);
}

// Update the clock every tick event
clock.ontick = () => updateClock();
getLocalStorage();


