import Add from "components/icons/Add";
import LinkHighlighedIfMatch from "hoc/LinkHighlighedIfMatch";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "utilities/routes";
import styles from "./RoutinePageNav.module.scss";

const RoutinePageNav = ({ searchFilter, setSearchFilter }) => {
  const location = useLocation();
  return (
    <div className={styles.Nav}>
      <ul className={styles.Nav_linkList}>
        <li className={styles.Nav_linkListItem}>
          <LinkHighlighedIfMatch
            classNameBase={styles.Nav_link}
            classNameActive={styles.Nav_link___active}
            location={location}
            to={routes.app.routines.myRoutines}
          >
            My Routines
          </LinkHighlighedIfMatch>
        </li>
        <li className={styles.Nav_linkListItem}>
          <LinkHighlighedIfMatch
            classNameBase={styles.Nav_link}
            classNameActive={styles.Nav_link___active}
            location={location}
            to={routes.app.routines.discover}
          >
            Discover
          </LinkHighlighedIfMatch>
        </li>
      </ul>
      <div className={styles.Nav_control}>
        <input
          className={styles.Nav_search}
          onChange={(e) => {
            setSearchFilter(e.target.value);
          }}
          value={searchFilter}
          placeholder={"search..."}
        ></input>
        <Link className={styles.ButtonAdd} to={routes.app.routines.new}>
          <Add
            svgClassName={styles.ButtonAdd_svg}
            crossClassName={styles.ButtonAdd_cross}
            borderClassName={styles.ButtonAdd_border}
            backgroundClassName={styles.ButtonAdd_background}
          ></Add>
        </Link>
      </div>
    </div>
  );
};

export default RoutinePageNav;
