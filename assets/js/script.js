// global variable for API key
var apiKey = "6b388d2d923733b00f9b381eb173ff19";

// global variable for parks API
var parksApiKey = "";

// create function to search for city and extract api data
function CityWeather(city, citySearchList) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=indianapolis" +
    "&appid=" +
    apiKey +
    "&units=imperial";
  var queryURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=indianapolis" +
    "&appid=" +
    apiKey +
    "&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET",
  })

    // create an object called weather to store api data
    .then(function (weather) {
      var nowMoment = moment();

      var displayMoment = $("<h3>");
      $("#city-name").empty();
      $("#city-name").append(
        displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
      );

      var cityName = $("<h3>").text(weather.name);
      $("#city-name").prepend(cityName);

      var weatherIcon = $("<img>");
      weatherIcon.attr(
        "src",
        "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
      );

      // use jquery to pull icons from weather api
      $("#current-icon").empty();
      $("#current-icon").append(weatherIcon);

      // use jquery to pull various weather statuses
      $("#current-temp").text("Temperature: " + weather.main.temp + " °F");

      $.ajax({
        url: queryURL2,
        method: "GET",
      }).then(function (forecast) {
        console.log(forecast);
        // Loop through the forecast for each of the five days
        for (var i = 6; i < forecast.list.length; i += 8) {
          var forecastDate = $("<h5>");
          var forecastPosition = (i + 2) / 8;

          $("#forecast-date" + forecastPosition).empty();
          $("#forecast-date" + forecastPosition).append(
            forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
          );

          var forecastIcon = $("<img>");
          forecastIcon.attr(
            "src",
            "https://openweathermap.org/img/w/" +
              forecast.list[i].weather[0].icon +
              ".png"
          );

          $("#forecast-icon" + forecastPosition).empty();
          $("#forecast-icon" + forecastPosition).append(forecastIcon);

          $("#forecast-temp" + forecastPosition).text(
            "Temp: " + forecast.list[i].main.temp + " °F"
          );
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getNpsEventForState (stateCode) {
  // get event for that day
  // make Api request
  $.ajax({
    url: "https://developer.nps.gov/api/v1/events?stateCode="+stateCode+"&api_key=tQRp1etSdbmS6An6cvaKmPBik7Ivxdpw25kqsGnf",
    method: "GET"
  }).then(function(data){
    console.log(data);
  }).catch(function (error) {
    console.error(error);
  })
  // if no event display no event
  // else display the event information

}

CityWeather();
getNpsEventForState("IN");
getNpsEventForState("WA");