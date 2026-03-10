// Getting weatherForm via documentQuerySelector to get form Data
const weatherForm = document.querySelector(".weather-form");

// Getting formInput via document.querySelector
const formInput = document.querySelector(".form-input")

// Getting form Button via document.querySelector
const formButton = document.querySelector(".form-button");


// Getting weatherData via documentQuerySelector to display weather Data
const weatherData = document.querySelector(".weather-data-container");

// Getting introContainer to hide welcoming text when seearching for city
const introContainer = document.querySelector(".intro-container");

// Getting formContainer via documentQuerySelector
const formContainer = document.querySelector(".form-container")

// Creating fetchErrorContainer to hold error in searching
const fetchErrorContainer = document.querySelector(".fetch-error-container");

// Getting footer to change position of footer to static when form submitted
const footer = document.querySelector("footer");

// Function to return weather icons 
const getWeatherIcon = (weatherCode = 0, dayTime = 1) => {
    // An array that holds a various of weather icons and info at different weather codes
    const weatherCodeList = [{
        weatherCode: 0,
        dayTime: 1,
        imgSrc: "./images/sun.png",
        info: "Clear Skies"
    }, {
        weatherCode: 0,
        dayTime: 0,
        imgSrc: "./images/moon.png",
        info: "Clear Skies"
    }, {
        weatherCode: 1,
        dayTime: 1,
        imgSrc: "./images/sun.png",
        info: "Mainly Clear"
    }, {
        weatherCode: 1,
        dayTime: 0,
        imgSrc: "./images/moon.png",
        info: "Mainly Clear"
    }, {
        weatherCode: 2,
        dayTime: 1,
        imgSrc: "./images/partly-cloudy.png",
        info: "Partly Cloudy"
    }, {
        weatherCode: 2,
        dayTime: 0,
        imgSrc: "./images/partly-cloudy-moon.png",
        info: "Partly Cloudy"
    }, {
        weatherCode: 3,
        dayTime: 1,
        imgSrc: "./images/overcast.png",
        info: "Overcast"
    }, {
        weatherCode: 3,
        dayTime: 0,
        imgSrc: "./images/overcast-dark.png",
        info: "Overcast"
    }, {
        weatherCode: 45,
        dayTime: 1,
        imgSrc: "./images/fog.png",
        info: "Fog"
    }, {
        weatherCode: 48,
        dayTime: 1,
        imgSrc: "./images/fog.png",
        info: "Rime Fog"
    }, {
        weatherCode: 51,
        dayTime: 1,
        imgSrc: "./images/light-drizzle.png",
        info: "Light Drizzle"
    }, {
        weatherCode: 53,
        dayTime: 1,
        imgSrc: "./images/drizzle.png",
        info: "Moderate Drizzle"
    }, {
        weatherCode: 55,
        dayTime: 1,
        imgSrc: "./images/drizzle.png",
        info: "Drizzle"
    }, {
        weatherCode: 56,
        dayTime: 1,
        imgSrc: "./images/freezing-rain.png",
        info: "Light Freezing Drizzle"
    }, {
        weatherCode: 57,
        dayTime: 1,
        imgSrc: "./images/freezing-rain.png",
        info: "Freezing Drizzle"
    }, {
        weatherCode: 61,
        dayTime: 1,
        imgSrc: "./images/rain.png",
        info: "Light Rain"
    }, {
        weatherCode: 63,
        dayTime: 1,
        imgSrc: "./images/rain.png",
        info: "Moderate Rain"
    }, {
        weatherCode: 65,
        dayTime: 1,
        imgSrc: "./images/heavy-rain.png",
        info: "Heavy Rain"
    }, {
        weatherCode: 66,
        dayTime: 1,
        imgSrc: "./images/freezing-rain.png",
        info: "Light Freezing Rain"
    }, {
        weatherCode: 67,
        dayTime: 1,
        imgSrc: "./images/freezing-rain.png",
        info: "Heavy Freezing rain"
    }, {
        weatherCode: 71,
        dayTime: 1,
        imgSrc: "./images/light-snow.png",
        info: "Light Snow"
    }, {
        weatherCode: 73,
        dayTime: 1,
        imgSrc: "./images/snow.png",
        info: "Moderate Snow"
    }, {
        weatherCode: 75,
        dayTime: 1,
        imgSrc: "./images/snow.png",
        info: "Heavy Snow"
    }, {
        weatherCode: 77,
        dayTime: 1,
        imgSrc: "./images/light-snow.png",
        info: "Snow Grains"
    }, {
        weatherCode: 80,
        dayTime: 1,
        imgSrc: "./images/light-drizzle.png",
        info: "Light Rain Showers"
    }, {
        weatherCode: 81,
        dayTime: 1,
        imgSrc: "./images/rain.png",
        info: "Moderate Rain Showers"
    }, {
        weatherCode: 82,
        dayTime: 1,
        imgSrc: "./images/heavy-rain.png",
        info: "Heavy Rain Showers"
    }, {
        weatherCode: 85,
        dayTime: 1,
        imgSrc: "./images/light-snow.png",
        info: "Light Snow Showers"
    }, {
        weatherCode: 86,
        dayTime: 1,
        imgSrc: "./images/snow.png",
        info: "Heavy Snow Showers"
    }, {
        weatherCode: 95,
        dayTime: 1,
        imgSrc: "./images/thunderstorm.png",
        info: "Thunderstorm"
    }, {
        weatherCode: 96,
        dayTime: 1,
        imgSrc: "./images/hail.png",
        info: "Thunderstorm with light hail"
    }, {
        weatherCode: 99,
        dayTime: 1,
        imgSrc: "./images/hail.png",
        info: "Thunderstorm with heavy hail"
    }];

    // Weather codes greater than 3 use the same image and info, so dayTime is set to 1. 
    // So they are used together 
    if (weatherCode > 3) {
        dayTime = 1;
    }

    // Filters the array so only the item that matches the weatherCode and dayTime returns
    const filteredArray = weatherCodeList.filter(item => {
        return weatherCode === item.weatherCode && dayTime === item.dayTime;
    })

    // Returns the 1 item in the array that has the weatherCode
    return (filteredArray[0]);
}

// Function that converts time to hour in am or pm
const getTimeByHour = (hour) => {
    if (hour === 0) {
        return `12am`
    } else if (hour > 0 && hour < 12) {
        return `${hour}am`;
    } else if (hour === 12) {
        return `${hour}pm`
    }
    else {
        return `${hour % 12}pm`;
    }
}

// Function that converts time to minute in am or pm
const getTimeByMinute = (hour, minute) => {
    // Adding leading 0 if minute is less than
    if(minute < 10) {
        minute = `0${minute}`;
    }

    // Converting time to hour
    if (hour === 0) {
        return `12:${minute}am`
    } else if (hour > 0 && hour < 12) {
        return `${hour}:${minute}am`;
    } else if (hour === 12) {
        return `${hour}:${minute}pm`
    }
    else {
        return `${hour % 12}:${minute}pm`;
    } 
}

// Function that converts to the correct day of the week
const getDayOfWeek = (val) => {
    const daysOfWeek = [{
        abbr: "Sun",
        full: "Sunday"
    }, {
        abbr: "Mon",
        full: "Monday"
    }, {
        abbr: "Tue",
        full: "Tuesday"
    }, {
        abbr: "Wed",
        full: "Wednesday"
    }, {
        abbr: "Thu",
        full: "Thursday"
    }, {
        abbr: "Fri",
        full: "Friday"
    }, {
        abbr: "Sat",
        full: "Saturday"
    }]
    return daysOfWeek[val];
}

// Function that converts to the wind speed degrees to the wind speed direction shown on compas
const getWindSpeedDirection = (val) => {
    const windSpeedDirection = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    const index = Math.round(val / 22.5);
    console.log(windSpeedDirection);
    return windSpeedDirection[index];
}

// Remove invalid class when a key is down
formInput.addEventListener("keydown", () => {
    formContainer.classList.remove("invalid");  
})



// Selecting button via documentQuerySelector
const headerButton = document.querySelector(".header-button");

// Creating event listener so headerButton can reset document by closing weatherDataContainer and opening introDescriptionContainer

headerButton.addEventListener("click", () => {
    // Removed weather data
    while (weatherData.firstChild) {
        weatherData.removeChild(weatherData.firstChild);
    }

    // Removing previous fetchErrorContainer
    while (fetchErrorContainer.firstChild) {
        fetchErrorContainer.removeChild(fetchErrorContainer.firstChild)
    }

    // Hides the intro description
    introContainer.classList.remove("hidden");

    // Removes position of static of footer from classList 
    footer.classList.remove("static");
})


// Event listener when form is submitted to search for city
weatherForm.addEventListener("submit", (event) => {
    // Prevent Refresh
    event.preventDefault();

    // the formButton is disabled to prevent duplicate fetch request
    formButton.disabled = true;

    // Removed weather data to prevent duplicate cities from showing
    while (weatherData.firstChild) {
        weatherData.removeChild(weatherData.firstChild);
    }

    // Removing previous fetchErrorContainer
    while (fetchErrorContainer.firstChild) {
        fetchErrorContainer.removeChild(fetchErrorContainer.firstChild)
    }

    // Removes static classList to keep footer fixed to bottom
    footer.classList.remove("static");

    // Hides the intro description
    introContainer.classList.add("hidden");

    // Creating button to control when imperial units are shown
    const imperialButton = document.createElement("button");
    imperialButton.className = "btn-unit";
    imperialButton.textContent = "Imperial Units";
    imperialButton.disabled = true;

    // Creating button to control when metric units are shown
    const metricButton = document.createElement("button");
    metricButton.className = "btn-unit";
    metricButton.textContent = "Metric Units";


    // Getting location from the form
    const location = event.target.location.value.trim();

    // Fetching data from the API
    const fetchData = async (location, windSpeedUnit = `&wind_speed_unit=mph`, temperatureUnit = "&temperature_unit=fahrenheit", precipitationUnit = "&precipitation_unit=inch") => {
        try {
            // 1st fetch: Fetching longitude and latitude to get location of city
            const locationRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&format=json`);

            // Verifying that location is found
            if (!locationRes.ok) {
                throw new Error(locationRes.status);
            }
            const locationData = await locationRes.json();

            // Getting the longitude and latitude from locationData
            const longitude = locationData.results[0].longitude;
            const latitude = locationData.results[0].latitude;

            // 2nd fetch Fetching weather information on location using latitude and longitude
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_gusts_10m_max,precipitation_probability_max&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code,cloud_cover,rain&timezone=auto${windSpeedUnit}${temperatureUnit}${precipitationUnit}&forecast_hours=25&past_hours=0&forecast_days=10`)

            // Verify location is found
            if (!weatherRes.ok) {
                throw new Error(weatherRes.status);
            }
            const weatherInfo = await weatherRes.json();


            // Creating weatherLocation element and appending it to the weatherData container
            const weatherLocation = document.createElement("h1");
            weatherLocation.className = "weather-location";

            // Getting location via the first fetch
            // If location and admin 1 are equal, then the only location is displayed. If they are not equal, then 
            // they are both displayed. admin1 usually show state or country 
            weatherLocation.textContent = locationData.results[0].name === locationData.results[0].admin1 ?
                `${locationData.results[0].name}` :
                `${locationData.results[0].name}, ${locationData.results[0].admin1}`;

            // Append weatherLocation to the weatherData
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


            // Creating low temperature and append it to temperautreContainer
            const lowTemperature = document.createElement("p");
            lowTemperature.className = "weather-data-min-max";
            lowTemperature.textContent = `L:${Math.round(weatherInfo.daily.temperature_2m_min[0])}${weatherInfo.current_units.temperature_2m}`;
            temperatureContainer.appendChild(lowTemperature);

            // Creating weatherCondition appending it to weatherContainer
            const weatherCondition = document.createElement("p");
            weatherCondition.className = "weather-data-condition";
            weatherCondition.textContent = weatherIcon.info;
            weatherData.appendChild(weatherCondition);

            // Creating weatherContainerStats to hold more intricate weather data and appending it to weatherData container
            const weatherContainerStats = document.createElement("ul");
            weatherContainerStats.className = "weather-data-stats";
            weatherData.appendChild(weatherContainerStats);

            // Create windSpeed element and appending it to WeatherContainerStatsList 
            const windSpeed = document.createElement("li");
            windSpeed.className = "weather-data-stats-item";
            windSpeed.textContent = `Wind Speed: `;
            const windSpeedVal = document.createElement("span")
            console.log(weatherInfo.current.wind_direction_10m);
            windSpeedVal.textContent = `${getWindSpeedDirection(weatherInfo.current.wind_direction_10m)} ${Math.round(weatherInfo.current.wind_speed_10m)}${weatherInfo.current_units.wind_speed_10m}`
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

            // Creating sunrise element and appending it to weatherContainerStats list
            const sunrise = document.createElement("li");
            sunrise.className = "weather-data-stats-item"
            sunrise.textContent = `Sunrise Time: `;
            const sunriseTime = document.createElement("span");
            const sunriseTimeValue = new Date(weatherInfo.daily.sunrise[0]);
            sunriseTime.textContent = getTimeByMinute(sunriseTimeValue.getHours(),sunriseTimeValue.getMinutes());
            sunrise.appendChild(sunriseTime);
            weatherContainerStats.appendChild(sunrise);

            // Creating sunrise element and appending it to weatherContainerStats list
            const sunset = document.createElement("li");
            sunset.className = "weather-data-stats-item";
            sunset.textContent = `Sunset Time: `;
            const sunsetTime = document.createElement("span");
            const sunsetTimeValue = new Date(weatherInfo.daily.sunset[0]);
            sunsetTime.textContent = getTimeByMinute(sunsetTimeValue.getHours(),sunsetTimeValue.getMinutes());
            sunset.appendChild(sunsetTime);
            weatherContainerStats.appendChild(sunset);

            // Creating a buttonContainer to hold buttons to convert between imperial and metric system
            const buttonContainerUnitSystem = document.createElement("div");
            buttonContainerUnitSystem.className = "button-container-unit-system";
            weatherData.appendChild(buttonContainerUnitSystem);


            // Appending imperialButton to the buttonContainerUnitSystem
            buttonContainerUnitSystem.appendChild(imperialButton);

            // Appending metricButton to the buttonContainerUnitSystem
            buttonContainerUnitSystem.appendChild(metricButton);


            // Add Event listener to imperialButton to fetch the metric unit in fetch
            imperialButton.addEventListener("click", () => {

                // If imperialButton is disabled, then the button does not work
                if (imperialButton.disabled) {
                    return;
                }
                // Removes previous weather data
                while (weatherData.firstChild) {
                    weatherData.removeChild(weatherData.firstChild);
                }

                // Disabled imperialButton and enabled metricButton
                imperialButton.disabled = true;
                metricButton.disabled = false;

                // Keeps footer element fixed to bottom while fetching new data
                footer.classList.remove("static");

                // Recalls fetchData function
                fetchData(location);
            })


            // Add Event listener to metricButton to fetch the metric unit in fetch
            metricButton.addEventListener("click", () => {

                // If metricButton is disabled, then the button does not work
                if (metricButton.disabled) {
                    return;
                }
                // Removes previous weather data
                while (weatherData.firstChild) {
                    weatherData.removeChild(weatherData.firstChild);
                }

                // Enables imperialButton and disabled metricButton
                imperialButton.disabled = false;
                metricButton.disabled = true;

                // Keeps footer element fixed to bottom while fetching new data
                footer.classList.remove("static");

                // Recalls fetchData function with empty parameters, so metric can be displayed
                fetchData(location, "", "", "");
            })


            // Creating hourly forecast section and appending it to weatherData container
            const hourlyForecastContainer = document.createElement("section");
            hourlyForecastContainer.className = "hourly-weather-section";
            weatherData.appendChild(hourlyForecastContainer);

            // Creating hourly forecast header and appending it to hourlyForecastContainer
            const hourlyForecastHeader = document.createElement("h2");
            hourlyForecastHeader.className = "section-title";
            hourlyForecastHeader.textContent = "Hourly Forecast";
            hourlyForecastContainer.appendChild(hourlyForecastHeader);

            // Getting initial six hours of array
            const initialHourlyLength = 7;

            // Creating hourlyForecastList to hold hourly forecast and appending it to hourlyForecastContainer
            const hourlyForecastList = document.createElement("ul");
            hourlyForecastList.className = "hourly-forecast-list";
            hourlyForecastContainer.appendChild(hourlyForecastList);

            // Looping through each hour of the hourly forecast
            for (let index = 1; index < initialHourlyLength; index++) {
                // Creating hourlyForecastListItem and appending it to hourlyForecastList
                const hourlyForecastListItem = document.createElement("li");
                hourlyForecastListItem.className = "hourly-forecast-list-item";
                hourlyForecastList.appendChild(hourlyForecastListItem);

                // Creating hourlyForecastListItemPrecip and appending it to hourlyForecastListItem
                const hourlyForecastListItemTime = document.createElement("p");
                hourlyForecastListItemTime.className = "hourly-forecast-list-item-time";
                const currentHour = getTimeByHour(new Date(weatherInfo.hourly.time[index]).getHours());
                hourlyForecastListItemTime.textContent = `${currentHour}`;
                hourlyForecastListItem.appendChild(hourlyForecastListItemTime);

                // Getting hourly weatherIcon from getWeatherIcon() function
                const hourlyWeatherIcon = getWeatherIcon(weatherInfo.hourly.weather_code[index], weatherInfo.hourly.is_day[index]);

                // Creating hourlyForecastListItemIcon and appending it to hourlyForecastListItem
                const hourlyForecastListItemIcon = document.createElement("img");
                hourlyForecastListItemIcon.className = "hourly-forecast-list-item-img";
                hourlyForecastListItemIcon.src = hourlyWeatherIcon.imgSrc;
                hourlyForecastListItemIcon.alt = hourlyWeatherIcon.info;
                hourlyForecastListItem.appendChild(hourlyForecastListItemIcon);

                // Creating hourlyForecastListItemTemp and appending it to hourlyForecastListItem
                const hourlyForecastListItemTemp = document.createElement("p");
                hourlyForecastListItemTemp.className = "hourly-forecast-list-item-temp";
                hourlyForecastListItemTemp.textContent = `${Math.round(weatherInfo.hourly.temperature_2m[index])}${(weatherInfo.hourly_units.temperature_2m)}`;
                hourlyForecastListItem.appendChild(hourlyForecastListItemTemp);

                // Creating hourlyForecastListItemPrecip and appending it to hourlyForecastListItem
                const hourlyForecastListItemPrecip = document.createElement("p");
                hourlyForecastListItemPrecip.className = "hourly-forecast-list-item-precip";
                hourlyForecastListItemPrecip.textContent = `Precip: ${Math.round(weatherInfo.hourly.precipitation_probability[index])}${(weatherInfo.hourly_units.precipitation_probability)}`;
                hourlyForecastListItem.appendChild(hourlyForecastListItemPrecip);
            }


            // Complete hourlyForecastTable
            const fullhourlyForecastSection = document.createElement("section");
            fullhourlyForecastSection.className = "daily-forecast-container hourly-table-section";
            fullhourlyForecastSection.id = "hourly-table-section"
            weatherData.appendChild(fullhourlyForecastSection);

            const hourlyTableTitle = document.createElement("h3");
            hourlyTableTitle.className = "section-title";
            hourlyTableTitle.textContent = "Next 18 Hours";
            fullhourlyForecastSection.appendChild(hourlyTableTitle);


            // Creating table to hold 24 hour weather data
            const hourlyForecastTable = document.createElement("table");
            hourlyForecastTable.className = "daily-forecast-table";
            fullhourlyForecastSection.appendChild(hourlyForecastTable);

            // Creating table header for hourly weather data
            const hourTableRowHeader = document.createElement("tr");
            hourTableRowHeader.className = "table-row table-header";
            hourlyForecastTable.appendChild(hourTableRowHeader);

            // Creating hour table header element and appending it to table row
            const hourlyTableHeader = document.createElement("th");
            hourlyTableHeader.className = "date-column";
            hourlyTableHeader.textContent = "Hour";
            hourTableRowHeader.appendChild(hourlyTableHeader);


            // Creating temperature table header element and appending it to table row
            const hourTemperatureTableHeader = document.createElement("th");
            hourTemperatureTableHeader.className = "temperature-column";
            hourTableRowHeader.appendChild(hourTemperatureTableHeader);

            const hourAbbrTemp = document.createElement("p");
            hourAbbrTemp.className = "abbr-text";
            hourAbbrTemp.textContent = "Temp";
            hourAbbrTemp.ariaLabel = "Temperature"
            hourTemperatureTableHeader.appendChild(hourAbbrTemp);

            const hourFullTemp = document.createElement("p");
            hourFullTemp.className = "full-text";
            hourFullTemp.textContent = "Temperature"
            hourTemperatureTableHeader.appendChild(hourFullTemp);

            // Creating data table header element and appending it to table row
            const hourDescriptionTableHeader = document.createElement("th");
            hourDescriptionTableHeader.className = "description-column";
            hourTableRowHeader.appendChild(hourDescriptionTableHeader);

            const hourAbbrDesc = document.createElement("p");
            hourAbbrDesc.className = "abbr-text";
            hourAbbrDesc.textContent = "Desc";
            hourAbbrDesc.ariaLabel = "Description";
            hourDescriptionTableHeader.appendChild(hourAbbrDesc);

            const hourFullDesc = document.createElement("p");
            hourFullDesc.className = "full-text";
            hourFullDesc.textContent = "Description";
            hourDescriptionTableHeader.appendChild(hourFullDesc);

            // Creating data table header element and appending it to table row
            const hourPrecipitationTableHeader = document.createElement("th");
            hourPrecipitationTableHeader.className = "precipitation-column";
            hourTableRowHeader.appendChild(hourPrecipitationTableHeader);

            const hourAbbrPrec = document.createElement("p");
            hourAbbrPrec.className = "abbr-text";
            hourAbbrPrec.textContent = "Precip";
            hourAbbrPrec.ariaLabel = "Precipitation";
            hourPrecipitationTableHeader.appendChild(hourAbbrPrec);

            const hourFullPrec = document.createElement("p");
            hourFullPrec.className = "full-text";
            hourFullPrec.textContent = "Precipitation";
            hourPrecipitationTableHeader.appendChild(hourFullPrec);

            // Creating variable to get length of weatherInfo.hourly array
            const hourlyForecastLength = weatherInfo.hourly.time.length

            for (let index = initialHourlyLength; index < hourlyForecastLength; index++) {
                const hourlyTableRow = document.createElement("tr");
                hourlyTableRow.className = "table-row table-val";
                hourlyForecastTable.appendChild(hourlyTableRow);

                const hourlyTableData = document.createElement("td");
                hourlyTableData.className = "date-column";
                hourlyTableRow.appendChild(hourlyTableData);

                // Appending hourly Table value
                const hourlyTableVal = document.createElement("p");
                hourlyTableVal.textContent = getTimeByHour(new Date(weatherInfo.hourly.time[index]).getHours());
                hourlyTableData.appendChild(hourlyTableVal);

                // Appending date to hourly TableData 
                const hourlyTableDate = document.createElement("p");
                const hourlyMonth = new Date(weatherInfo.hourly.time[index]).getMonth() + 1;
                const hourlyDay = new Date(weatherInfo.hourly.time[index]).getDate();
                hourlyTableDate.textContent = `${hourlyMonth}/${hourlyDay}`;
                hourlyTableData.appendChild(hourlyTableDate);

                // Appending temperature to hourlyTableData
                const tempTableData = document.createElement("td");
                tempTableData.className = "temperature-column";
                tempTableData.textContent = `${Math.round(weatherInfo.hourly.temperature_2m[index])}${weatherInfo.hourly_units.temperature_2m}`;
                hourlyTableRow.appendChild(tempTableData);

                // Appending weatherIcon and description
                const hourlyDescriptionData = document.createElement("td");
                hourlyDescriptionData.className = "description-column";
                hourlyTableRow.appendChild(hourlyDescriptionData);

                // Appending weatherIcon to hourlyDescriptionData
                const hourlyWeatherIcon = getWeatherIcon(weatherInfo.hourly.weather_code[index], weatherInfo.hourly.is_day[index]);
                
                const hourlyWeatherImg = document.createElement("img");
                hourlyWeatherImg.src = hourlyWeatherIcon.imgSrc;
                hourlyWeatherImg.alt = hourlyWeatherIcon.info;
                hourlyWeatherImg.className = "weather-table-icon"
                hourlyDescriptionData.appendChild(hourlyWeatherImg);

                const hourlyWeatherInfo = document.createElement("p");
                hourlyWeatherInfo.className = "weather-table-info";
                hourlyWeatherInfo.textContent = hourlyWeatherIcon.info;
                hourlyDescriptionData.appendChild(hourlyWeatherInfo);

                // Appending precipiation to hourlyTableRow
                const hourlyPrecipitation = document.createElement("td");
                hourlyPrecipitation.className = "precipitation-column"
                hourlyPrecipitation.textContent = `${weatherInfo.hourly.precipitation_probability[index]}%`;
                hourlyTableRow.appendChild(hourlyPrecipitation);
            }

            // Creating button to show the next 18 hours of the weather forecast
            const hourlyTableButton = document.createElement("a");
            hourlyTableButton.className = "hourly-table-btn";
            hourlyTableButton.textContent = "View next 18 Hours";
            hourlyTableButton.href = "#hourly-table-section";
            weatherData.appendChild(hourlyTableButton);

            // functon to display/hide hourlyForecastTable
            hourlyTableButton.addEventListener("click", () => {
                fullhourlyForecastSection.classList.toggle("visible");
                if(fullhourlyForecastSection.classList.contains("visible")) {
                    hourlyTableButton.textContent = "Hide Extra Hours";
                } else {
                    hourlyTableButton.textContent = "View next 18 Hours";
                }
            })

            // Creating daily forecast container and appending to weatherData container
            const dailyForecastContainer = document.createElement("section");
            dailyForecastContainer.className = "daily-forecast-container";
            weatherData.appendChild(dailyForecastContainer);

            // Creating daily forecast header and appending it to dailyForecast Container
            const dailyForecastHeader = document.createElement("h2");
            dailyForecastHeader.className = "section-title";
            dailyForecastHeader.textContent = "10 day Forecast";
            dailyForecastContainer.appendChild(dailyForecastHeader);

            // Creating table to holder daily forecast and appending it to dailyForecastContainer
            const dailyForecastTable = document.createElement("table");
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
            tableRowHeader.appendChild(temperatureTableHeader);

            const abbrTempName = document.createElement("p");
            abbrTempName.className = "abbr-text";
            abbrTempName.textContent = "Temp";
            abbrTempName.ariaLabel = "Temperature"
            temperatureTableHeader.appendChild(abbrTempName);

            const fullTempName = document.createElement("p");
            fullTempName.className = "full-text";
            fullTempName.textContent = "Temperature";
            temperatureTableHeader.appendChild(fullTempName);

            // Creating data table header element and appending it to table row
            const descriptionTableHeader = document.createElement("th");
            descriptionTableHeader.className = "description-column";
            tableRowHeader.appendChild(descriptionTableHeader);

            const abbrDescName = document.createElement("p");
            abbrDescName.className = "abbr-text";
            abbrDescName.textContent = "Desc";
            abbrDescName.ariaLabel = "Description";
            descriptionTableHeader.appendChild(abbrDescName);

            const fullDescName = document.createElement("p");
            fullDescName.className = "full-text";
            fullDescName.textContent = "Description";
            descriptionTableHeader.appendChild(fullDescName);

            // Creating data table header element and appending it to table row
            const precipitationTableHeader = document.createElement("th");
            precipitationTableHeader.className = "precipitation-column";
            tableRowHeader.appendChild(precipitationTableHeader);

            const abbrPrecipName = document.createElement("p");
            abbrPrecipName.className = "abbr-text";
            abbrPrecipName.textContent = "Precip";
            abbrPrecipName.ariaLabel = "Precipitation";
            precipitationTableHeader.appendChild(abbrPrecipName);

            const fullPrecipName = document.createElement("p");
            fullPrecipName.className = "full-text";
            fullPrecipName.textContent = "Precipitation";
            precipitationTableHeader.appendChild(fullPrecipName);

            // Getting dailyLength for daily forecast
            const dailyLength = weatherInfo.daily.time.length;

            // Looping through daily forecast 
            for (let index = 0; index < dailyLength; index++) {
                // Creating table row for each table value
                const tableRowData = document.createElement("tr");
                tableRowData.className = "table-row table-val";
                dailyForecastTable.appendChild(tableRowData);


                // Creating date element weatherDateElement (to hold day and date) and appending it to tableRowData
                const date = new Date(weatherInfo.daily.time[index]);
                const weatherDateElement = document.createElement("td");
                weatherDateElement.className = "date-column";
                tableRowData.appendChild(weatherDateElement);

                // Creating day of the week element and appending it to weatherDateElement
                const dayOfWeek = document.createElement("div");
                dayOfWeek.className = "day-of-week"
                weatherDateElement.appendChild(dayOfWeek);

                const dayOfWeekVal = getDayOfWeek(date.getUTCDay());

                const abbrDay = document.createElement("p");
                abbrDay.className = "abbr-text";
                abbrDay.textContent = dayOfWeekVal.abbr;
                abbrDay.ariaLabel = dayOfWeekVal.full;
                dayOfWeek.appendChild(abbrDay);

                const fullDay = document.createElement("p");
                fullDay.className = "full-text";
                fullDay.textContent = dayOfWeekVal.full;
                dayOfWeek.appendChild(fullDay);

                // Creating weatherDate  and appending it to to weatherDateElement
                const weatherDate = document.createElement("p");
                weatherDate.textContent = `${date.getMonth() + 1}/${date.getUTCDate()}`;
                weatherDateElement.appendChild(weatherDate);

                // Creating temperature element
                const temperatureElement = document.createElement("td");
                temperatureElement.className = "temperature-column";

                // Creating span to bold highTemperature and appending to temperatureElement
                const highTemeratureContainer = document.createElement("span");
                highTemeratureContainer.className = "high-temperature-container"
                highTemeratureContainer.textContent = `${Math.round(weatherInfo.daily.temperature_2m_max[index])}${(weatherInfo.daily_units.temperature_2m_max)}`;
                temperatureElement.appendChild(highTemeratureContainer);

                // Creating span to bold highTemperature and appending to temperatureElement
                const lowTemeratureContainer = document.createElement("span");
                lowTemeratureContainer.className = "low-temperature-container"
                lowTemeratureContainer.textContent = `${Math.round(weatherInfo.daily.temperature_2m_min[index])}${(weatherInfo.daily_units.temperature_2m_min)}`;
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
                descriptionElement.appendChild(weatherIconElementImg)

                // Creating imageContainer to hold weatherIconElementImg and appending it to descriptionElement 
                const weatherIconElementInfo = document.createElement("p");
                weatherIconElementInfo.className = "weather-table-info";
                weatherIconElementInfo.textContent = weatherIconElement.info;
                descriptionElement.appendChild(weatherIconElementInfo);

                // Creating precipitationContainer and appending it to table row data
                const precipitationElement = document.createElement("td");
                precipitationElement.className = "precipitation-column";
                precipitationElement.textContent = `${weatherInfo.daily.precipitation_probability_max[index]}%`;
                tableRowData.appendChild(precipitationElement);
            }

            // Changing position of footer to static
            footer.classList.add("static");

        } catch (error) {

            // Creating fetchErrorElement and appending it to fetchErrorContainer to notify users of error when fetching data
            const fetchErrorElement = document.createElement("p");
            fetchErrorElement.className = "fetch-error-element";
            fetchErrorElement.textContent = `Cannot locate your selected city, please try again`
            fetchErrorContainer.appendChild(fetchErrorElement);
            formContainer.classList.add("invalid");
            console.log(formContainer.innerHTML);
            console.error(error);

        } finally {
            formButton.disabled = false;
        }

    }
    fetchData(location);
    weatherForm.reset();
})


// Getting footerContainer to append copyright symbol
const footerContainer = document.querySelector(".footer-container");

// Getting copyright year and creating copyright variable to append to footer container
const year = new Date().getFullYear();
const copyright = document.createElement("p");
copyright.className = "footer-copyright";
copyright.textContent = `\u{00A9} Justin Jones ${year}`;
footerContainer.appendChild(copyright);

