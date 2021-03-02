import Avatar from "components/reusable/Avatar";
import Box from "components/reusable/Box";
import CenteredSpinner from "components/reusable/CenteredSpinner";
import GoBack from "components/reusable/GoBack";
import LinkButton from "components/reusable/LinkButton";
import PageHeader from "components/reusable/PageHeader";
import { useUser } from "context/UserProvider";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchExercises } from "services/exercises";
import { fetchRoutines } from "services/routines";
import { fetchUser } from "services/users";
import routes, { BASE_URL } from "utilities/routes";
import UserListInfo from "./UserListInfo";
import UserObjectsTable from "./UserObjectsTable";
import styles from "./UserProfilePage.module.scss";

const UserProfilePage = () => {
  const { pk: userPk } = useParams();
  const [data, setData] = useState({
    userData: null,
    userExercises: null,
    userRoutines: null,
  });
  const history = useHistory();
  const user = useUser();

  const fetchData = () => {
    const userDataPromise = fetchUser(userPk);
    const userExercisesPromise = fetchExercises(userPk, false, "-forks_count", 3);
    const userRoutinesPromise = fetchRoutines(userPk, false, "-forks_count", 3);

    Promise.all([userDataPromise, userExercisesPromise, userRoutinesPromise])
      .then(([userData, userExercises, userRoutines]) => {
        setData({ userData, userExercises, userRoutines });
      })
      .catch(() => {
        history.replace(routes.notFound);
      });
  };
  useEffect(fetchData, []);

  return data.userData == null ? (
    <CenteredSpinner></CenteredSpinner>
  ) : (
    <>
      <GoBack history={history}></GoBack>
      <div className={styles.Container}>
        <div className={`${styles.Container_column} ${styles.Container_column___info}`}>
          <PageHeader
            title={data.userData.username}
            subtitle={"private"}
            category={"user"}
          ></PageHeader>
          <Avatar src={BASE_URL + data.userData.profile.profile_picture}></Avatar>
          <UserListInfo userProfile={data.userData}></UserListInfo>
          {String(user.pk) === userPk ? (
            <LinkButton
              to={`${routes.app.users.user}${userPk}/edit-profile`}
              className={styles.Button}
              label={"Edit profile"}
            ></LinkButton>
          ) : null}
        </div>

        <div className={`${styles.Container_column} ${styles.Container_column___content}`}>
          <div className={styles.Paragraph}>
            <h2 className={styles.Paragraph_header}>Popular exercises</h2>
            {data.userExercises.length ? (
              <UserObjectsTable
                objects={data.userExercises}
                objectsLabel={"Exercise"}
                objectsDetailUrl={routes.app.exercises.exercise}
              ></UserObjectsTable>
            ) : (
              <Box className={styles.Paragraph_box}>
                <p className={styles.Paragraph_boxText}>This user doesn't have any exercises.</p>
              </Box>
            )}
          </div>

          <div className={styles.Paragraph}>
            <h2 className={styles.Paragraph_header}>Popular routines</h2>
            {data.userRoutines.length ? (
              <UserObjectsTable
                objects={data.userRoutines}
                objectsLabel={"Routine"}
                objectsDetailUrl={routes.app.routines.routine}
              ></UserObjectsTable>
            ) : (
              <Box className={styles.Paragraph_box}>
                <p className={styles.Paragraph_boxText}>This user doesn't have any routines.</p>
              </Box>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
