// Function to return weather icons
export default function getWeatherIcon(weatherCode = 0, dayTime = 1) {
  // An array that holds a various of weather icons and info at different weather codes
  const weatherCodeList = [
    {
      weatherCode: 0,
      dayTime: 1,
      imgSrc: "./images/sun.png",
      info: "Clear Skies",
    },
    {
      weatherCode: 0,
      dayTime: 0,
      imgSrc: "./images/moon.png",
      info: "Clear Skies",
    },
    {
      weatherCode: 1,
      dayTime: 1,
      imgSrc: "./images/sun.png",
      info: "Mainly Clear",
    },
    {
      weatherCode: 1,
      dayTime: 0,
      imgSrc: "./images/moon.png",
      info: "Mainly Clear",
    },
    {
      weatherCode: 2,
      dayTime: 1,
      imgSrc: "./images/partly-cloudy.png",
      info: "Partly Cloudy",
    },
    {
      weatherCode: 2,
      dayTime: 0,
      imgSrc: "./images/partly-cloudy-moon.png",
      info: "Partly Cloudy",
    },
    {
      weatherCode: 3,
      dayTime: 1,
      imgSrc: "./images/overcast.png",
      info: "Overcast",
    },
    {
      weatherCode: 3,
      dayTime: 0,
      imgSrc: "./images/overcast-dark.png",
      info: "Overcast",
    },
    {
      weatherCode: 45,
      dayTime: 1,
      imgSrc: "./images/fog.png",
      info: "Fog",
    },
    {
      weatherCode: 48,
      dayTime: 1,
      imgSrc: "./images/fog.png",
      info: "Rime Fog",
    },
    {
      weatherCode: 51,
      dayTime: 1,
      imgSrc: "./images/light-drizzle.png",
      info: "Light Drizzle",
    },
    {
      weatherCode: 53,
      dayTime: 1,
      imgSrc: "./images/drizzle.png",
      info: "Moderate Drizzle",
    },
    {
      weatherCode: 55,
      dayTime: 1,
      imgSrc: "./images/drizzle.png",
      info: "Drizzle",
    },
    {
      weatherCode: 56,
      dayTime: 1,
      imgSrc: "./images/freezing-rain.png",
      info: "Light Freezing Drizzle",
    },
    {
      weatherCode: 57,
      dayTime: 1,
      imgSrc: "./images/freezing-rain.png",
      info: "Freezing Drizzle",
    },
    {
      weatherCode: 61,
      dayTime: 1,
      imgSrc: "./images/rain.png",
      info: "Light Rain",
    },
    {
      weatherCode: 63,
      dayTime: 1,
      imgSrc: "./images/rain.png",
      info: "Moderate Rain",
    },
    {
      weatherCode: 65,
      dayTime: 1,
      imgSrc: "./images/heavy-rain.png",
      info: "Heavy Rain",
    },
    {
      weatherCode: 66,
      dayTime: 1,
      imgSrc: "./images/freezing-rain.png",
      info: "Light Freezing Rain",
    },
    {
      weatherCode: 67,
      dayTime: 1,
      imgSrc: "./images/freezing-rain.png",
      info: "Heavy Freezing rain",
    },
    {
      weatherCode: 71,
      dayTime: 1,
      imgSrc: "./images/light-snow.png",
      info: "Light Snow",
    },
    {
      weatherCode: 73,
      dayTime: 1,
      imgSrc: "./images/snow.png",
      info: "Moderate Snow",
    },
    {
      weatherCode: 75,
      dayTime: 1,
      imgSrc: "./images/snow.png",
      info: "Heavy Snow",
    },
    {
      weatherCode: 77,
      dayTime: 1,
      imgSrc: "./images/light-snow.png",
      info: "Snow Grains",
    },
    {
      weatherCode: 80,
      dayTime: 1,
      imgSrc: "./images/light-drizzle.png",
      info: "Light Rain Showers",
    },
    {
      weatherCode: 81,
      dayTime: 1,
      imgSrc: "./images/rain.png",
      info: "Moderate Rain Showers",
    },
    {
      weatherCode: 82,
      dayTime: 1,
      imgSrc: "./images/heavy-rain.png",
      info: "Heavy Rain Showers",
    },
    {
      weatherCode: 85,
      dayTime: 1,
      imgSrc: "./images/light-snow.png",
      info: "Light Snow Showers",
    },
    {
      weatherCode: 86,
      dayTime: 1,
      imgSrc: "./images/snow.png",
      info: "Heavy Snow Showers",
    },
    {
      weatherCode: 95,
      dayTime: 1,
      imgSrc: "./images/thunderstorm.png",
      info: "Thunderstorm",
    },
    {
      weatherCode: 96,
      dayTime: 1,
      imgSrc: "./images/hail.png",
      info: "Thunderstorm with light hail",
    },
    {
      weatherCode: 99,
      dayTime: 1,
      imgSrc: "./images/hail.png",
      info: "Thunderstorm with heavy hail",
    },
  ];

  // Weather codes greater than 3 use the same image and info, so dayTime is set to 1.
  // So they are used together
  if (weatherCode > 3) {
    dayTime = 1;
  }

  // Filters the array so only the item that matches the weatherCode and dayTime returns
  const filteredArray = weatherCodeList.filter((item) => {
    return weatherCode === item.weatherCode && dayTime === item.dayTime;
  });

  // Returns the 1 item in the array that has the weatherCode
  return filteredArray[0];
}
