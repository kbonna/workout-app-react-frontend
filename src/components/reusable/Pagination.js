import React from "react";
import styles from "./Pagination.module.scss";
import ChevronLeft from "components/icons/ChevronLeft";
import ChevronRight from "components/icons/ChevronRight";

const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageCount,
  pageOptions,
  gotoPage,
  nextPage,
  previousPage,
}) => {
  const pageOptionsButtons = pageOptions
    .filter(
      (page) =>
        page === 0 || page === pageCount - 1 || Math.abs(pageIndex - page) <= 1
    )
    .reduce((prev, next, index, array) => {
      return [
        ...prev,
        ...((index === 0) | (array[index] - array[index - 1] === 1)
          ? []
          : [
              <span className={styles.dots} key={`dots-${next}`}>
                {"..."}
              </span>,
            ]),
        <button
          className={`${styles.pageButton} ${
            next === pageIndex ? styles.pageButtonCurrent : null
          }`}
          onClick={() => gotoPage(next)}
          key={next}
        >
          {next + 1}
        </button>,
      ];
    }, []);

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.iconButton} ${styles.iconButtonPrevious}`}
        disabled={!canPreviousPage}
        onClick={() => previousPage()}
      >
        <ChevronLeft
          svgClassName={styles.chevronSvg}
          pathClassName={styles.chevronPath}
        ></ChevronLeft>
      </button>
      {pageOptionsButtons}
      <button
        className={`${styles.iconButton} ${styles.iconButtonNext}`}
        disabled={!canNextPage}
        onClick={() => nextPage()}
      >
        <ChevronRight
          svgClassName={styles.chevronSvg}
          pathClassName={styles.chevronPath}
        ></ChevronRight>
      </button>
    </div>
  );
};

export default Pagination;
