import React from "react";
import { useParams } from "react-router-dom";

function ExerciseDetailPage() {
  let { id } = useParams();

  return <div>{`exercise: ${id}`}</div>;
}

export default ExerciseDetailPage;
