window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    $(".navbar").css('padding-top', '0.5rem');
    $(".navbar").css('padding-bottom', '0.5rem');
  } else {
    $(".navbar").css('padding-top', '1rem');
    $(".navbar").css('padding-bottom', '1rem');
  }
}



$(document).ready(function() {
  $(this).scrollTop(0);
});




var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});



btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, '300');
});



$(document).ready(function() {

  $('.owl-carousel').owlCarousel({
    mouseDrag: false,
    loop: true,
    margin: 2,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 3
      }
    }
  });

  $('.owl-prev').click(function() {
    $active = $('.owl-item .item.show');
    $('.owl-item .item.show').removeClass('show');
    $('.owl-item .item').removeClass('next');
    $('.owl-item .item').removeClass('prev');
    $active.addClass('next');
    if ($active.is('.first')) {
      $('.owl-item .last').addClass('show');
      $('.first').addClass('next');
      $('.owl-item .last').parent().prev().children('.item').addClass('prev');
    } else {
      $active.parent().prev().children('.item').addClass('show');
      if ($active.parent().prev().children('.item').is('.first')) {
        $('.owl-item .last').addClass('prev');
      } else {
        $('.owl-item .show').parent().prev().children('.item').addClass('prev');
      }
    }
  });



  $('.owl-next').click(function() {
    $active = $('.owl-item .item.show');
    $('.owl-item .item.show').removeClass('show');
    $('.owl-item .item').removeClass('next');
    $('.owl-item .item').removeClass('prev');
    $active.addClass('prev');
    if ($active.is('.last')) {
      $('.owl-item .first').addClass('show');
      $('.owl-item .first').parent().next().children('.item').addClass('prev');
    } else {
      $active.parent().next().children('.item').addClass('show');
      if ($active.parent().next().children('.item').is('.last')) {
        $('.owl-item .first').addClass('next');
      } else {
        $('.owl-item .show').parent().next().children('.item').addClass('next');
      }
    }
  });

});



// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


// App data
const weather = {};

weather.temperature = {
  unit: "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "c01b0b990bbd85fdc3d37e93d26d3112";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
    .then(function(data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function() {
      displayWeather();
    });
}

// NEW DATE AND MONTH ADDED
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

// DISPLAY WEATHER TO UI
function displayWeather() {
  iconElement.innerHTML = `<img src="images/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9 / 5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function() {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius"
  }
});


const api = {
  key: "c01b0b990bbd85fdc3d37e93d26d3112",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
