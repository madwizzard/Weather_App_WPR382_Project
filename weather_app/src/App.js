import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [zip, setZip] = useState("8001");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/weather", {
          params: {
            zip: zip,
            units: units,
          },
        });
        setWeather(response.data);

        // dynamic bg
        const threshold = units === "metric" ? 20 : 66.3;
        if (response.data.temp <= threshold) setBg(coldBg);
        else setBg(hotBg);
      } catch (error) {
        console.log("Failed to fetch weather data:", error);
      }
    };

    fetchWeatherData();
  }, [units, zip]);

  const handleUnitsClick = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  const enterKeyPressed = async (e) => {
    if (e.keyCode === 13) {
      setZip(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__Head">
              <h3>South African Weather Today</h3>
            </div>
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="zip"
                placeholder="Enter Zip code..."
              />
              <button onClick={handleUnitsClick}>
                {units === "metric" ? "°F" : "°C"}
              </button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
