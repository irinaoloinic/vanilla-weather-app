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
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElemt = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celciusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElemt.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
}
function search(city) {
  let apiKey = "37f6a94ba46fa4c11df96b5390cdt21o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#searchItem");
  search(cityElement.value);
  console.log(cityElement.value);
}

function converttoFahrenheit(event) {
  event.preventDefault();
  let fahrenheiTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  degreeCelcius.classList.remove("active");
  degreeFahrenheit.classList.add("active");
}

function convertDegreeCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  degreeFahrenheit.classList.remove("active");
  degreeCelcius.classList.add("active");
}
search("Barcelona");

let celciusTemperature = null;

let degreeFahrenheit = document.querySelector("#fahrenheit-link");
degreeFahrenheit.addEventListener("click", converttoFahrenheit);

let degreeCelcius = document.querySelector("#celciuls-link");
degreeCelcius.addEventListener("click", convertDegreeCelcius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
