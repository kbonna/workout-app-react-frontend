import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "components/context/UserProvider";
import { useAuth } from "components/context/AuthProvider";
import { useFlags } from "components/context/FlagsProvider";

import Button from "components/reusable/Button";
import Burger from "./Burger";
import "./Header.scss";

function Header(props) {
  const { logout } = useAuth();
  const user = useUser();
  const { flags, setFlags } = useFlags();

  const handleBurgerClick = () => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      isSidebarOpen: !prevFlags.isSidebarOpen,
    }));
  };

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
            handleClick={logout}
            label="Logout"
            extraClasses="mx-2"
          ></Button>
        </Link>
        <Burger
          handleClick={handleBurgerClick}
          isOpened={flags.isSidebarOpen}
        ></Burger>
      </>
    );
  }

  return (
    <>
      <nav className="header">
        <Link to={homePath} className="header__logo">
          Workout App
        </Link>
        <div className="header__nav">{headerNav}</div>
      </nav>
      {props.children}
    </>
  );
}

export default Header;
