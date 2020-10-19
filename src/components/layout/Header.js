import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import Burger from "../other/Burger";
import { UserContext } from "../App";

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
          <button className="btn btn--light">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn btn--light mx-1">Sign Up</button>
        </Link>
      </>
    );
  } else {
    headerNav = (
      <>
        <span>Hello, {user.username}.</span>
        <Link to="/">
          <button
            className="btn btn--light mx-2"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
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
