import React from "react";

function ExerciseDetailMuscleDiagram() {
  return (
    <img
      src={process.env.PUBLIC_URL + "/images/muscles.png"}
      alt="muscle diagram"
      style={{ width: "225px" }}
    ></img>
  );
}

export default ExerciseDetailMuscleDiagram;
