/**
 * Check if object is empty.
 *
 * @param {Object} obj
 */
export function isEmpty(obj) {
  for (var i in obj) return false;
  return true;
}

/**
 * Gets last part of the url address.
 *
 * Example:
 *  stripCurrentPath('/first/second/third') returns 'third'
 *
 * @param {string} url
 */
export function stripCurrentPath(url) {
  return url.split("/").slice(-1)[0];
}

/**
 * Gets url of parent path.
 *
 * Example:
 *  stripParentPath('/first/second/third') returns '/first/second'
 *
 * @param {string} url
 */
export function stripParentPath(url) {
  return url.split("/").slice(0, -1).join("/");
}

/**
 * Blocks JS code for specified duration.
 *
 * @param {numbmer} miliseconds - Blocking time in miliseconds.
 */
export function sleep(miliseconds) {
  const currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {}
}

/**
 * Let's assume that we have array of nItems items that we want to divide into
 * pages containing nItemsPerPage items per page. This function returns first
 * and last index of array slice (subarray) that contains all items for page
 * with number currentPage.
 *
 * @param {number} currentPage - Current page number.
 * @param {number} itemsPerPage - Number of items per page.
 * @param {number} nItems - Total number of items in a collection.
 */
export const getPaginatedRange = (currentPage, nItemsPerPage, nItems) => {
  const firstItemIndex = (currentPage - 1) * nItemsPerPage;
  const lastItemIndex =
    currentPage * nItemsPerPage + 1 > nItems
      ? nItems
      : currentPage * nItemsPerPage;
  return [firstItemIndex, lastItemIndex];
};

/**
 *
 * @param {string} filterString - Filter string.
 * @param {string} property - Object property name.
 */
export const filterPropertyWithString = (filterString, property) => (obj) =>
  obj[property].includes(filterString);