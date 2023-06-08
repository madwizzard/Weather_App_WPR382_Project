import React from "react";

function TemperatureSection({ weather, units }) {
  return (
    <div className="section section__temperature">
      <div className="icon">
        <h3>{`${weather.name}, ${weather.country}`}</h3>
        <img src={weather.iconURL} alt="weatherIcon" />
        <h3>{weather.description}</h3>
        <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>
      </div>
    </div>
  );
}

export default TemperatureSection;
