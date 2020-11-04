import React from "react";
import Star from "icons/Star";
import { classNames } from "utilities/misc";

function ExerciseDetailListItemForksCount({ forksCount }) {
  const spanClasses = classNames({
    "exercise-detail-list__span": true,
    "exercise-detail-list__span-error": forksCount === 0,
  });
  const spanInnerText =
    forksCount === 0 ? "no stars yet" : `forked ${forksCount} times`;

  return (
    <li className="exercise-detail-list__item">
      <Star></Star>
      <span className={spanClasses}>{spanInnerText}</span>
    </li>
  );
}

export default ExerciseDetailListItemForksCount;
