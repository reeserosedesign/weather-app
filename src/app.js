function formatDate(timestamp) {
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
}

function getWeather(response) {
  let currentTemp = document.querySelector("#current-temp");
  let city = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#weather-icon");
  let iconCode = response.data.weather[0].icon;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  tempF = response.data.main.temp;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(getWeather);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchForm = document.querySelector("#search-form");
  search(searchForm.value);
}

function changeUnitC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let tempC = (tempF - 32) * (5 / 9);
  currentTemp.innerHTML = Math.round(tempC);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(windSpeed.innerHTML * 1.609);

  let windSpeedUnit = document.querySelector("#wind-speed-unit");
  windSpeedUnit.innerHTML = "km/h";
}

function changeUnitF(event) {
  event.preventDefault;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(tempF);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(windSpeed.innerHTML / 1.609);

  let windSpeedUnit = document.querySelector("#wind-speed-unit");
  windSpeedUnit.innerHTML = "mph";
}

let tempF = null;

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeUnitF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeUnitC);

let video = document.querySelector("#backgroundVideo");
video.playbackRate = 0.5;

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPosition);
});

let paris = document.querySelector("#paris");
paris.addEventListener("click", function () {
  search("paris");
});

let tokyo = document.querySelector("#tokyo");
tokyo.addEventListener("click", function () {
  search("tokyo");
});

let sydney = document.querySelector("#sydney");
sydney.addEventListener("click", function () {
  search("sydney");
});

search("Los Angeles");
formatDate();
