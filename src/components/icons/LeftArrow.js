import React from "react";

function LeftArrow({ svgClassName, pathClassName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60.909"
      height="35.338"
      version="1.1"
      viewBox="0 0 60.909 35.338"
      className={svgClassName}
    >
      <g
        transform="translate(-19.465 -32.203)"
        fill="none"
        fillOpacity="1"
        stroke="#bdbdbd"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeOpacity="1"
        strokeWidth="4"
        className={pathClassName}
      >
        <rect
          width="57.749"
          height="0.217"
          x="21.126"
          y="49.892"
          opacity="1"
          ry="2.856"
        ></rect>
        <rect
          width="22.974"
          height="0.441"
          x="-20.494"
          y="49.929"
          opacity="1"
          ry="5.818"
          transform="rotate(-45)"
        ></rect>
        <rect
          width="22.974"
          height="0.441"
          x="-73.009"
          y="20.16"
          opacity="1"
          ry="5.818"
          transform="scale(-1 1) rotate(-45)"
        ></rect>
      </g>
    </svg>
  );
}

export default LeftArrow;
