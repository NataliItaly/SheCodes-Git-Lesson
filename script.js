const city = document.querySelector(".city");
const cityInput = document.querySelector("#city-input");
const dateBlock = document.querySelector(".date");
const cityForm = document.querySelector("#city-form");
const celcius = document.querySelector(".celcius");
const farenheit = document.querySelector(".farenheit");
const currentTemperature = document.querySelector(".current-temperature");

/*-----------------date-------------------- */
let now = new Date();
let day = now.getDate();
let month = now.getMonth() + 1;
let year = now.getFullYear();
function setZero(data) {
  if (data < 10) {
    return "0" + data;
  } else {
    return data;
  }
}
day = setZero(day);
month = setZero(month);

let dateString = `${day}.${month}.${year}`;
dateBlock.innerHTML = dateString;

/*-------------------submit-------------------- */

cityForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("?");
  city.innerHTML = cityInput.value;
});

/*------------------celcius-farenheit--------------- */

let isCelcius = true;
celcius.addEventListener("click", function () {
  if (isCelcius === true) {
    console.log(isCelcius);
    return;
  } else {
    console.log(isCelcius);
    let celciusString = Math.round(
      (Number(currentTemperature.innerHTML) - 32) / 1.8
    );
    currentTemperature.innerHTML = celciusString;
    isCelcius = true;
  }
});

farenheit.addEventListener("click", function () {
  if (isCelcius === true) {
    console.log(isCelcius);
    let farenheitString = Math.round(
      Number(currentTemperature.innerHTML) * 1.8 + 32
    );
    currentTemperature.innerHTML = farenheitString;
    isCelcius = false;
  } else {
    console.log(isCelcius);
    return;
  }
});

/*------------------------display current weather----------------------------- */

let currentWeatherDescription = document.querySelector(
  ".current-weather-description"
);
let currentFeelTemperature = document.querySelector(
  ".current-feel-temperature"
);
let currentWind = document.querySelector(".current-wind");
let currentHumidity = document.querySelector(".current-humidity");
let currentSunrise = document.querySelector(".current-sunrise");
let currentSunset = document.querySelector(".current-sunset");
let currentGeolocation = document.querySelector("#current-geolocation");
let apiKey = "5c08670149a0b1a4dc7a372a3d5e5333";
let units = "metric";

function setCity(cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

setCity("London");

function submitSearch(event) {
  event.preventDefault();
  let cityName = cityInput.value;
  setCity(cityName);
}

cityForm.addEventListener("submit", submitSearch);

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let weatherDesc = response.data.weather[0].description;
  let feelTemperature = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let sunrise = response.data.sys.sunrise;
  let sunset = response.data.sys.sunset;
  let currentImage = document.querySelector(".image-column");
  city.innerHTML = response.data.name;
  currentTemperature.textContent = temperature;
  currentWeatherDescription.textContent = weatherDesc;
  currentFeelTemperature.textContent = feelTemperature;
  currentHumidity.textContent = humidity + "%";
  currentWind.textContent = wind + "m/s";
  currentSunrise.textContent = sunrise;
  currentSunset.textContent = sunset;
  currentImage.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="weather-icon">`;
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(url);

  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(setPosition);
}

currentGeolocation.addEventListener("click", getCurrentLocation);
