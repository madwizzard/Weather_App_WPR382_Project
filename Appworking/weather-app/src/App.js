import React, { useEffect, useState } from "react";
import axios from "axios";
import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import InputSection from "./components/InputSection";
import TemperatureSection from "./components/TemperatureSection";
import Descriptions from "./components/Descriptions";
import HeadSection from "./components/HeadSection";

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
          
          <div className="app" style={{ backgroundImage: `url(${bg})` }}>
            <div className="overlay">
              <div className="container">
                <HeadSection />
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
