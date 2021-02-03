import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useNotify } from "context/NotificationProvider";
import { useUser } from "context/UserProvider";

import RoutineTable from "./RoutineTable";
import RoutinePageNav from "./RoutinePageNav";
import Add from "components/icons/Add";
import Box from "components/reusable/Box";
import Button from "components/reusable/Button";
import LinkButton from "components/reusable/LinkButton";
import styles from "./RoutineTablePage.module.scss";

import { TABLE_TYPES } from "./Routines";
import { COLUMNS_DISCOVER, COLUMNS_MY_ROUTINES } from "tables/routines";
import { deleteRoutine, fetchRoutines, forkRoutine } from "services/routines";
import routes from "utilities/routes";
import CenteredSpinner from "components/reusable/CenteredSpinner";

const renderRoutineDetailPageLink = ({ row }) => (
  <Link to={`${routes.app.routines.routine}${row.original.pk}`}>
    {row.values.name}
  </Link>
);

const renderForkStars = ({ value }) => (value === 0 ? "-" : `${value} ★`);

const RoutineTablePage = ({ tableType }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [routines, setRoutines] = useState(null);
  const user = useUser();
  const notify = useNotify();

  const handleDelete = (routine) => {
    deleteRoutine(routine.pk)
      .then(() => {
        setRoutines((prevRoutines) =>
          prevRoutines.filter((r) => r.pk !== routine.pk)
        );
        notify({
          message: `Succesfully removed ${routine.name} routine.`,
          type: "success",
        });
      })
      .catch(() => {
        notify({
          message: `${routine.name} routine was already removed.`,
          type: "error",
        });
      });
  };

  const handleFork = (routine) => {
    forkRoutine(routine.pk)
      .then(() => {
        setRoutines((prevRoutines) =>
          prevRoutines.map((r) => {
            if (r.pk === routine.pk) {
              return { ...r, can_be_forked: false };
            }
            return r;
          })
        );
        notify({
          message: `Successfully forked ${routine.name} routine.`,
          type: "success",
        });
      })
      .catch(() => {
        notify({
          message: `You already own ${routine.name} routine.`,
          type: "error",
        });
      });
  };

  const renderMyRoutinesButtons = useCallback(
    ({ row }) => (
      <>
        <LinkButton
          key={"edit"}
          label={"Edit"}
          to={`${routes.app.routines.routine}${row.original.pk}/edit`}
          className="mx-1"
        ></LinkButton>
        <Button
          key={"delete"}
          label={"Delete"}
          handleClick={() => handleDelete(row.original)}
          className="mx-1"
        ></Button>
      </>
    ),
    // eslint-disable-next-line
    []
  );

  const renderDiscoverButtons = useCallback(
    ({ row }) =>
      row.original.can_be_forked ? (
        <Button
          key={"delete"}
          label={"Fork"}
          handleClick={() => handleFork(row.original)}
          className="mx-1"
        ></Button>
      ) : (
        <span className={styles.alreadyOwned}>You already own this</span>
      ),
    // eslint-disable-next-line
    []
  );

  const columns = useMemo(() => {
    if (tableType === TABLE_TYPES.MY) {
      COLUMNS_MY_ROUTINES[0].Cell = renderRoutineDetailPageLink;
      COLUMNS_MY_ROUTINES[2].Cell = renderMyRoutinesButtons;
      return COLUMNS_MY_ROUTINES;
    } else {
      COLUMNS_DISCOVER[0].Cell = renderRoutineDetailPageLink;
      COLUMNS_DISCOVER[2].Cell = renderForkStars;
      COLUMNS_DISCOVER[3].Cell = renderDiscoverButtons;
      return COLUMNS_DISCOVER;
    }
  }, [tableType, renderDiscoverButtons, renderMyRoutinesButtons]);

  const fetchData = () => {
    setRoutines(null);
    const discover = tableType === TABLE_TYPES.DISCOVER;
    fetchRoutines(user.pk, discover).then((routines) => {
      if (routines.length) {
        setRoutines(routines);
      } else {
        setRoutines([]);
      }
    });
  };

  useEffect(fetchData, [tableType]);

  const renderRoutineTable = (routines) => {
    if (routines.length === 0) {
      return (
        <Box className={styles.box}>
          <p className={styles.boxParagraph}>No routines found.</p>
          <p className={styles.boxParagraph}>
            Create your first routine using{" "}
            <Add
              svgClassName={styles.boxAddSvg}
              borderClassName={styles.boxAddPath}
              crossClassName={styles.boxAddPath}
            ></Add>{" "}
            button!
          </p>
        </Box>
      );
    } else if (routines.length > 0) {
      return (
        <RoutineTable
          columns={columns}
          data={routines}
          searchFilter={searchFilter}
        ></RoutineTable>
      );
    }
  };

  return routines === null ? (
    <CenteredSpinner></CenteredSpinner>
  ) : (
    <>
      <RoutinePageNav
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      ></RoutinePageNav>
      {renderRoutineTable(routines)}
    </>
  );
};

export default RoutineTablePage;
