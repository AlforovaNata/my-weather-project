//Feature #1
let weekDay = document.querySelector("#currentDay");
let now = new Date();
let dayToday = now.getDay();
let year = now.getFullYear();
let hours = now.getHours();
let date = now.getDate();
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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}
weekDay.innerHTML = `${days[dayToday]} <br/> ${date} ${month} ${year} <br/> ${hours}:${minutes}`;

//Feature #2
function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");

  let h1 = document.querySelector("h1");
  if (inputCity.value) {
    h1.innerHTML = `${inputCity.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}
let cityWeather = document.querySelector("#city-weather");
cityWeather.addEventListener("submit", showCity);

/*Feature #3
function showTemperature() {
 let showTemp = document.querySelector("#temperature");
 showTemp.innerHTML = 20;
}

function showFahrenheit() {
let showFahren = document.querySelector("#temperature");
 showFahren.innerHTML = 68;
}

let showTemp = document.querySelector("#celsius");
showTemp.addEventListener("click", showTemperature);

let showFahren = document.querySelector("#fahrenheit");
showFahren.addEventListener("click", showFahrenheit);*/
function displayWeather(response) {
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = `${temperature}`;
  let realFeel = document.querySelector("#feels");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "c45c6ce7066c8be876b5001b7f84d122";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

searchCity("Lviv");

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
