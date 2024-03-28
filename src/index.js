import "./styles/reset.css";
import "./styles/style.css";
import Jpg from "./globe.jpg";

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=31b9ec0ff0dc44d391d195204242203&q=${location}`
    );
    return await response.json();
  } catch (e) {
    return Promise.reject("Bad request");
  }
}

async function getReleventInfo(info) {
  try {
    const wData = await info;
    const weather = wData.current.condition.text;
    const temp_c = wData.current.temp_c;
    const temp_f = wData.current.temp_f;
    const location = {
      name: wData.location.name,
      country: wData.location.country,
    };

    return [weather, { temp_c, temp_f }, location];
  } catch (e) {
    console.error("Failed to fetch relevant information:", e);
    return Promise.reject("No such City exist");
  }
}

function getLocationFromHTML() {
  return document.querySelector("#location").value;
}

document.querySelector("#getWeather").addEventListener("click", () => {
  const weatherInfo = getReleventInfo(getWeather(getLocationFromHTML()));
  weatherInfo.catch(displayError);
  weatherInfo.then(displayInfo);
  weatherInfo.then(setImage);
});

function displayError(error) {
  console.log(error);
  const errorHTML = document.createElement("div");
  errorHTML.textContent = error;
  errorHTML.style.color = "red";
  document.querySelector("#container div").append(errorHTML);
  setTimeout(() => {
    errorHTML.remove();
  }, 10000);
}

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

const img = document.querySelector("img");
img.src = Jpg;

async function setImage(weather) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=0A7BVk1vPf8WTvS7XQMwkuLnIeJoROpz&s=${weather} weather`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  img.src = weatherData.data.images.original.url;
}
