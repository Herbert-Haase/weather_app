import "./styles/reset.css";
import "./styles/style.css";

async function getWeather(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=31b9ec0ff0dc44d391d195204242203&q=${location}`
  );
  return await response.json();
}

async function getReleventInfo(info) {
  const wData = await info;

  const weather = wData.current.condition.text;
  const temp_c = wData.current.temp_c;
  const temp_f = wData.current.temp_f;
  const location = {
    name: wData.location.name,
    country: wData.location.country,
  };

  return [weather, { temp_c, temp_f }, location];
}

function getLocationFromHTML() {
  return document.querySelector("#location").value;
}

document.querySelector("#getWeather").addEventListener("click", () => {
  getReleventInfo(getWeather(getLocationFromHTML())).then(displayInfo);
});

function displayInfo(data) {
  let weather = data[0];
  let w = {};
  w.temp_f = data[1].temp_f;
  w.temp_c = data[1].temp_c;
  let city = data[2].name;
  let country = data[2].country;

  document.querySelector("#weather").textContent = weather;
  document.querySelector("#city").textContent = city;
  document.querySelector("#country").textContent = country;
  let unit = document.querySelector("#temperature").value;
  document.querySelector("#display_temp").textContent = w[unit];
}
