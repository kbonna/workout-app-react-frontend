import React, { useEffect } from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import styles from "./RoutineTable.module.scss";
import Pagination from "../reusable/Pagination";
import PaginationInfo from "../reusable/PaginationInfo";

const PAGE_SIZE = 10;

const RoutineTable = ({ columns, data, searchFilter }) => {
  const instance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: PAGE_SIZE, pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageSize, pageIndex },
    setFilter,
  } = instance;

  useEffect(() => {
    setFilter("name", searchFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  return (
    <table className={styles.table} {...getTableProps()}>
      <thead className={styles.header}>
        {headerGroups.map((headerGroup) => (
          <tr
            className={styles.headerRow}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <th
                className={styles.headerCell}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={styles.body} {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr className={styles.bodyRow} {...row.getRowProps()}>
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
      <tfoot className={styles.footer}>
        <tr className={styles.footerRow}>
          <td className={styles.footerCell}>
            <Pagination
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              pageIndex={pageIndex}
              pageCount={pageCount}
              pageOptions={pageOptions}
              gotoPage={gotoPage}
              nextPage={nextPage}
              previousPage={previousPage}
            ></Pagination>
          </td>
          {[...Array(columns.length - 2).keys()].map((idx) => (
            <td key={idx} className={styles.footerCell}></td>
          ))}
          <td className={styles.footerCell}>
            <PaginationInfo
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount}
              nItems={data.length}
              itemsName={"routines"}
            ></PaginationInfo>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default RoutineTable;
