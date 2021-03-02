import React from "react";
import { Link } from "react-router-dom";

import ListWithIcons from "components/reusable/ListWithIcons";
import Avatar from "components/icons/Avatar";
import Star from "components/icons/Star";

import routes from "utilities/routes";

const RoutineListInfo = ({ routine }) => {
  const { owner, owner_username, forks_count } = routine;

  const ownerLink = <Link to={`${routes.app.users.user}${owner}`}>{owner_username}</Link>;
  const forksCountDisplay =
    forks_count === 0
      ? "no forks yet"
      : `forked ${forks_count} ${forks_count === 1 ? "time" : "times"}`;

  return (
    <ListWithIcons
      icons={[<Avatar />, <Star />]}
      labels={["Owner", "Stars"]}
      values={[ownerLink, forksCountDisplay]}
    ></ListWithIcons>
  );
};

export default RoutineListInfo;
