import "./styles/style.css";
import "./styles/reset.css";

async function getWeather(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=31b9ec0ff0dc44d391d195204242203&q=${location}`
  );
  return await response.json();
}
// const weather = getWeather("london");
// weather.then(console.log);
console.log(getWeather("london"));

async function getReleventInfo(info) {
  const weatherInfo = await getWeather("berlin");
}
