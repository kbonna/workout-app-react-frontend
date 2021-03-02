import { v4 } from "uuid";

/**
 * Check if object is empty.
 *
 * @param {Object} obj
 */
export const isEmpty = (obj) => {
  for (var i in obj) return false;
  return true;
};

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
    currentPage * nItemsPerPage + 1 > nItems ? nItems : currentPage * nItemsPerPage;
  return [firstItemIndex, lastItemIndex, Math.ceil(nItems / nItemsPerPage)];
};

/**
 *
 * @param {string} filterString - Filter string.
 * @param {string} property - Object property name.
 */
export const filterPropertyWithString = (filterString, property) => (obj) =>
  obj[property].includes(filterString);

/**
 * Transforms object with keys as CSS class names and values as logical
 * exprossions into classNames string.
 *
 * @param {Object} classes - Classes object.
 */
export const classNames = (classes) =>
  Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(" ");

/**
 * Given array of arrays return zipped array with corresponding elements input arrays. Rough
 * equivalent of Python zip function.
 */
export const zip = (arr) => arr[0].map((_, c) => arr.map((row) => row[c]));

/**
 * Add random string acting as key prop for react elements.
 *
 * @param {Object} obj – Any object.
 */
export const randomKey = (obj) => ({ key: v4(), ...obj });

/**
 * Checks whether something is a string.
 *
 * @param {*} obj - Any JS variable
 */
export const isString = (obj) => Object.prototype.toString.call(obj) === "[object String]";

/**
 * Checks whethere something is a boolean.
 *
 * @param {*} obj - Any JS variable
 */
export const isNumber = (obj) => Number.isFinite(obj);

/**
 * Checks whethere something is a boolean.
 *
 * @param {*} obj - Any JS variable
 */
export const isBoolean = (obj) => "boolean" === typeof obj;

/**
 * Checks whethere something is an object.
 *
 * @param {*} obj - Any JS variable
 */
export const isObject = (obj) => !!obj && obj.constructor === Object;

/**
 * Return human-readable Twitter-style duration from past event till now.
 *
 * @param {*} timeStamp - Past event timestamp.
 */
export const timeSince = (timeStamp) => {
  const now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + "s";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + "m";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + "h";
  }
  if (secondsPast > 86400) {
    const day = timeStamp.getDate();
    const month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    const year = timeStamp.getFullYear() === now.getFullYear() ? "" : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
};
