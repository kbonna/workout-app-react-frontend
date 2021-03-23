import React from "react";
import { FLAGS_ACTIONS, useFlags } from "context/FlagsProvider";
import { useUser } from "context/UserProvider";
import { Link } from "react-router-dom";

import Dropdown from "./Dropdown";
import Burger from "./Burger";

import styles from "./Header.module.scss";
import routes from "utilities/routes";

function Header(props) {
  const [flags, dispatchFlags] = useFlags();
  const user = useUser();
  const handleBurgerClick = () => {
    dispatchFlags({ type: FLAGS_ACTIONS.TOGGLE_SIDEBAR });
  };

  return (
    <header className={styles.Header}>
      <Link
        to={user.loggedIn ? routes.app.dashboard.self : routes.root}
        className={styles.Header_logo}
      >
        Workout App
      </Link>
      <div className={styles.Header_menu}>
        <Dropdown></Dropdown>
        {user.loggedIn ? (
          <Burger onClick={handleBurgerClick} isOpened={flags.isSidebarOpen}></Burger>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
