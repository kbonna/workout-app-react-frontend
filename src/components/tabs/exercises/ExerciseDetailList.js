import React from "react";
import { Link } from "react-router-dom";
import routes from "utilities/routes";

import ExerciseDetailListItem from "./ExerciseDetailListItem";
import styles from "./ExerciseDetailListItem.module.scss";
import Tag from "icons/Tag";
import Avatar from "icons/Avatar";
import Star from "icons/Star";

function ExerciseDetailList({ exercise }) {
  const { tags, owner, owner_username, forks_count } = exercise;

  return (
    <ul className={styles["list"]}>
      <ExerciseDetailListItem
        icon={<Tag />}
        inner={
          tags.length === 0 ? "No tags defined" : tags.map((tag) => `#${tag} `)
        }
        isError={tags.length === 0}
      ></ExerciseDetailListItem>
      <ExerciseDetailListItem
        icon={<Avatar />}
        inner={
          <Link to={`${routes.app.users.user}/${owner}`}>{owner_username}</Link>
        }
      ></ExerciseDetailListItem>
      <ExerciseDetailListItem
        icon={<Star />}
        inner={
          forks_count === 0 ? "No stars yet" : `forked ${forks_count} times`
        }
        isError={forks_count === 0}
      ></ExerciseDetailListItem>
    </ul>
  );
}

export default ExerciseDetailList;
