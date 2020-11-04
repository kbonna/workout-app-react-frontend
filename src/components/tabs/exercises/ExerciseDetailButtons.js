import React, { useContext } from "react";
import { UserContext } from "components/App";

function ExerciseDetailButtons({ exercise }) {
  const { userId } = useContext(UserContext);
  return <div className="exercise-detail-buttons"></div>;
}

export default ExerciseDetailButtons;
