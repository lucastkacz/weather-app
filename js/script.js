export async function getWeather(location, API_KEY) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`,
		{ mode: "cors" }
	);
	return response.json()
}


