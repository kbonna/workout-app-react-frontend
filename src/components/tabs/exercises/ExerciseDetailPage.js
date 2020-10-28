import React from "react";
import { useHistory } from "react-router-dom";
import LeftArrow from "icons/LeftArrow";
import "./ExerciseDetailPage.scss";
import Spinner from "icons/Spinner";

function ExerciseDetailPage({ exercises }) {
  const history = useHistory();

  const handleReturn = (e) => {
    history.goBack();
  };

  let exerciseDetailPageContent;
  if (exercises === null) {
    exerciseDetailPageContent = (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <Spinner></Spinner>
      </div>
    );
  } else if (exercises.length) {
    exerciseDetailPageContent = (
      <>
        <LeftArrow onClick={handleReturn}></LeftArrow>
      </>
    );
  } else {
    exerciseDetailPageContent = <h1>404 Not Found</h1>;
  }

  return exerciseDetailPageContent;
}

export default ExerciseDetailPage;
