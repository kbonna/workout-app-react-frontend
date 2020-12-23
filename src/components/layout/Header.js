import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "context/UserProvider";
import { useAuth } from "context/AuthProvider";
import { FLAGS_ACTIONS, useFlags } from "context/FlagsProvider";

import Button from "components/reusable/Button";
import Burger from "./Burger";
import "./Header.scss";

function Header(props) {
  const [flags, dispatchFlags] = useFlags();
  const { logout } = useAuth();
  const user = useUser();

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
          <Button label="Sign up" className="mx-1"></Button>
        </Link>
      </>
    );
  } else {
    headerNav = (
      <>
        <span className="header__span">Hello, {user.username}.</span>
        <Link to="/">
          <Button handleClick={logout} label="Logout" className="mx-2"></Button>
        </Link>
        <Burger
          handleClick={() => {
            dispatchFlags({ type: FLAGS_ACTIONS.TOGGLE_SIDEBAR });
          }}
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
