import React from "react";

function InputSection({ zip, units, handleUnitsClick, handleEnterKeyPressed, setZip }) {
  
  return (
    <div className="section section__inputs">
      <input
        onKeyDown={handleEnterKeyPressed}
        type="text"
        name="zip"
        placeholder="Enter Zip code..."
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />
      <button onClick={handleUnitsClick}>{units === "metric" ? "°F" : "°C"}</button>
    </div>
  );
}

export default InputSection;
