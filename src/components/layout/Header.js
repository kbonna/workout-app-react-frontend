import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "components/App";
import Button from "components/reusable/Button";
import Burger from "./Burger";
import "./Header.scss";

function Header({ handleLogout, setIsSidebarOpened }) {
  const user = useContext(UserContext);

  // Left-sied logo based on login status
  let homePath;
  if (!user.loggedIn) {
    homePath = "/";
  } else {
    homePath = "/app/dashboard";
  }

  // Right-side navigation based on login status
  let headerNav;
  if (!user.loggedIn) {
    headerNav = (
      <>
        <Link to="/login">
          <Button label="Login"></Button>
        </Link>
        <Link to="/signup">
          <Button label="Sign up" extraClasses="mx-1"></Button>
        </Link>
      </>
    );
  } else {
    headerNav = (
      <>
        <span className="header__span">Hello, {user.username}.</span>
        <Link to="/">
          <Button
            handleClick={handleLogout}
            label="Logout"
            extraClasses="mx-2"
          ></Button>
        </Link>
        <Burger setIsSidebarOpened={setIsSidebarOpened}></Burger>
      </>
    );
  }

  return (
    <nav className="header">
      <Link to={homePath} className="header__logo">
        Workout App
      </Link>
      <div className="header__nav">{headerNav}</div>
    </nav>
  );
}

export default Header;
