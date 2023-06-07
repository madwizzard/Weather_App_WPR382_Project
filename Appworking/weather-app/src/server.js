const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
const API_KEY = "8bd57e7c8b4c47a7d74835a2f88ae461";


// This is a server that will fetch weather data from the OpenWeatherMap API
app.get("/weather", async (req, res) => {
  const { zip, units } = req.query;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${zip},za&appid=${API_KEY}&units=${units}`
    );

    // This is the data that we want to send back to the client. It is named weatherData
    const weatherData = {
      description: response.data.weather[0].description,
      iconURL: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      temp_min: response.data.main.temp_min,
      temp_max: response.data.main.temp_max,
      pressure: response.data.main.pressure,
      humidity: response.data.main.humidity,
      speed: response.data.wind.speed,
      country: response.data.sys.country,
      name: response.data.name,
    };
    // This is the response that we send back to the client that incudes the weatherData
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
