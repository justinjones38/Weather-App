
// Getting weatherForm via documentQuerySelector to get form Data
const weatherForm = document.querySelector(".weather-form");

// Getting weatherData via documentQuerySelector to display weather Data
const weatherData = document.querySelector(".weather-data-container");

// Getting introContainer to hide welcoming text when seearching for city
const introContainer = document.querySelector(".intro-container");





// Function to return weather icons 
const getWeatherIcon = (weatherCode = 0, dayTime = 0) => {
    if (weatherCode === 0 && dayTime) {
        return { imgSrc: "./images/sun.png", info: "Clear Skies" }
    } else if (weatherCode === 0 && !dayTime) {
        return { imgSrc: "./images/moon.png", info: "Clear Skies" }
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

    // Removed weather data
    while (weatherData.firstChild) {
        weatherData.removeChild(weatherData.firstChild);
    }

    // Getting location from the form
    const location = event.target.location.value;

    // Hides the intro description
    introContainer.classList.add("hidden");

    // Fetching data from the API
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

            // Getting the longitude and latitude from locationData
            const longitude = locationData.results[0].longitude;
            const latitude = locationData.results[0].latitude;
            console.log(longitude, latitude);

            // Fetching weather information on location using latitude and longitude
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_min,temperature_2m_max,precipitation_probability_max&hourly=temperature_2m,weather_code,precipitation_probability,is_day,relative_humidity_2m,dew_point_2m,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation&current=temperature_2m,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code,relative_humidity_2m,apparent_temperature,cloud_cover&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
            if (!weatherRes.ok) {
                throw new Error(weatherRes.status);
            }
            const weatherInfo = await weatherRes.json();

            // Creating weatherLocation element and appending it to the weatherData container
            const weatherLocation = document.createElement("h1");
            weatherLocation.className = "weather-location";
            weatherLocation.textContent = location;
            weatherData.appendChild(weatherLocation);

            // Getting weatherCode and isDay to use as parameters in the getWeatherIcon
            const weatherCode = weatherInfo.current.weather_code;
            const isDay = weatherInfo.current.is_day;

            // Getting weatherIcon and information using the getWeatherIcon Function
            const weatherIcon = getWeatherIcon(weatherCode, isDay);

            // Creating weatherImg element and appending it to the weatherData container
            const weatherImg = document.createElement("img");
            weatherImg.src = weatherIcon.imgSrc;
            weatherImg.className = "weather-data-img";
            weatherImg.alt = weatherIcon.info;
            weatherData.appendChild(weatherImg);
            console.log(weatherImg);

            // Creating temperature element and appending it to weatherContainer
            const temperature = document.createElement("p");
            temperature.className = "weather-data-temperature";
            temperature.textContent = `${Math.round(weatherInfo.current.temperature_2m)}${weatherInfo.current_units.temperature_2m}`;
            weatherData.appendChild(temperature);

            // Creating temperatureContainer to hold high/low temperature and appending it to weatherData container
            const temperatureContainer = document.createElement("div");
            temperatureContainer.className = "temperature-container";
            weatherData.appendChild(temperatureContainer);

            // Creating high temperature element and append it to temperatureContainer
            const highTemperature = document.createElement("p");
            highTemperature.className = "weather-data-min-max";
            highTemperature.textContent = `H:${Math.round(weatherInfo.daily.temperature_2m_max[0])}${weatherInfo.current_units.temperature_2m}`;
            temperatureContainer.appendChild(highTemperature);


            // Getting low temperature and append it to temperautreContainer
            const lowTemperature = document.createElement("p");
            lowTemperature.className = "weather-data-min-max";
            lowTemperature.textContent = `L:${Math.round(weatherInfo.daily.temperature_2m_min[0])}${weatherInfo.current_units.temperature_2m}`;
            temperatureContainer.appendChild(lowTemperature);

            // Appending current weather condition and appending it to weather container
            const weatherCondition = document.createElement("p");
            weatherCondition.className = "weather-data-condition";
            weatherCondition.textContent = weatherIcon.info;
            weatherData.appendChild(weatherCondition);

            // Creating weatherContainerStats to hold more intricate weather data 
            const weatherContainerStats = document.createElement("ul");
            weatherContainerStats.className = "weather-data-stats";
            weatherData.appendChild(weatherContainerStats);

            // Create windSpeed element and appending it to WeatherContainerStatsList - need to add wind direction later
            const windSpeed = document.createElement("li");
            windSpeed.className = "weather-data-stats-item";
            windSpeed.textContent = `Wind Speed: `;
            const windSpeedVal = document.createElement("span")
            windSpeedVal.textContent = `${Math.round(weatherInfo.current.wind_speed_10m)}${weatherInfo.current_units.wind_speed_10m}`
            windSpeed.appendChild(windSpeedVal);
            weatherContainerStats.appendChild(windSpeed);

            // Create windGust element and appending it to WeatherContainerStatsList
            const windGusts = document.createElement("li");
            windGusts.className = "weather-data-stats-item";
            windGusts.textContent = `Wind Gusts: `;
            const windGustsVal = document.createElement("span");
            windGustsVal.textContent = `${Math.round(weatherInfo.current.wind_gusts_10m)}${weatherInfo.current_units.wind_gusts_10m}`;
            windGusts.appendChild(windGustsVal);
            weatherContainerStats.appendChild(windGusts);

            // Creating apparentTemperature element and appending it to weatherContainerStats list
            const apparentTemperature = document.createElement("li");
            apparentTemperature.className = "weather-data-stats-item";
            apparentTemperature.textContent = `Feels like temperature: `;
            const apparentTemperatureVal = document.createElement("span");
            apparentTemperatureVal.textContent = `${Math.round(weatherInfo.current.apparent_temperature)}${weatherInfo.current_units.apparent_temperature}`
            apparentTemperature.appendChild(apparentTemperatureVal);
            weatherContainerStats.appendChild(apparentTemperature);

            // Creating relativeHumidity element and appending it to weatherContainerStats list
            const relativeHumidity = document.createElement("li");
            relativeHumidity.className = "weather-data-stats-item";
            relativeHumidity.textContent = `Relative Humidity: `;
            const relativeHumidityVal = document.createElement("span");
            relativeHumidityVal.textContent = `${weatherInfo.current.relative_humidity_2m}${weatherInfo.current_units.relative_humidity_2m}`;
            relativeHumidity.appendChild(relativeHumidityVal);
            weatherContainerStats.appendChild(relativeHumidity);

            // Creating cloudCover element and appending it to weatherContainerStats list
            const cloudCover = document.createElement("li");
            cloudCover.className = "weather-data-stats-item";
            cloudCover.textContent = `Cloud Cover: `;
            const cloudCoverVal = document.createElement("span");
            cloudCoverVal.textContent = `${weatherInfo.current.cloud_cover}${weatherInfo.current_units.cloud_cover}`
            cloudCover.appendChild(cloudCoverVal);
            weatherContainerStats.appendChild(cloudCover);

            // Creating hourly forecast container and appending it to weatherData container
            const hourlyForecastContainer = document.createElement("section");
            hourlyForecastContainer.className = "hourly-weather-container";
            weatherData.appendChild(hourlyForecastContainer);

            // Creating hourly forecast header and appending it to hourlyForecastContainer
            const hourlyForecastHeader = document.createElement("h2");
            hourlyForecastHeader.className = "section-title";
            hourlyForecastHeader.textContent = "Hourly Forecast";
            hourlyForecastContainer.appendChild(hourlyForecastHeader);



            // Creating daily forecast container and appending to weatherData container
            const dailyForecastContainer = document.createElement("section");
            dailyForecastContainer.className = "daily-forecast-container";
            weatherData.appendChild(dailyForecastContainer);

            // Creating daily forecast header and appending it to dailyForecast Container
            const dailyForecastHeader = document.createElement("h2");
            dailyForecastHeader.className = "section-title";
            dailyForecastHeader.textContent = "7 day Forecast";
            dailyForecastContainer.appendChild(dailyForecastHeader);

            // Creating table to holder daily forecast and appending it to dailyForecastContainer
            let dailyForecastTable = document.createElement("table");
            dailyForecastTable.className = "daily-forecast-table";
            dailyForecastContainer.appendChild(dailyForecastTable);

            // Creating table row for table headers
            const tableRowHeader = document.createElement("tr");
            tableRowHeader.className = "table-row table-header";
            dailyForecastTable.appendChild(tableRowHeader);

            // Creating data table header element and appending it to table row
            const dateTableHeader = document.createElement("th");
            dateTableHeader.className = "date-column";
            dateTableHeader.textContent = "Date";
            tableRowHeader.appendChild(dateTableHeader);


            // Creating temperature table header element and appending it to table row
            const temperatureTableHeader = document.createElement("th");
            temperatureTableHeader.className = "temperature-column";
            temperatureTableHeader.textContent = "Temperature";
            tableRowHeader.appendChild(temperatureTableHeader);

            // Creating data table header element and appending it to table row
            const descriptionTableHeader = document.createElement("th");
            descriptionTableHeader.className = "description-column";
            descriptionTableHeader.textContent = "Description";
            tableRowHeader.appendChild(descriptionTableHeader);

            // Creating data table header element and appending it to table row
            const precipitationTableHeader = document.createElement("th");
            precipitationTableHeader.className = "precipitation-column";
            precipitationTableHeader.textContent = "Chance of Precipitation";
            tableRowHeader.appendChild(precipitationTableHeader);


            let length = weatherInfo.daily.time.length;
            for (let index = 0; index < length; index++) {

                // Creating table row for each table value
                const tableRowData = document.createElement("tr");
                tableRowData.className = "table-row table-val";
                dailyForecastTable.appendChild(tableRowData);


                // Creating date element and appending it to dailyForecastTable
                const date = new Date(weatherInfo.daily.time[index]);
                const weatherDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
                const weatherDateElement = document.createElement("td");
                weatherDateElement.className = "date-column";
                weatherDateElement.textContent = weatherDate;
                tableRowData.appendChild(weatherDateElement);

                // Creating temperature element
                const temperatureElement = document.createElement("td");
                temperatureElement.className = "temperature-column";

                // Creating span to bold highTemperature and appending to temperatureElement
                const highTemeratureContainer = document.createElement("span");
                highTemeratureContainer.className = "high-temperature-container"
                highTemeratureContainer.textContent = Math.round(weatherInfo.daily.temperature_2m_max[index]);
                temperatureElement.appendChild(highTemeratureContainer);

                // Creating span to bold highTemperature and appending to temperatureElement
                const lowTemeratureContainer = document.createElement("span");
                lowTemeratureContainer.className = "low-temperature-container"
                lowTemeratureContainer.textContent = Math.round(weatherInfo.daily.temperature_2m_min[index]);
                temperatureElement.appendChild(lowTemeratureContainer);

                // Appending the temperature element to dailyForecastTable
                tableRowData.appendChild(temperatureElement);

                // Getting weatherIcon by getWeatherIcon function
                const weatherIconElement = getWeatherIcon(weatherInfo.daily.weather_code[index]);
                
                // Creating descriptionElement to hold weatherIconImg and info and appending it to table row data
                const descriptionElement = document.createElement("td");
                descriptionElement.className = "description-column";
                tableRowData.appendChild(descriptionElement);

                // Creating imageContainer to hold weatherIconElementImg and appending it to descriptionElement
                const weatherIconElementImg = document.createElement("img");
                weatherIconElementImg.className = "weather-table-icon"
                weatherIconElementImg.src = weatherIconElement.imgSrc;
                weatherIconElementImg.alt = weatherIconElement.info;
                weatherIconElementImg.width = "50"
                descriptionElement.appendChild(weatherIconElementImg)

                // Creating imageContainer to hold weatherIconElementImg and appending it to descriptionElement 
                const weatherIconElementInfo = document.createElement("p");
                weatherIconElementInfo.className = "weather-table-info";
                weatherIconElementInfo.textContent = weatherIconElement.info;
                descriptionElement.appendChild(weatherIconElementInfo);

                // Creating precipitationContainer and appending it to table row data
                const precipitationElement = document.createElement("td");
                precipitationElement.className = "precipitation-column";
                precipitationElement.textContent =`${weatherInfo.daily.precipitation_probability_max[index]}%`;
                tableRowData.appendChild(precipitationElement);


            }

        } catch (error) {
            console.error(error);
            return;
        }

    }
    fetchData();
    weatherForm.reset();

})