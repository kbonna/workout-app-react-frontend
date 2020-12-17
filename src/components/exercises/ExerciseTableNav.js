import React from "react";
import styles from "./ExerciseTableNav.module.scss";
import ChevronLeft from "components/icons/ChevronLeft";
import ChevronRight from "components/icons/ChevronRight";

function ExerciseTableNav({
  currentPage,
  nPages,
  incrementPage,
  decrementPage,
}) {
  return (
    <div className={styles["nav"]}>
      <button className={styles["nav__btn"]} onClick={decrementPage}>
        <ChevronLeft
          onClick={decrementPage}
          svgClassName={styles["nav__chevron-svg"]}
          pathClassName={styles["nav__chevron-path"]}
        ></ChevronLeft>
      </button>
      <p>
        {exerciseTableNavDigits(
          currentPage,
          nPages,
          styles["nav__regular-digit"],
          styles["nav__currentpage-digit"],
          styles["nav__dots"]
        )}
      </p>
      <button className={styles["nav__btn"]} onClick={incrementPage}>
        <ChevronRight
          svgClassName={styles["nav__chevron-svg"]}
          pathClassName={styles["nav__chevron-path"]}
        ></ChevronRight>
      </button>
    </div>
  );
}

function exerciseTableNavDigits(
  currentPage,
  nPages,
  regularDigitClassName,
  currentPageDigitClassName,
  dotsClassName
) {
  let pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  // remove pages in between
  pageNumbers = pageNumbers.filter((pageNumber) =>
    pageNumber === 1 ||
    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) ||
    pageNumber === nPages
      ? true
      : false
  );

  // insert dots
  if (nPages > 3) {
    if (pageNumbers[1] !== pageNumbers[0] + 1) {
      pageNumbers.splice(1, 0, "...");
    }
    if (
      pageNumbers[pageNumbers.length - 1] !==
      pageNumbers[pageNumbers.length - 2] + 1
    )
      pageNumbers.splice(pageNumbers.length - 1, 0, "...");
  }

  // wrap all pages in spans
  pageNumbers = pageNumbers.map((pageNumber, idx) => {
    let className;
    let key;
    if (pageNumber === "...") {
      className = dotsClassName;
      key = `exercise-table-nav-item-dots-${idx}`;
    } else if (pageNumber === currentPage) {
      className = currentPageDigitClassName;
      key = `exercise-table-nav-item-page-${pageNumber}`;
    } else {
      className = regularDigitClassName;
      key = `exercise-table-nav-item-page-${pageNumber}`;
    }
    return (
      <span key={key} className={className}>
        {pageNumber}
      </span>
    );
  });

  return pageNumbers;
}

export default ExerciseTableNav;
