import React from "react";

import ExerciseDetailListItemTags from "./ExerciseDetailListItemTags";
import ExerciseDetailListItemOwner from "./ExerciseDetailListItemOwner";
import ExerciseDetailListItemForksCount from "./ExerciseDetailListItemForksCount";

function ExerciseDetailList({ exercise }) {
  return (
    <ul className="exercise-detail-list">
      <ExerciseDetailListItemTags
        tags={exercise.tags}
      ></ExerciseDetailListItemTags>
      <ExerciseDetailListItemOwner
        owner={exercise.owner}
        ownerUsername={exercise.owner_username}
      ></ExerciseDetailListItemOwner>
      <ExerciseDetailListItemForksCount
        forksCount={exercise.forks_count}
      ></ExerciseDetailListItemForksCount>
    </ul>
  );
}

export default ExerciseDetailList;
