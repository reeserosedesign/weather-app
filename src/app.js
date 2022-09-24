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

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayImage(icon) {
  let iconPath = "";
  if (icon === "01d") {
    iconPath = "media/clear-day.svg";
  } else {
    if (icon === "01n") {
      iconPath = "media/clear-night.svg";
    } else {
      if (icon === "02d") {
        iconPath = "media/few-clouds-day.svg";
      } else {
        if (icon === "02n") {
          iconPath = "media/few-clouds-night.svg";
        } else {
          if (
            icon === "03d" ||
            icon === "03n" ||
            icon === "04d" ||
            icon === "04n"
          ) {
            iconPath = "media/cloudy.svg";
          } else {
            if (
              icon === "09d" ||
              icon === "09n" ||
              icon === "10d" ||
              icon === "10n"
            ) {
              iconPath = "media/rain.svg";
            } else {
              if (icon === "11d" || icon === "11n") {
                iconPath = "media/thunder.svg";
              } else {
                if (icon === "13d" || icon === "13n") {
                  iconPath = "media/snow.svg";
                } else {
                  if (icon === "50d" || icon === "50n") {
                    iconPath = "media/mist.svg";
                  } else {
                    iconPath = `https://openweathermap.org/img/wn/${icon}@4x.png`;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return iconPath;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let forecast = response.data.daily;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="iconGroup">
            <h3 class="day">${formatForecastDate(forecastDay.dt)}</h3>
            <div class="icon"><img src="${displayImage(
              forecastDay.weather[0].icon
            )}" id=forecast-weather-icon" alt="${
          forecastDay.weather[0].description
        }" id="forecast-icon" width="64px"></div>
            <p>
              <span class="tempHigh forecast-temp-high">${Math.round(
                forecastDay.temp.max
              )}</span><strong>°</strong>
              <span class="tempLow forecast-temp-low">${Math.round(
                forecastDay.temp.min
              )}</span>°
            </p>
          </div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function getWeather(response) {
  let currentTemp = document.querySelector("#current-temp");
  let tempHigh = document.querySelector("#temp-high");
  let tempLow = document.querySelector("#temp-low");
  let city = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#weather-icon");
  let icon = response.data.weather[0].icon;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  tempHigh.innerHTML = Math.round(response.data.main.temp_max);
  tempLow.innerHTML = Math.round(response.data.main.temp_min);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute("src", displayImage(icon));
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  tempF = response.data.main.temp;
  tempHighF = response.data.main.temp_max;
  tempLowF = response.data.main.temp_min;

  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(getWeather);
}

function search(city) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
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
  let tempC = ((tempF - 32) * 5) / 9;
  let tempHighC = ((tempHighF - 32) * 5) / 9;
  let tempLowC = ((tempLowF - 32) * 5) / 9;
  let windSpeed = document.querySelector("#wind-speed");
  let windSpeedUnit = document.querySelector("#wind-speed-unit");
  let tempHigh = document.querySelector("#temp-high");
  let tempLow = document.querySelector("#temp-low");

  currentTemp.innerHTML = Math.round(tempC);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  windSpeed.innerHTML = Math.round(windSpeed.innerHTML * 1.609);
  windSpeedUnit.innerHTML = "km/h";
  tempHigh.innerHTML = Math.round(tempHighC);
  tempLow.innerHTML = Math.round(tempLowC);
}

function changeUnitF(event) {
  event.preventDefault;
  let currentTemp = document.querySelector("#current-temp");
  let windSpeed = document.querySelector("#wind-speed");
  let windSpeedUnit = document.querySelector("#wind-speed-unit");
  let tempHigh = document.querySelector("#temp-high");
  let tempLow = document.querySelector("#temp-low");

  currentTemp.innerHTML = Math.round(tempF);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  windSpeed.innerHTML = Math.round(windSpeed.innerHTML / 1.609);
  windSpeedUnit.innerHTML = "mph";
  tempHigh.innerHTML = Math.round(tempHighF);
  tempLow.innerHTML = Math.round(tempLowF);
}

let tempF = null;
let tempHighF = null;
let tempLowF = null;

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
