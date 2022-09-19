// Display Current Date and Time

let now = new Date();

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let timeZone = now.getTimezoneOffset();
let meridian = `AM`;

if (hour < 12) {
  meridian = `AM`;
} else {
  meridian = `PM`;
}

if (hour > 12) {
  hour = hour - 12;
}
if (hour === 0) {
  hour = "12";
}

let minute = now.getMinutes();

if (minute < 10) {
  minute = "0" + minute;
}

let time = `${hour}:${minute} ${meridian}`;
let fullDate = `${day}, ${month} ${date}`;

let dateTime = document.querySelector(`#date-time`);
dateTime.innerHTML = `${time} on ${fullDate}`;

// Display Search Query & Current Location

let button = document.querySelector("form");
let currentLocation = document.querySelector("#current-location");
let paris = document.querySelector("#paris");
let tokyo = document.querySelector("#tokyo");
let sydney = document.querySelector("#sydney");

function loadCity() {
  function showTemp(response) {
    let name = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = name;
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = response.data.weather[0].main;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    let celsius = Math.round(response.data.main.temp);
    let fahrenheit = Math.round((celsius * 9) / 5 + 32);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = celsius;
    let unitC = document.querySelector(".activeUnit");
    let unitF = document.querySelector(".inactiveUnit");

    function changeUnitC() {
      currentTemp.innerHTML = celsius;
      unitC.classList.add("activeUnit");
      unitC.classList.remove("inactiveUnit");
      unitF.classList.remove("activeUnit");
      unitF.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "km/h";
      windSpeed.innerHTML = Math.round(response.data.wind.speed);
    }

    function changeUnitF() {
      currentTemp.innerHTML = fahrenheit;
      unitF.classList.add("activeUnit");
      unitF.classList.remove("inactiveUnit");
      unitC.classList.remove("activeUnit");
      unitC.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "mph";
      windSpeed.innerHTML = Math.round(response.data.wind.speed / 1.609);
    }

    unitC.addEventListener("click", changeUnitC);
    unitF.addEventListener("click", changeUnitF);
  }

  function showLosAngeles(position) {
    let cityName = `Los Angeles`;

    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let unit = "metric";
    let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
    let apiUrl = `${apiEndpoint}q=${cityName}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(showLosAngeles);
}

function changeCity(event) {
  event.preventDefault();
  let search = document.querySelector("#search");

  function showTemp(response) {
    let name = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = name;
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = response.data.weather[0].main;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    let celsius = Math.round(response.data.main.temp);
    let fahrenheit = Math.round((celsius * 9) / 5 + 32);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = celsius;
    let unitC = document.querySelector(".activeUnit");
    let unitF = document.querySelector(".inactiveUnit");

    function changeUnitC() {
      currentTemp.innerHTML = celsius;
      unitC.classList.add("activeUnit");
      unitC.classList.remove("inactiveUnit");
      unitF.classList.remove("activeUnit");
      unitF.classList.add("inactiveUnit");
      windSpeed.innerHTML = Math.round(response.data.wind.speed);
    }

    function changeUnitF() {
      currentTemp.innerHTML = fahrenheit;
      unitF.classList.add("activeUnit");
      unitF.classList.remove("inactiveUnit");
      unitC.classList.remove("activeUnit");
      unitC.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "mph";
      windSpeed.innerHTML = Math.round(response.data.wind.speed / 1.609);
    }

    unitC.addEventListener("click", changeUnitC);
    unitF.addEventListener("click", changeUnitF);
  }

  function showCity(position) {
    let cityName = search.value.trim();

    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let unit = "metric";
    let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
    let apiUrl = `${apiEndpoint}q=${cityName}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(showCity);
}

function quickLookupCurrentLocation() {
  function showTemp(response) {
    let name = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = name;
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = response.data.weather[0].main;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    let celsius = Math.round(response.data.main.temp);
    let fahrenheit = Math.round((celsius * 9) / 5 + 32);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = celsius;
    let unitC = document.querySelector(".activeUnit");
    let unitF = document.querySelector(".inactiveUnit");

    function changeUnitC() {
      currentTemp.innerHTML = celsius;
      unitC.classList.add("activeUnit");
      unitC.classList.remove("inactiveUnit");
      unitF.classList.remove("activeUnit");
      unitF.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "km/h";
      windSpeed.innerHTML = Math.round(response.data.wind.speed);
    }

    function changeUnitF() {
      currentTemp.innerHTML = fahrenheit;
      unitF.classList.add("activeUnit");
      unitF.classList.remove("inactiveUnit");
      unitC.classList.remove("activeUnit");
      unitC.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "mph";
      windSpeed.innerHTML = Math.round(response.data.wind.speed / 1.609);
    }

    unitC.addEventListener("click", changeUnitC);
    unitF.addEventListener("click", changeUnitF);
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let unit = "metric";
    let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
    let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

function quickLookupParis() {
  function showTemp(response) {
    let name = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = name;
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = response.data.weather[0].main;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    let celsius = Math.round(response.data.main.temp);
    let fahrenheit = Math.round((celsius * 9) / 5 + 32);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = celsius;
    let unitC = document.querySelector(".activeUnit");
    let unitF = document.querySelector(".inactiveUnit");

    function changeUnitC() {
      currentTemp.innerHTML = celsius;
      unitC.classList.add("activeUnit");
      unitC.classList.remove("inactiveUnit");
      unitF.classList.remove("activeUnit");
      unitF.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "km/h";
      windSpeed.innerHTML = Math.round(response.data.wind.speed);
    }

    function changeUnitF() {
      currentTemp.innerHTML = fahrenheit;
      unitF.classList.add("activeUnit");
      unitF.classList.remove("inactiveUnit");
      unitC.classList.remove("activeUnit");
      unitC.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "mph";
      windSpeed.innerHTML = Math.round(response.data.wind.speed / 1.609);
    }

    unitC.addEventListener("click", changeUnitC);
    unitF.addEventListener("click", changeUnitF);
  }

  function showParis(position) {
    let cityName = `Paris`;

    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let unit = "metric";
    let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
    let apiUrl = `${apiEndpoint}q=${cityName}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(showParis);
}

function quickLookupTokyo() {
  function showTemp(response) {
    let name = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = name;
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = response.data.weather[0].main;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    let celsius = Math.round(response.data.main.temp);
    let fahrenheit = Math.round((celsius * 9) / 5 + 32);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = celsius;
    let unitC = document.querySelector(".activeUnit");
    let unitF = document.querySelector(".inactiveUnit");

    function changeUnitC() {
      currentTemp.innerHTML = celsius;
      unitC.classList.add("activeUnit");
      unitC.classList.remove("inactiveUnit");
      unitF.classList.remove("activeUnit");
      unitF.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "km/h";
      windSpeed.innerHTML = Math.round(response.data.wind.speed);
    }

    function changeUnitF() {
      currentTemp.innerHTML = fahrenheit;
      unitF.classList.add("activeUnit");
      unitF.classList.remove("inactiveUnit");
      unitC.classList.remove("activeUnit");
      unitC.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "mph";
      windSpeed.innerHTML = Math.round(response.data.wind.speed / 1.609);
    }

    unitC.addEventListener("click", changeUnitC);
    unitF.addEventListener("click", changeUnitF);
  }

  function showTokyo(position) {
    let cityName = `Tokyo`;

    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let unit = "metric";
    let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
    let apiUrl = `${apiEndpoint}q=${cityName}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(showTokyo);
}

function quickLookupSydney() {
  function showTemp(response) {
    let name = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = name;
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = response.data.weather[0].main;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    let celsius = Math.round(response.data.main.temp);
    let fahrenheit = Math.round((celsius * 9) / 5 + 32);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = celsius;
    let unitC = document.querySelector(".activeUnit");
    let unitF = document.querySelector(".inactiveUnit");

    function changeUnitC() {
      currentTemp.innerHTML = celsius;
      unitC.classList.add("activeUnit");
      unitC.classList.remove("inactiveUnit");
      unitF.classList.remove("activeUnit");
      unitF.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "km/h";
      windSpeed.innerHTML = Math.round(response.data.wind.speed);
    }

    function changeUnitF() {
      currentTemp.innerHTML = fahrenheit;
      unitF.classList.add("activeUnit");
      unitF.classList.remove("inactiveUnit");
      unitC.classList.remove("activeUnit");
      unitC.classList.add("inactiveUnit");
      let windSpeedUnit = document.querySelector("#wind-speed-unit");
      windSpeedUnit.innerHTML = "mph";
      windSpeed.innerHTML = Math.round(response.data.wind.speed / 1.609);
    }

    unitC.addEventListener("click", changeUnitC);
    unitF.addEventListener("click", changeUnitF);
  }

  function showSydney(position) {
    let cityName = `Sydney`;

    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let unit = "metric";
    let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
    let apiUrl = `${apiEndpoint}q=${cityName}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(showSydney);
}

button.addEventListener("submit", changeCity);
currentLocation.addEventListener("click", quickLookupCurrentLocation);
paris.addEventListener("click", quickLookupParis);
tokyo.addEventListener("click", quickLookupTokyo);
sydney.addEventListener("click", quickLookupSydney);

loadCity();
