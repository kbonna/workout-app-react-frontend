import React from "react";

import Avatar from "components/icons/Avatar";
import Heart from "components/icons/Heart";
import List from "components/icons/List";
import Login from "components/icons/Login";
import Placeholder from "components/icons/Placeholder";
import ListWithIcons from "components/reusable/ListWithIcons";

import { timeSince } from "utilities/misc";
import { fullLocation, fullName } from "utilities/formatting";

const UserListInfo = ({ userProfile: user }) => {
  const { profile } = user;

  const userName = fullName(user.first_name, user.last_name);
  const userLocation = fullLocation(user.profile.city, user.profile.location);
  const userDateOfBirth = profile.date_of_birth || "–";
  const userGender = profile.gender_display || "–";
  const userLastLogin = user.last_login ? timeSince(new Date(user.last_login)) + " ago" : "never";

  const icons = [<Avatar />, <Placeholder />, <List />, <Heart />, <Login />];
  const labels = ["Name", "Location", "Date of birth", "Gender", "Last login"];
  const values = [userName, userLocation, userDateOfBirth, userGender, userLastLogin];

  return <ListWithIcons icons={icons} labels={labels} values={values}></ListWithIcons>;
};

export default UserListInfo;
