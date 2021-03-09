const fullName = (firstName, lastName) =>
  firstName + lastName ? `${firstName}${firstName ? " " : ""}${lastName}` : "–";

const fullLocation = (city, country) =>
  city + country ? `${city}${country ? ", " : ""}${country}` : "–";

export { fullName, fullLocation };
