import Add from "components/icons/Add";
import LinkHighlighedIfMatch from "hoc/LinkHighlighedIfMatch";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "utilities/routes";
import styles from "./RoutinePageNav.module.scss";

const RoutinePageNav = ({ searchFilter, setSearchFilter }) => {
  const location = useLocation();
  return (
    <div className={styles.nav}>
      <ul className={styles.navLinksList}>
        <li className={styles.navLinksListItem}>
          <LinkHighlighedIfMatch
            classNameBase={styles.navLink}
            classNameActive={styles.navLinkActive}
            location={location}
            to={routes.app.routines.myRoutines}
          >
            My Routines
          </LinkHighlighedIfMatch>
        </li>
        <li className={styles.navLinksListItem}>
          <LinkHighlighedIfMatch
            classNameBase={styles.navLink}
            classNameActive={styles.navLinkActive}
            location={location}
            to={routes.app.routines.discover}
          >
            Discover
          </LinkHighlighedIfMatch>
        </li>
      </ul>
      <div className={styles.navControl}>
        <input
          className={styles.navSearch}
          onChange={(e) => {
            setSearchFilter(e.target.value);
          }}
          value={searchFilter}
          placeholder={"search..."}
        ></input>
        <Link className={styles.add} to={routes.app.routines.new}>
          <Add
            svgClassName={styles.addSvg}
            crossClassName={styles.addCross}
            borderClassName={styles.addBorder}
            backgroundClassName={styles.addBackground}
          ></Add>
        </Link>
      </div>
    </div>
  );
};

export default RoutinePageNav;
