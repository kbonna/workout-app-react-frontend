import React from "react";
import { Link } from "react-router-dom";

import Avatar from "icons/Avatar";
import routes from "utilities/routes";

function ExerciseDetailListItemOwner({ owner, ownerUsername }) {
  return (
    <li className="exercise-detail-list__item">
      <Avatar></Avatar>
      <span className="exercise-detail-list__span">
        <Link to={`${routes.app.users.user}/${owner}`}>{ownerUsername}</Link>
      </span>
    </li>
  );
}

export default ExerciseDetailListItemOwner;
