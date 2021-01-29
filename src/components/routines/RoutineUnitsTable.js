import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

import Chat from "components/icons/Chat";
import Tooltip from "components/reusable/Tooltip";
import tableStyles from "reusable_styles/TableStyles.module.scss";
import styles from "./RoutineUnitsTable.module.scss";
import routes from "utilities/routes";

const RoutineUnitsTable = ({ exercises }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Exercise",
        accessor: "exercise_name",
        Cell: ({ row }) => (
          <Link
            className={styles.exerciseLink}
            to={`${routes.app.exercises.exercise}${row.original.exercise}`}
          >
            {row.original.exercise_name}
          </Link>
        ),
      },
      {
        Header: "Sets",
        accessor: "sets",
      },
      {
        Header: "Instructions",
        accessor: "instructions",
        Cell: ({ value }) =>
          value !== "" ? (
            <Tooltip message={value}>
              <Chat
                svgClassName={styles.chatSvg}
                pathClassName={styles.chatPath}
              ></Chat>
            </Tooltip>
          ) : (
            "–"
          ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    data: exercises,
    columns,
  });

  return (
    <table
      className={`${tableStyles.table} ${styles.table}`}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className={styles.headerCell} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td className={styles.bodyCell} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RoutineUnitsTable;
