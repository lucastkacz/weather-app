import { API_KEY } from "./api.js";
import { getWeather } from "./script.js";

/* ------------------------- SELECTORS ------------------------- */
// Theme Selector
const html = document.querySelector("html");

// Weather Selectors
const cityName = document.querySelector("[data-city]");
const temp = document.querySelector("[data-temp]");
const feelsLike = document.querySelector("[data-feels-like]");
const tempMax = document.querySelector("[data-temp-max]");
const tempMin = document.querySelector("[data-temp-min]");
const humidity = document.querySelector("[data-humidity]");
const description = document.querySelector("[data-description]");

// Search Selector
const search = document.getElementById("search");

/* ---------------------- EVENT LISTENERS ---------------------- */
search.addEventListener("keypress", searchCity);

/* ---------------------- EVENT FUNCTIONS ---------------------- */
function searchCity(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		getWeather(search.value, API_KEY).then((cityData) => renderCity(cityData));
		search.value = "";
	}
}

/* ---------------------- RENDER FUNCTIONS ---------------------- */
function renderCity(cityData) {
	cityName.textContent = `${cityData["name"]}`;
	temp.textContent = `${tempConverter(cityData["main"]["temp"])}°C`;
	feelsLike.textContent = `Feels Like: ${tempConverter(cityData["main"]["temp"])}°C`;
	tempMax.textContent = `Today's high: ${tempConverter(cityData["main"]["temp_max"])}°C`;
	tempMin.textContent = `Today's low: ${tempConverter(cityData["main"]["temp_min"])}°C`;
	humidity.textContent = `Humidity: ${cityData["main"]["humidity"]}%`;
	description.textContent = `${capitalizeLetters(cityData["weather"]["0"]["description"])}`;
    setTheme(cityData);
}

function setTheme(cityData) {
	const time = cityData["dt"];
	const sunrise = cityData["sys"]["sunrise"];
	const sunset = cityData["sys"]["sunset"];

    if (sunrise < time && time < sunset) {
        html.setAttribute("data-theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
    }
}
/* ---------------------- HELPER FUNCTIONS ---------------------- */
function capitalizeLetters(string) {
    const words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }

function tempConverter(temp) {
    const kelvin = parseFloat(temp)
    return Math.round(kelvin - 273.15)
}

