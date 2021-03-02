import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useNotify } from "context/NotificationProvider";
import { useUser } from "context/UserProvider";

import RoutineUnitsTable from "./RoutineUnitsTable";
import RoutineListInfo from "./RoutineListInfo";
import MuscleDiagram from "components/reusable/MuscleDiagram";
import PageHeader from "../reusable/PageHeader";
import CenteredSpinner from "components/reusable/CenteredSpinner";
import Paragraph from "components/reusable/Paragraph";
import LinkButton from "components/reusable/LinkButton";
import Button from "components/reusable/Button";
import Box from "components/reusable/Box";

import styles from "./RoutineDetailPage.module.scss";
import routes from "utilities/routes";
import { deleteRoutine, fetchRoutine, forkRoutine } from "services/routines";
import GoBack from "components/reusable/GoBack";

const RoutineUnitsInfo = ({ exercises }) => {
  return exercises.length ? (
    <RoutineUnitsTable exercises={exercises}></RoutineUnitsTable>
  ) : (
    <Box className={styles.box}>{"This routine doesn't have any exercises yet."}</Box>
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
        <Button disabled label={"You already own this"}></Button>
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
      <GoBack history={history}></GoBack>
      <div className={styles.columns}>
        <div className={styles.column}>
          <PageHeader
            category={"routine"}
            title={routine.name}
            subtitle={routine.kind_display}
          ></PageHeader>
          <MuscleDiagram muscles={rescaleMuscleCountObject(routine.muscles_count)}></MuscleDiagram>
          <RoutineListInfo routine={routine}></RoutineListInfo>
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

export default RoutineDetailPage;
