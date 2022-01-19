var button = $("#button-addon1");
const m = moment();
var sHistory = [];
var latLong = [];
var cityZip = [];

var fdf1 = $("#fdf-1");
var fdf2 = $("#fdf-2");
var fdf3 = $("#fdf-3");
var fdf4 = $("#fdf-4");
var fdf5 = $("#fdf-5");
var temp1 = $("#fd-temp1");
var temp2 = $("#fd-temp2");
var temp3 = $("#fd-temp3");
var temp4 = $("#fd-temp4");
var temp5 = $("#fd-temp5");

var hum1 = $("#fd-hum1");
var hum2 = $("#fd-hum2");
var hum3 = $("#fd-hum3");
var hum4 = $("#fd-hum4");
var hum5 = $("#fd-hum5");

$(button).on("click", function () {
  // In this case, the "this" keyword refers to the button that was clicked
  var zip = $.trim($(".form-control").val());
  console.log(zip + "first");
  cityZip.push(zip);
  localStorage.setItem("zip-history", zip);
  console.log(localStorage.getItem("zip-history"));
  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zip +
    "&units=imperial&APPID=8b56516a3d32f8be50c3c2b2e0638ee8";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // After the data comes back from the API
    .then(function (response) {
      var lat = JSON.stringify(response.coord.lat);
      var long = JSON.stringify(response.coord.lon);
      latLong.push(lat);
      latLong.push(long);
      var currentDate = m.format("L");
      var cityClone = $("#city-history").clone();
      sHistory.push(zip);
      var currentIcon = response.weather.icon;
      localStorage.setItem("s-history", JSON.stringify(sHistory));
      sHistory = JSON.parse(localStorage.getItem("s-history"));
      for (i = 0; i < sHistory.length; i++) {
        $("#city-history").text(sHistory[i].trim());
        cityClone
          .css("border-bottom", "1px solid lightgrey", "center")
          .appendTo("#search-history");
      }
      $("#city-name").text(response.name + "  (" + currentDate + ")");
      $("#city-temp").text("Temperature: " + response.main.temp + " °F");
      $("#city-hum").text("Humidity: " + response.main.humidity + "%");
      $("#wind-speed").text("Wind Speed: " + response.wind.speed);

      uvCall();

      fiveDay(zip);
    });
});

// re-searches clicked search history zip codes
$("#search-history").on("click", function (e) {
  var zip = $(e.target).text();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zip +
    "&units=imperial&APPID=8b56516a3d32f8be50c3c2b2e0638ee8";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // After the data comes back from the API
    .then(function (response) {
      var lat = JSON.stringify(response.coord.lat);
      var long = JSON.stringify(response.coord.lon);
      latLong.push(lat);
      latLong.push(long);
      var currentDate = m.format("L");
      $("#city-name").text(response.name + "  (" + currentDate + ")");
      $("#city-temp").text("Temperature: " + response.main.temp + " °F");
      $("#city-hum").text("Humidity: " + response.main.humidity + "%");
      $("#wind-speed").text("Wind Speed: " + response.wind.speed);

      console.log(text + "zip clicked");

      uvCall();

      fiveDay(zip);
    });
});

function uvCall() {
  var latitude = latLong[0];
  var longitude = latLong[1];

  var uvApi =
    "https://api.openweathermap.org/data/2.5/uvi?appid=8b56516a3d32f8be50c3c2b2e0638ee8&lat=" +
    latitude +
    "&lon=" +
    longitude;

  $.ajax({
    url: uvApi,
    method: "GET",
  })
    // After the data comes back from the API
    .then(function (response) {
      $("#uv-index").text("UV Index: " + response.value);
    });
}

// calls fiveday forecast and links it to elements
function fiveDay(zip) {
  var fdApi =
    "https://api.openweathermap.org/data/2.5/forecast?zip=" +
    zip +
    "&units=imperial&APPID=8b56516a3d32f8be50c3c2b2e0638ee8";

  $.ajax({
    url: fdApi,
    method: "GET",
  })
    // After the data comes back from the API
    .then(function (response) {
      console.log(response);
      var f1 = response.list[0].dt_txt;
      f1 = f1.substring(0, f1.length - 9);
      var f2 = response.list[7].dt_txt;
      f2 = f2.substring(0, f2.length - 9);
      var f3 = response.list[14].dt_txt;
      f3 = f3.substring(0, f3.length - 9);
      var f4 = response.list[23].dt_txt;
      f4 = f4.substring(0, f4.length - 9);
      var f5 = response.list[31].dt_txt;
      f5 = f5.substring(0, f5.length - 9);

      fdf1.text(f1);
      fdf2.text(f2);
      fdf3.text(f3);
      fdf4.text(f4);
      fdf5.text(f5);

      var t1 = "Temp: " + response.list[0].main.temp + " °F";
      var t2 = "Temp: " + response.list[7].main.temp + " °F";
      var t3 = "Temp: " + response.list[14].main.temp + " °F";
      var t4 = "Temp: " + response.list[23].main.temp + " °F";
      var t5 = "Temp: " + response.list[31].main.temp + " °F";

      temp1.text(t1);
      temp2.text(t2);
      temp3.text(t3);
      temp4.text(t4);
      temp5.text(t5);

      var h1 = "Humidity: " + response.list[0].main.humidity + "%";
      var h2 = "Humidity: " + response.list[7].main.humidity + "%";
      var h3 = "Humidity: " + response.list[14].main.humidity + "%";
      var h4 = "Humidity: " + response.list[23].main.humidity + "%";
      var h5 = "Humidity: " + response.list[31].main.humidity + "%";

      hum1.text(h1);
      hum2.text(h2);
      hum3.text(h3);
      hum4.text(h4);
      hum5.text(h5);

      const icon1 = document.querySelector("#fd-icon1");
      const icon2 = document.querySelector("#fd-icon2");
      const icon3 = document.querySelector("#fd-icon3");
      const icon4 = document.querySelector("#fd-icon4");
      const icon5 = document.querySelector("#fd-icon5");

      const icon0 = response.list[0].weather[0].icon;
      const icon7 = response.list[7].weather[0].icon;
      const icon14 = response.list[14].weather[0].icon;
      const icon23 = response.list[23].weather[0].icon;
      const icon31 = response.list[31].weather[0].icon;

      icon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon0}.png">`;
      icon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon7}.png">`;
      icon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon14}.png">`;
      icon4.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon23}.png">`;
      icon5.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon31}.png">`;
    });
}

$(document).ready(function () {
  var zipHistory = localStorage.getItem("zip-history");
  var n = 5;
  var zip = zipHistory.slice(0, n);
  console.log(zip + " on ready");
  if (localStorage.getItem("zip-history")) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
      zip +
      "&units=imperial&APPID=8b56516a3d32f8be50c3c2b2e0638ee8";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // After the data comes back from the API
      .then(function (response) {
        var lat = JSON.stringify(response.coord.lat);
        var long = JSON.stringify(response.coord.lon);
        latLong.push(lat);
        latLong.push(long);
        var currentDate = m.format("L");
        var cityClone = $("#city-history").clone();
        sHistory.push(zip);
        localStorage.setItem("s-history", JSON.stringify(sHistory));
        sHistory = JSON.parse(localStorage.getItem("s-history"));
        for (i = 0; i < sHistory.length; i++) {
          $("#city-history").text(sHistory[i].trim());
          cityClone
            .css("border-bottom", "1px solid lightgrey")
            .appendTo("#search-history");
        }
        $("#city-name").text(response.name + "  (" + currentDate + ")");
        $("#city-temp").text("Temperature: " + response.main.temp + " °F");
        $("#city-hum").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed);

        uvCall();

        fiveDay(zip);
      });
  } else {
    console.log("fart");
  }
});
