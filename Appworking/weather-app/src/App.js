import React, { useEffect, useState } from "react";
import axios from "axios";
import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import InputSection from "./components/InputSection";
import TemperatureSection from "./components/TemperatureSection";
import Descriptions from "./components/Descriptions";
import HeadSection from "./components/HeadSection";

function App() {
  //Setting all the states that will be used in the app
  const [zip, setZip] = useState("8001");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  //This is a hook that will run when the component mounts and when the zip or units state changes it also gets the weather data from the server
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
        const threshold = units === "metric" ? 20 : 67.3;
        if (response.data.temp <= threshold) setBg(coldBg);
        else setBg(hotBg);
      } catch (error) {
        console.log("Failed to fetch weather data:", error);
      }
    };
    
  // This is the call to the fetchWeatherData function in the useEffect hook
    fetchWeatherData();
  }, [units, zip]);

  //This function will change the units state from metric to imperial and vice versa
  const handleUnitsClick = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  //This function will set the zip code when the enter key is pressed
  const handleEnterKeyPressed = async (e) => {
    if (e.keyCode === 13) {
      setZip(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

// This is the return statement that will render the app 
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
