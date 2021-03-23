import React, { useRef, useState } from "react";
import { useAuth } from "context/AuthProvider";
import { Link } from "react-router-dom";

import IconButton from "components/reusable/IconButton";
import AvatarWithArrow from "components/icons/AvatarWithArrow";
import Login from "components/icons/Login";
import Edit from "components/icons/Edit";
import Avatar from "components/icons/Avatar";
import Logout from "components/icons/Logout";
import Settings from "components/icons/Settings";

import routes from "utilities/routes";
import styles from "./Dropdown.module.scss";
import { classNames } from "utilities/misc";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownNode = useRef(null);

  const classList = classNames({
    [styles.Dropdown_list]: true,
    [styles.Dropdown_list___open]: isOpen,
  });

  const avatarArrowPathClassList = classNames({
    [styles.Dropdown_avatarArrowPath]: true,
    [styles.Dropdown_avatarArrowPath___open]: isOpen,
  });

  const handleOpenDropdown = (e) => {
    if (!isOpen) {
      setIsOpen(true);
      document.addEventListener("click", handleCloseDropdown);
    }
  };

  const handleCloseDropdown = (e) => {
    if (!dropdownNode.current.contains(e.target)) {
      setIsOpen(false);
      document.removeEventListener("click", handleCloseDropdown);
    }
  };

  return (
    <nav className={styles.Dropdown}>
      <IconButton onClick={handleOpenDropdown}>
        <AvatarWithArrow
          svgClassName={styles.Dropdown_avatarSvg}
          arrowPathClassName={avatarArrowPathClassList}
        ></AvatarWithArrow>
      </IconButton>
      {user.loggedIn ? <span className={styles.Dropdown_username}>{user.username}</span> : null}
      <ul className={classList} ref={dropdownNode}>
        {user.loggedIn ? (
          <>
            <li className={styles.Dropdown_listItem}>
              <Link className={styles.Dropdown_link} to={routes.app.settings.profile.self}>
                <Settings svgClassName={styles.Dropdown_icon}></Settings>
                Account
              </Link>
            </li>
            <li className={styles.Dropdown_listItem}>
              <Link className={styles.Dropdown_link} to={`${routes.app.users.user}${user.pk}`}>
                <Avatar svgClassName={styles.Dropdown_icon}></Avatar>
                Your profile
              </Link>
            </li>
            <li className={styles.Dropdown_listItem}>
              <button
                className={`${styles.Dropdown_link} ${styles.Dropdown_button}`}
                onClick={logout}
              >
                <Logout svgClassName={styles.Dropdown_icon}></Logout>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <span className={styles.Dropdown_separator}>
              Need a <i>free</i> account?
            </span>
            <li className={styles.Dropdown_listItem}>
              <Link className={styles.Dropdown_link} to={routes.signup}>
                <Edit svgClassName={styles.Dropdown_icon}></Edit>
                Sign up
              </Link>
            </li>
            <li className={styles.Dropdown_listItem}>
              <Link className={styles.Dropdown_link} to={routes.login}>
                <Login svgClassName={styles.Dropdown_icon}></Login>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Dropdown;
