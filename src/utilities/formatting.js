const fullName = (firstName, lastName) =>
  firstName + lastName ? `${firstName}${firstName ? " " : ""}${lastName}` : "–";

const fullLocation = (city, country) =>
  city + country ? `${city}${country ? ", " : ""}${country}` : "–";

function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yyyy: date.getFullYear(),
  };
  return format.replace(/mm|dd|yyyy/gi, (matched) => map[matched]);
}

export { fullName, fullLocation, formatDate };
