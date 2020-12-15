import React from "react";
import "./Burger.scss";

function Burger({ handleClick, isOpened }) {
  return (
    <div className="burger-wrapper" onClick={handleClick}>
      <div className={`burger burger--${isOpened ? "opened" : "closed"}`}></div>
    </div>
  );
}

export default Burger;
