import { Link } from "react-router-dom";

import Avatar from "components/icons/Avatar";
import Star from "components/icons/Star";
import React from "react";
import styles from "./RoutineListInfo.module.scss";

import routes from "utilities/routes";

const RoutineListInfo = ({ routine }) => {
  const { owner, owner_username, forks_count } = routine;
  return (
    <ul className={styles.ul}>
      <li className={styles.li}>
        <Avatar
          svgClassName={styles.iconSvg}
          pathClassName={styles.iconPath}
        ></Avatar>
        <Link to={`${routes.app.users.user}${owner}`}>{owner_username}</Link>
      </li>
      <li className={styles.li}>
        <Star
          svgClassName={styles.iconSvg}
          pathClassName={styles.iconPath}
        ></Star>
        {forks_count === 0
          ? "no forks yet"
          : `forked ${forks_count} ${forks_count === 1 ? "time" : "times"}`}
      </li>
    </ul>
  );
};

export default RoutineListInfo;
