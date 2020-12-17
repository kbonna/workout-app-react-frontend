import React from "react";
import styles from "./LeftArrow.module.scss";

function LeftArrow({ thickness, width, color, onClick }) {
  return (
    <svg
      onClick={onClick}
      className={styles["icon-left-arrow"]}
      xmlns="http://www.w3.org/2000/svg"
      width={`${width}mm`}
      height={`${width / 2}mm`}
      version="1.1"
      viewBox="0 0 130 55.686"
    >
      <g transform="translate(-100 -167.834)">
        <g fill={color}>
          <rect
            width="130"
            height={thickness}
            x="100"
            y="194"
            strokeWidth="0.256"
            ry="5"
          ></rect>
          <rect
            width="40"
            height={thickness}
            x="208.763"
            y="64"
            strokeWidth="0.142"
            ry="5"
            transform="rotate(45)"
          ></rect>
          <rect
            width="40"
            height={thickness}
            x="-67"
            y="208.763"
            strokeWidth="0.142"
            ry="5"
            transform="rotate(-45)"
          ></rect>
        </g>
      </g>
    </svg>
  );
}

LeftArrow.defaultProps = {
  width: 15,
  thickness: 8,
  color: "#bdbdbd",
};

export default LeftArrow;
