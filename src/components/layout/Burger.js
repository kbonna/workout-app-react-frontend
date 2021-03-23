import React from "react";
import "./Burger.scss";

function Burger({ onClick, isOpened }) {
  return (
    <div className="burger-wrapper" onClick={onClick}>
      <div className={`burger burger--${isOpened ? "opened" : "closed"}`}></div>
    </div>
  );
}

export default Burger;
