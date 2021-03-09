import Avatar from "components/reusable/Avatar";
import CenteredSpinner from "components/reusable/CenteredSpinner";
import { useUser } from "context/UserProvider";
import React, { useEffect, useState } from "react";
import { header_with_token } from "services/auth";
import { fetchUser } from "services/users";
import routes, { BASE_URL } from "utilities/routes";

const UserProfileUpdate = () => {
  const user = useUser();
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    const image = e.target.files[0];
    const imageData = new FormData();
    imageData.append("profile_picture", image);

    console.log(imageData);

    // users/<int:user_pk>/profile_picture
    fetch(`${routes.api.users.self}${user.pk}/profile_picture`, {
      method: "PUT",
      body: imageData,
      headers: header_with_token(),
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
      });
    });
  };

  useEffect(() => {
    fetchUser(user.pk)
      .then((userData) => {
        setUserData(userData);
      })
      .catch();
    // eslint-disable-next-line
  }, []);

  console.log(userData);

  return userData === null ? (
    <CenteredSpinner></CenteredSpinner>
  ) : (
    <>
      <h1>Edit your profile</h1>
      Avatar: <input onChange={handleChange} type="file" accept="image/png, image/jpeg"></input>
      <Avatar src={BASE_URL + userData.profile.profile_picture}></Avatar>
    </>
  );
};

export default UserProfileUpdate;
