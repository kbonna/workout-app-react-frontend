import Avatar from "components/icons/Avatar";
import Star from "components/icons/Star";
import React from "react";
import { Link } from "react-router-dom";
import routes from "utilities/routes";
import styles from "./RoutineListInfo.module.scss";

const RoutineListInfo = ({ owner, forksCount }) => {
  return (
    <ul className={styles.ul}>
      <li className={styles.li}>
        <Avatar
          svgClassName={styles.iconSvg}
          pathClassName={styles.iconPath}
        ></Avatar>
        <Link to={`${routes.app.users.user}${owner.pk}`}>{owner.username}</Link>
      </li>
      <li className={styles.li}>
        <Star
          svgClassName={styles.iconSvg}
          pathClassName={styles.iconPath}
        ></Star>
        {forksCount === 0 ? "no forks yet" : forksCount}
      </li>
    </ul>
  );
};

export default RoutineListInfo;
