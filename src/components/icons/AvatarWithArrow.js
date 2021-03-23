import React from "react";

function AvatarWithArrow({ svgClassName, arrowPathClassName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128.778"
      height="74.097"
      version="1.1"
      viewBox="0 0 128.778 19.605"
      className={svgClassName}
    >
      <g
        fill="#fff"
        fillOpacity="1"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeLinejoin="bevel"
        strokeMiterlimit="1"
        strokeOpacity="1"
        paintOrder="fill markers stroke"
      >
        <path
          strokeWidth="0.255"
          d="M59.1 2.79a25.242 23.652 0 01-20.566 10.713 25.242 23.652 0 01-21.66-10.711C6.023 4.899.408 13.428 0 23.668v23.183h75.98V23.668C75.56 13.43 69.95 4.892 59.1 2.79z"
        ></path>
        <path
          strokeWidth="0.236"
          d="M55.093-10.143a17.103 17.103 0 01-16.735 17.1A17.103 17.103 0 0120.902-9.406 17.103 17.103 0 0136.885-27.21 17.103 17.103 0 0155.03-11.615"
        ></path>
        <path
          className={arrowPathClassName}
          strokeWidth="0.265"
          d="M111.576 24.579L102.975 9.68 94.374-5.216h34.404L120.177 9.68z"
        ></path>
      </g>
    </svg>
  );
}

export default AvatarWithArrow;
