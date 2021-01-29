import LeftArrow from "components/icons/LeftArrow";
import Spinner from "components/reusable/Spinner";
import IconButton from "components/reusable/IconButton";
import MuscleDiagram from "components/reusable/MuscleDiagram";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteRoutine, fetchRoutine, forkRoutine } from "services/routines";
import routes from "utilities/routes";
import PageHeader from "../reusable/PageHeader";
import styles from "./RoutineDetailPage.module.scss";
import RoutineListInfo from "./RoutineListInfo";
import RoutineUnitsTable from "./RoutineUnitsTable";
import Box from "components/reusable/Box";
import Paragraph from "components/reusable/Paragraph";
import Button from "components/reusable/Button";
import { useNotify } from "context/NotificationProvider";
import LinkButton from "components/reusable/LinkButton";
import { useUser } from "context/UserProvider";
import CenteredSpinner from "components/reusable/CenteredSpinner";
/**
 * Rescale muscle counts (number of exercises for specific muscle) to range 1, 2, ..., limit. This
 * is useful when using in MuscleDiagram component since it can only accept three levels of muscle
 * engagement.
 *
 * @param {object} obj - Muscle count object. Keys correspond to muscles and values correspond to
 * number of exercises in a routine engaging specific muscle.
 */
const rescaleMuscleCountObject = (obj, limit = 3) => {
  const maxCount = Math.max(...Object.values(obj));
  const rescaledEntries = Object.entries(obj).map(([muscle, count]) => [
    muscle,
    Math.ceil(((limit - 0.0001) * count) / maxCount),
  ]);
  return Object.fromEntries(rescaledEntries);
};

const RoutineUnitsInfo = ({ exercises }) => {
  return exercises.length ? (
    <RoutineUnitsTable exercises={exercises}></RoutineUnitsTable>
  ) : (
    <Box className={styles.box}>
      {"This routine doesn't have any exercises yet."}
    </Box>
  );
};

const RoutineButtons = ({ routine, user, handleFork, handleDelete }) => {
  if (routine.can_be_forked) {
    return (
      <div className={styles.routineButtons}>
        <Button label={"Fork"} onClick={handleFork}></Button>
      </div>
    );
  } else if (routine.owner === user.pk) {
    return (
      <div className={styles.routineButtons}>
        <LinkButton
          className={styles.routineButtonsEdit}
          label={"Edit"}
          to={`${routes.app.routines.routine}${routine.pk}/edit`}
        ></LinkButton>
        <Button label={"Delete"} onClick={handleDelete}></Button>
      </div>
    );
  } else {
    return (
      <div className={styles.routineButtons}>
        <span>You already own this routine</span>
      </div>
    );
  }
};

const RoutineDetailPage = () => {
  const { id: routineId } = useParams();
  const [routine, setRoutine] = useState(null);
  const history = useHistory();
  const notify = useNotify();
  const user = useUser();

  console.log(routine);

  const handleFork = () => {
    forkRoutine(routine.pk)
      .then((updatedRoutine) => {
        setRoutine(updatedRoutine);
        notify({
          message: `Succesfully forked routine ${updatedRoutine.name}`,
          type: "success",
        });
      })
      .catch(() => {
        notify({
          message: `Cannot fork this routine.`,
          type: "error",
        });
      });
  };

  const handleDelete = () => {
    deleteRoutine(routine.pk)
      .then(() => {
        history.push(routes.app.routines.myRoutines);
        notify({
          message: `Succesfully deleted routine ${routine.name}`,
          type: "success",
        });
      })
      .catch(() => {
        notify({
          message: `Cannot delete this routine.`,
          type: "error",
        });
      });
  };

  const fetchData = () => {
    fetchRoutine(routineId)
      .then((routine) => {
        setRoutine(routine);
      })
      .catch(() => {
        history.replace(routes.notFound);
      });
  };

  useEffect(fetchData, []);

  return routine === null ? (
    <CenteredSpinner></CenteredSpinner>
  ) : (
    <>
      <IconButton onClick={history.goBack} className={styles.goBack}>
        <LeftArrow svgClassName={styles.leftArrowSvg}></LeftArrow>
      </IconButton>
      <div className={styles.columns}>
        <div className={styles.column}>
          <PageHeader
            category={"routine"}
            title={routine.name}
            subtitle={routine.kind_display}
          ></PageHeader>
          <MuscleDiagram
            svgClassName={styles.musclesSvg}
            muscles={rescaleMuscleCountObject(routine.muscles_count)}
          ></MuscleDiagram>
          <RoutineListInfo
            owner={{ pk: routine.owner, username: routine.owner_username }}
            forksCount={routine.forks_count}
          ></RoutineListInfo>
          <RoutineButtons
            routine={routine}
            user={user}
            handleDelete={handleDelete}
            handleFork={handleFork}
          ></RoutineButtons>
        </div>
        <div className={styles.column}>
          <RoutineUnitsInfo exercises={routine.exercises}></RoutineUnitsInfo>
          <Paragraph
            className={styles.paragraph}
            title={"Instructions"}
            content={routine.instructions || "No instructions yet."}
          ></Paragraph>
        </div>
      </div>
    </>
  );
};

export default RoutineDetailPage;
