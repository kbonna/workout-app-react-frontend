import React from "react";
import Tag from "icons/Tag";
import { classNames } from "utilities/misc";

function ExerciseDetailListItemTags({ tags }) {
  const spanClasses = classNames({
    "exercise-detail-list__span": true,
    "exercise-detail-list__span-error": tags.length === 0,
  });
  const spanInnerText =
    tags.length === 0 ? "no tags defined" : tags.map((tag) => `#${tag} `);

  return (
    <li className="exercise-detail-list__item">
      <Tag></Tag>
      <span className={spanClasses}>{spanInnerText}</span>
    </li>
  );
}

export default ExerciseDetailListItemTags;
