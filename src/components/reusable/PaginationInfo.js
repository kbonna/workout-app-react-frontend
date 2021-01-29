import React from "react";

const PaginationInfo = ({
  pageIndex,
  pageSize,
  pageCount,
  nItems,
  itemsName,
}) => {
  const firstItemIndex = pageIndex * pageSize + 1;
  const lastItemIndex =
    pageIndex === pageCount - 1 ? nItems : (pageIndex + 1) * pageSize;

  return (
    <>{`${firstItemIndex} - ${lastItemIndex} out of ${nItems} ${itemsName}`}</>
  );
};

export default PaginationInfo;
