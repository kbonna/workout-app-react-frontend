import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { UserContext, API_URL } from "components/App";
import { isEmpty } from "utilities/misc";
import { fetchExercise } from "services/Exercises";

import "./ExerciseDetailPage.scss";
import LeftArrow from "icons/LeftArrow";
import Spinner from "icons/Spinner";
import Tag from "icons/Tag";

function ExerciseDetailPage() {
  const [exercise, setExercise] = useState(null);
  const { userId } = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const handleReturn = (e) => {
    history.goBack();
  };

  const fetchData = () => {
    if (userId) {
      const exerciseId = location.pathname.split("/").slice(-1)[0];
      fetchExercise(API_URL, exerciseId).then((exercise) => {
        if (isEmpty(exercise)) {
          setExercise({});
        } else {
          setExercise(exercise);
        }
      });
    }
  };

  useEffect(fetchData, [userId, location.pathname]);

  let exerciseDetailPageContent;
  if (exercise === null) {
    exerciseDetailPageContent = (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <Spinner></Spinner>
      </div>
    );
  } else if (exercise.isEmpty) {
    exerciseDetailPageContent = <h1>404 Not Found</h1>;
  } else {
    exerciseDetailPageContent = (
      <>
        <LeftArrow onClick={handleReturn}></LeftArrow>
        <div className="exercise-detail-wrapper">
          <div className="exercise-detail-left">
            {/* header */}
            <div className="exercise-detail-header">
              <p className="exercise-detail-header__subtitle">exercise</p>
              <h1 className="exercise-detail-header__title">{exercise.name}</h1>
              <h1 className="exercise-detail-header__kind">
                {exercise.kind_display}
              </h1>
            </div>
            {/* muscle diagram */}
            <img
              src={process.env.PUBLIC_URL + "/images/muscles.png"}
              alt="muscle diagram"
              style={{ width: "180px" }}
            ></img>
            <ul className="exercise-detail-list">
              <li className="exercise-detail-list__item">
                <Tag></Tag>
                <span className="exercise-detail-list__span">xxx</span>
              </li>
              <li className="exercise-detail-list__item"></li>
              <li className="exercise-detail-list__item"></li>
            </ul>
          </div>
          <div className="exercise-detail-right"></div>
        </div>
      </>
    );
  }

  return exerciseDetailPageContent;
}

export default ExerciseDetailPage;
