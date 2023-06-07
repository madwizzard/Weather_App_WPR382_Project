import React from "react";
import hotBg from "../assets/hot.jpg";
import coldBg from "../assets/cold.jpg";

function Background({ units, temp }) {
  const bg = temp <= (units === "metric" ? 20 : 66.3) ? coldBg : hotBg;
  return <div className="app" style={{ backgroundImage: `url(${bg})` }} />;
}

export default Background;
