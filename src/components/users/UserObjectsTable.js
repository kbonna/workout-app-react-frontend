import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import tableStyles from "reusable_styles/TableStyles.module.scss";
import styles from "./UserObjectsTable.module.scss";

const UserObjectsTable = ({ objects, objectsLabel, objectsDetailUrl }) => {
  const columns = useMemo(
    () => [
      {
        Header: objectsLabel,
        accessor: "name",
        Cell: ({ row }) => (
          <Link className={styles.Link} to={`${objectsDetailUrl}${row.original.pk}`}>
            {row.original.name}
          </Link>
        ),
      },
      {
        Header: "Type",
        accessor: "kind_display",
      },
      {
        Header: "Stars",
        accessor: "forks_count",
        Cell: ({ value }) => (value === 0 ? "-" : `${value} ★`),
      },
    ],
    [objectsLabel, objectsDetailUrl]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    data: objects,
    columns,
  });

  return (
    <table className={`${tableStyles.table} ${styles.table}`} {...getTableProps()}>
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

export default UserObjectsTable;
