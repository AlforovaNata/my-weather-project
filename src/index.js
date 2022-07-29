let weekDay = document.querySelector("#currentDay");
let now = new Date();
let dayToday = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}
weekDay.innerHTML = `Last updated</br>${days[dayToday]} ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");

  let h2 = document.querySelector("h2");
  if (inputCity.value) {
    h1.innerHTML = `${inputCity.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}
let cityWeather = document.querySelector("#city-weather");
cityWeather.addEventListener("submit", showCity);

function showFahrenheit(event) {
  event.preventDefault();
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", showFahrenheit);

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", showCelsius);

function displayWeather(response) {
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let realFeel = document.querySelector("#feels");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.main.pressure;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "c45c6ce7066c8be876b5001b7f84d122";
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
  let apiKey = "c45c6ce7066c8be876b5001b7f84d122";
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
searchKyiv.addEventListener("click", kyivkWeather);

let searchOdessa = document.querySelector("#odessa");
searchOdessa.addEventListener("click", odessaWeather);

let searchKharkiv = document.querySelector("#kharkiv");
searchKharkiv.addEventListener("click", kharkivWeather);

let searchGdansk = document.querySelector("#gdansk");
searchGdansk.addEventListener("click", gdanskWeather);

searchCity("Lviv");
