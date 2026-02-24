
// Getting weatherForm via documentQuerySelector to get form Data
const weatherForm = document.querySelector(".weather-form");

// Getting weatherData via documentQuerySelector to display weather Data
const weatherData = document.querySelector(".weather-data-container");

// Getting introContainer to hide welcoming text when seearching for city
const introContainer = document.querySelector(".intro-container");



// Function to return weather icons 
const getWeatherIcon = (weatherCode, dayTime) => {
    if (weatherCode === 0 && dayTime) {
        return { imgSrc: "./images/sun.png", info: "Clear Skies" }
    } else if (weatherCode === 0 && !dayTime) {
        return { imgSrc: "./images/moon.png,", info: "Clear Skies" }
    } else if (weatherCode >= 1 && weatherCode <= 3 && dayTime) {
        return { imgSrc: "./images/cloudy.png", info: "Partly Cloudy" }
    } else if (weatherCode >= 1 && weatherCode <= 3 && !dayTime) {
        return { imgSrc: "./images/cloudy-night.png", info: "Partly Cloudy" }
    } else if (weatherCode === 45 || weatherCode === 48) {
        return { imgSrc: "./images/fog.png", info: "Fog" }
    } else if (weatherCode >= 51 && weatherCode <= 57) {
        return { imgSrc: "./images/drizzle.png", info: "Drizzle" }
    } else if (weatherCode >= 61 && weatherCode <= 67) {
        return { imgSrc: "./images/drizzle.png", info: "Rain" }
    } else if (weatherCode >= 71 && weatherCode <= 77) {
        return { imgSrc: "./images/snowy.png", info: "Snow" }
    } else if (weatherCode >= 80 && weatherCode <= 82) {
        return { imgSrc: "./images/heavy-rain.png", info: "Rain" }
    } else if (weatherCode === 85 || weatherCode === 86) {
        return { imgSrc: "./images/snowy.png", info: "Snow" }
    } else {
        return { imgSrc: "./images/thunderstoms.png", info: "Thunderstorms" }
    }
}




// Event listener when form is submitted to search for city
weatherForm.addEventListener("submit", (event) => {
    // Prevent Refresh
    event.preventDefault();

    // Removed previous form data
    while (weatherData.firstChild) {
        weatherData.removeChild(weatherData.firstChild);
    }

    // Getting location from the form
    const location = event.target.location.value;

    introContainer.classList.add("hidden");

    const fetchData = async () => {
        try {
            // Fetching longitude and latitude to get location of city
            const locationRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&format=json`);
            // Verifying that location is found
            if (!locationRes.ok) {
                throw new Error(locationRes.status);
            }
            const locationData = await locationRes.json();
            console.log(locationData);

            // Getting the longitude and latitude 
            const longitude = locationData.results[0].longitude;
            const latitude = locationData.results[0].latitude;
            console.log(longitude, latitude);

            // Fetching weather information on location
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

            // Getting weather logo and information using getWeatherIcon Function
            const weatherCode = weatherInfo.current.weather_code;
            const isDay = weatherInfo.current.is_day;
            const weatherIcon = getWeatherIcon(weatherCode, isDay);

            // Appending weatherIcon to weatherData container
            const weatherImg = document.createElement("img");
            weatherImg.src = weatherIcon.imgSrc;
            weatherImg.className = "weather-data-img";
            weatherImg.alt = weatherIcon.info;
            weatherData.appendChild(weatherImg);
            console.log(weatherImg);

            // Getting temperature and appending it to weatherContainer
            const temperature = document.createElement("p");
            temperature.className = "weather-data-temperature";
            temperature.textContent = `${Math.round(weatherInfo.current.temperature_2m)}${weatherInfo.current_units.temperature_2m}`;
            weatherData.appendChild(temperature);

            // Creating container to hold max/min temperature and appending it to weatherData container
            const temperatureContainer = document.createElement("div");
            temperatureContainer.className = "temperature-container";
            weatherData.appendChild(temperatureContainer);

            // Creating high temperature element and append it to weather container
            const highTemperature = document.createElement("p");
            highTemperature.className = "weather-data-min-max";
            highTemperature.textContent = `H:${Math.round(weatherInfo.daily.temperature_2m_max[0])}${weatherInfo.current_units.temperature_2m}`;
            temperatureContainer.appendChild(highTemperature);


            // Getting low temperature and append it to weather container
            const lowTemperature = document.createElement("p");
            lowTemperature.className = "weather-data-min-max";
            lowTemperature.textContent = `L:${Math.round(weatherInfo.daily.temperature_2m_min[0])}${weatherInfo.current_units.temperature_2m}`;
            temperatureContainer.appendChild(lowTemperature);

            // Appending current weather condition and appending it to weather container
            const weatherCondition = document.createElement("p");
            weatherCondition.className = "weather-data-condition";
            weatherCondition.textContent = weatherIcon.info;
            weatherData.appendChild(weatherCondition);

        } catch (error) {
            console.error(error);
            return;
        }

    }
    fetchData();
    weatherForm.reset();

})