import React, { useEffect, useState } from "react";
import { useUser } from "context/UserProvider";

import { fetchUser } from "services/users";
import routes, { BASE_URL } from "utilities/routes";
import CenteredSpinner from "components/reusable/CenteredSpinner";
import Avatar from "components/reusable/Avatar";
import PasswordChangeModal from "./PasswordChangeModal";
import EmailChangeModal from "./EmailChangeModal";
import { fullName, fullLocation } from "utilities/formatting";

import styles from "./UserProfileSettings.module.scss";
import IconButton from "components/reusable/IconButton";
import Edit from "components/icons/Edit";
import LinkButton from "components/reusable/LinkButton";

const UserProfileSettings = () => {
  const user = useUser();
  const [userData, setUserData] = useState(null);

  const [isOpenPasswordChange, setIsOpenPasswordChange] = useState(false);
  const [isOpenEmailChange, setIsOpenEmailChange] = useState(false);

  useEffect(() => {
    fetchUser(user.pk)
      .then((userData) => {
        setUserData(userData);
      })
      .catch();
    // eslint-disable-next-line
  }, []);

  return userData === null ? (
    <CenteredSpinner></CenteredSpinner>
  ) : (
    <>
      {isOpenPasswordChange && (
        <PasswordChangeModal handleClose={() => setIsOpenPasswordChange(false)} />
      )}
      {isOpenEmailChange && (
        <EmailChangeModal
          handleClose={() => setIsOpenEmailChange(false)}
          setUserData={setUserData}
        />
      )}

      <h2 className={styles.Title}>Your account</h2>
      <ul className={styles.List}>
        <li className={styles.List_item}>
          <span className={styles.List_itemLabel}>Username:</span>
          <span className={styles.List_itemValue}>{userData.username}</span>
        </li>
        <li className={styles.List_item}>
          <span className={styles.List_itemLabel}>Password:</span>
          <span className={styles.List_itemValue}>**********</span>
          <IconButton disabled={isOpenEmailChange} onClick={() => setIsOpenPasswordChange(true)}>
            <Edit svgClassName={styles.Edit} pathClassName={styles.Edit_path}></Edit>
          </IconButton>
        </li>
        <li className={styles.List_item}>
          <span className={styles.List_itemLabel}>Email:</span>
          <span className={styles.List_itemValue}>{userData.email}</span>
          <IconButton disabled={isOpenPasswordChange} onClick={() => setIsOpenEmailChange(true)}>
            <Edit svgClassName={styles.Edit} pathClassName={styles.Edit_path}></Edit>
          </IconButton>
        </li>
      </ul>
      <h2 className={styles.Title}>Profile informations</h2>
      <ul className={styles.List}>
        <li className={`${styles.List_item} ${styles.List_item___avatar}`}>
          <span className={styles.List_itemLabel}>Profile picture:</span>
          <span className={styles.List_itemValue}>
            <Avatar
              className={styles.Avatar}
              src={BASE_URL + userData.profile.profile_picture}
            ></Avatar>
          </span>
        </li>
        <li className={styles.List_item}>
          <span className={styles.List_itemLabel}>Name:</span>
          <span className={styles.List_itemValue}>
            {fullName(userData.first_name, userData.last_name)}
          </span>
        </li>
        <li className={styles.List_item}>
          <span className={styles.List_itemLabel}>Location:</span>
          <span className={styles.List_itemValue}>
            {fullLocation(userData.profile.city, userData.profile.country)}
          </span>
        </li>
        <li className={styles.List_item}>
          <span className={styles.List_itemLabel}>Gender:</span>
          <span className={styles.List_itemValue}>{userData.profile.gender && "–"}</span>
        </li>
      </ul>
      <LinkButton to={routes.app.settings.profile.edit} label={"Edit profile"}></LinkButton>
    </>
  );
};

export default UserProfileSettings;
