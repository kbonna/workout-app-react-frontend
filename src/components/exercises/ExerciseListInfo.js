import React from "react";
import { Link } from "react-router-dom";
import routes from "utilities/routes";

import Tag from "components/icons/Tag";
import Avatar from "components/icons/Avatar";
import Star from "components/icons/Star";
import ListWithIcons from "components/reusable/ListWithIcons";

function ExerciseListInfo({ exercise }) {
  const { tags, owner, owner_username, forks_count } = exercise;

  const tagsDisplay = tags.length ? tags.map((tag) => `#${tag.name} `) : "No tags defined";
  const ownerLink = <Link to={`${routes.app.users.user}${owner}`}>{owner_username}</Link>;
  const forksCountDisplay = forks_count ? `forked ${forks_count} times` : "No stars yet";

  return (
    <ListWithIcons
      icons={[<Tag />, <Avatar />, <Star />]}
      labels={["Tags", "Owner", "Stars"]}
      values={[tagsDisplay, ownerLink, forksCountDisplay]}
    ></ListWithIcons>
  );
}

export default ExerciseListInfo;
