var apiKey = "c45c6ce7066c8be876b5001b7f84d122";

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} </br>${hours}:${minutes}`;
}

function sunTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let formatTime = hours + ":" + minutes.toString().padStart(2, "0");
  return formatTime;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col text-center" id="tomorrow">
            <div class="weather-forecast-date">
            <h6>${formatDay(forecastDay.dt)} </h6>
          </div>
          <div class="weather-forecast-temperature">
           <span class="weather-forecast-temperature-max"> ${Math.round(
             forecastDay.temp.max
           )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
            
          </div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="48"/>

          </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getforecast(coordinates) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let h2 = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let temperature = Math.round(response.data.main.temp);
  let todayTemp = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let realFeel = document.querySelector("#feels");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;

  h2.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  todayTemp.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  sunriseElement.innerHTML = sunTime(response.data.sys.sunrise);
  sunsetElement.innerHTML = sunTime(response.data.sys.sunset);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getforecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");

  let h2 = document.querySelector("h2");
  if (inputCity.value) {
    h1.innerHTML = `${inputCity.value}`;
  } else {
    h2.innerHTML = null;
    alert("Please type a city");
  }
}
let cityWeather = document.querySelector("#city-weather");
cityWeather.addEventListener("submit", showCity);

function searchCity(city) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

let searchForm = document.querySelector("#city-weather");
searchForm.addEventListener("submit", submitCity);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getPosition);

function kyivkWeather(event) {
  event.preventDefault();
  let city = "Kyiv";
  searchCity(city);
}

function odessaWeather(event) {
  event.preventDefault();
  let city = "Odessa";
  searchCity(city);
}

function kharkivWeather(event) {
  event.preventDefault();
  let city = "Kharkiv";
  searchCity(city);
}

function gdanskWeather(event) {
  event.preventDefault();
  let city = "Gdansk";
  searchCity(city);
}

let searchKyiv = document.querySelector("#kyiv");
let searchOdessa = document.querySelector("#odessa");
let searchKharkiv = document.querySelector("#kharkiv");
let searchGdansk = document.querySelector("#gdansk");

searchKyiv.addEventListener("click", kyivkWeather);
searchOdessa.addEventListener("click", odessaWeather);
searchKharkiv.addEventListener("click", kharkivWeather);
searchGdansk.addEventListener("click", gdanskWeather);

searchCity("Lviv");
