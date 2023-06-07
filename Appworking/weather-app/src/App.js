import React, { useEffect, useState } from "react";
import axios from "axios";
import Background from "./components/Background";
import InputSection from "./components/InputSection";
import TemperatureSection from "./components/TemperatureSection";
import Descriptions from "./components/Descriptions";

function App() {
  const [zip, setZip] = useState("8001");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

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
      } catch (error) {
        console.log("Failed to fetch weather data:", error);
      }
    };

    fetchWeatherData();
  }, [units, zip]);

  const handleUnitsClick = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  const handleEnterKeyPressed = async (e) => {
    if (e.keyCode === 13) {
      setZip(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <>
      {weather && (
        <>
          <div >
            <Background units={units} temp={weather.temp} />
            <div className="overlay">
              <div className="container">
                <div className="section section__Head">
                  <h3>South African Weather Today</h3>
                </div>

                <InputSection
                  zip={zip}
                  setZip={setZip}
                  units={units}
                  handleUnitsClick={handleUnitsClick}
                  handleEnterKeyPressed={handleEnterKeyPressed}
                />


                <TemperatureSection weather={weather} units={units} />
                <Descriptions weather={weather} units={units} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
