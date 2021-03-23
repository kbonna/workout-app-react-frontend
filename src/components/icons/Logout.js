import React from "react";

function Logout({ svgClassName, pathClassName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 490.2 490.2"
      version="1.1"
      viewBox="0 0 490.2 490.2"
      xmlSpace="preserve"
      className={svgClassName}
    >
      <path
        className={pathClassName}
        d="M490.2 369.2V121c0-34.2-27.9-62.1-62.1-62.1H227.5c-34.2 0-62.1 27.9-62.1 62.1v40.2c0 6.8 5.5 12.3 12.3 12.3S190 168 190 161.2V121c0-20.7 16.9-37.6 37.6-37.6h200.5c20.7 0 37.6 16.9 37.6 37.6v248.2c0 20.7-16.9 37.6-37.6 37.6H227.5c-20.7 0-37.6-16.9-37.6-37.6V329c0-6.8-5.5-12.3-12.3-12.3s-12.3 5.5-12.3 12.3v40.2c0 34.2 27.9 62.1 62.1 62.1h200.7c34.2 0 62.1-27.8 62.1-62.1z"
      ></path>
      <path
        className={pathClassName}
        d="M3.6 253.8l83.9 83.9c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6c4.8-4.8 4.8-12.5 0-17.3l-63-63h229.8c6.8 0 12.3-5.5 12.3-12.3s-5.5-12.3-12.3-12.3H41.8l63-63c4.8-4.8 4.8-12.5 0-17.3s-12.5-4.8-17.3 0L3.6 236.4c-4.8 4.8-4.8 12.6 0 17.4z"
      ></path>
    </svg>
  );
}

export default Logout;
