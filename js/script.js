// Getting weatherForm via documentQuerySelector to get form Data
const weatherForm = document.querySelector(".weather-form");

// Getting weatherData via documentQuerySelector to display weather Data
const weatherData = document.querySelector(".weather-data-container");

// Getting introContainer to hide welcoming text when seearching for city
const introContainer = document.querySelector(".intro-container");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Getting location from the form
    const location = event.target.location.value;

    introContainer.classList.add("hidden");

    const fetchData = async () => {
        // Fetching longitude and latitude to get location of city
        try {
            const locationRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&format=json`);
            if (!locationRes.ok) {
                throw new Error(locationRes.status);
            }
            const locationData = await locationRes.json();
            console.log(locationData);

            // Getting the longitude and latitude 
            const longitude = locationData.results[0].longitude;
            const latitude = locationData.results[0].latitude;
            console.log(longitude, latitude);

            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_gusts_10m,weather_code,is_day,apparent_temperature,wind_speed_10m,wind_direction_10m&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
            if (!weatherRes.ok) {
                throw new Error(weatherRes.status);
            }
            const weatherInfo = await weatherRes.json();
            // Getting location
            const weatherLocation = document.createElement("h1");
            weatherLocation.className = "weather-location";
            weatherLocation.textContent = location;
            weatherData.appendChild(weatherLocation);

            // Getting temperature and appending it to weatherContainer
            const temperature = document.createElement("p");
            temperature.className = "weather-data-temperature";
            temperature.textContent = `${Math.round(weatherInfo.current.temperature_2m)}${weatherInfo.current_units.temperature_2m}`;
            weatherData.appendChild(temperature);
            console.log(temperature);


        } catch (error) {
            console.error(error);
            return;
        }

    }
    fetchData();
    weatherForm.reset();

})