import React from "react";

function Tag({ svgClassName, pathClassName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 487.85 487.85"
      version="1.1"
      viewBox="0 0 487.85 487.85"
      xmlSpace="preserve"
      className={svgClassName}
    >
      <path
        className={pathClassName}
        d="M479 215.275l-83.5-113.9c-11-15-33.3-26.3-51.8-26.3H39.2c-21.6 0-39.2 17.6-39.2 39.2v259.3c0 21.6 17.6 39.2 39.2 39.2h304.5c18.6 0 40.9-11.3 51.8-26.3l83.5-113.9c11.8-16 11.8-41.2 0-57.3zm-21.8 41.5l-83.5 113.9c-5.8 8-20.2 15.2-30.1 15.2H39.2c-6.7 0-12.2-5.5-12.2-12.2v-259.4c0-6.7 5.5-12.2 12.2-12.2h304.5c9.9 0 24.2 7.3 30.1 15.2l83.5 113.9c4.8 6.7 4.8 18.9-.1 25.6z"
      ></path>
    </svg>
  );
}

export default Tag;
