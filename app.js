const express = require("express");
const https = require("https");
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({
  extended: true;
}));



app.use(express.static(__dirname + '/public'));



app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req, res) {
  const city = req.body.cityName;
  const apiKey = "c01b0b990bbd85fdc3d37e93d26d3112"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const discription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


      res.write("<h1>The Temperature in " + city + " is " + temp + " degrees celsius.</h1>");
      res.write("<p><br> The weather is " + discription + "</p>");
      res.write("<img src='" + imageURL + "'>")
      res.send();
    });
  });
});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
