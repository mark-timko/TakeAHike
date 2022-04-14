 // global variable for API key
 var apiKey = "6b388d2d923733b00f9b381eb173ff19"

 // global variable for parks API
 var parksApiKey = ""
  
 // create function to search for city and extract api data
 function CityWeather(city, citySearchList) {
   //cityList(citySearchList);
 
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
 
   var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
 
  var queryURL3 = "";

   // define lat/lon as variables to use in weather api
   var latitude;
   var longitude;
 
   $.ajax({
     url: queryURL,
     method: "GET"
   })

     // create an object called weather to store api data
     .then(function(weather) {
        console.log(weather);
       var nowMoment = moment();
      $("#disp-date").empty().text(nowMoment.format("MM/DD/YYYY"));
      $("#city-name").empty().text(weather.name);


      // var displayMoment = $("<h3>");
      // $("#city-name").empty();
      // $("#city-name").append(displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")"));
 
      //  var cityName = $("<h3>").text(weather.name);
      //  $("#city-name").prepend(cityName);
 
       var weatherIcon = $("#weather_icon");
       weatherIcon.attr("src", "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png");
      console.log(weather.weather[0].icon);

       // use jquery to pull icons from weather api
       $("#current-icon").empty();
       $("#current-icon").append(weatherIcon);
 
       // use jquery to pull various weather statuses 
       $("#current-temp").text("Temperature: " + weather.main.temp + " °F");
       $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");
       $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");
 
       latitude = weather.coord.lat;
       longitude = weather.coord.lon;
 
       $.ajax({
         url: queryURL3,
         method: "GET"

       // Create object called UVIndex and store data inside it
       }).then(function(uvIndex) {
         console.log(uvIndex);
 
         var uvIndexDisplay = $("<button>");
         uvIndexDisplay.addClass("btn btn-danger");
 
         $("#current-uv").text("UV Index: ");
         $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));
         console.log(uvIndex[0].value);
 
         $.ajax({
           url: queryURL2,
           method: "GET"

           // create object called forecast and store data inside it
         }).then(function(forecast) {
           console.log(queryURL2);
 
           console.log(forecast);
           
          
           // Loop through the forecast for each of the five days 
           for (var i = 6; i < forecast.list.length; i += 8) {
             var forecastDate = $("<h5>");
             var forecastPosition = (i + 2) / 8;
 
             $("#forecast-date" + forecastPosition).empty();
             $("#forecast-date" + forecastPosition).append(forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY")));
 
             var forecastIcon = $("<img>");
             forecastIcon.attr("src", "https://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png");
 
             $("#forecast-icon" + forecastPosition).empty();
             $("#forecast-icon" + forecastPosition).append(forecastIcon);
 
             $("#forecast-temp" + forecastPosition).text("Temp: " + forecast.list[i].main.temp + " °F");
           }
         });
       });
     });
 }

 CityWeather("Indianapolis",null);