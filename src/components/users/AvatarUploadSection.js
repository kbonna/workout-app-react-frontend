import FileInput from "components/form_elements/FileInput";
import Avatar from "components/reusable/Avatar";
import Button from "components/reusable/Button";
import { useNotify } from "context/NotificationProvider";
import { useUser } from "context/UserProvider";
import React from "react";
import {
  updateUserProfilePicture,
  deleteUserProfilePicture,
  DEFAULT_PROFILE_PICTURE_URL,
} from "services/users";
import { classNames } from "utilities/misc";
import { BASE_URL } from "utilities/routes";
import style from "./AvatarUploadSection.module.scss";

const AvatarUploadSection = ({ profilePictureURL, setProfilePictureURL, className }) => {
  const user = useUser();
  const notify = useNotify();
  const classList = classNames({
    [style.Section]: true,
    [className]: className,
  });

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    const imageData = new FormData();
    imageData.append("profile_picture", image);

    try {
      const json = await updateUserProfilePicture(user.pk, imageData);
      setProfilePictureURL(json.profile_picture + "?" + new Date().getTime());
      notify({ type: "success", message: "Succesfully updated profile picture." });
    } catch (errors) {
      const message = errors["profile_picture"].join(" ") || "Cannot upload profile picture.";
      notify({ type: "error", message });
    }
  };

  const handleImageDelete = async (e) => {
    try {
      await deleteUserProfilePicture(user.pk);
      setProfilePictureURL(DEFAULT_PROFILE_PICTURE_URL);
      notify({ type: "success", message: "Succesfully removed profile picture." });
    } catch (errors) {
      notify({ type: "error", message: "Something went wrong." });
    }
  };

  return (
    <div className={classList}>
      <span className={style.Section_label}>Avatar:</span>
      <Avatar className={style.Section_avatar} src={`${BASE_URL}${profilePictureURL}`}></Avatar>
      <div className={style.Section_buttons}>
        <FileInput onChange={handleImageChange} accept="image/*"></FileInput>
        {profilePictureURL !== DEFAULT_PROFILE_PICTURE_URL ? (
          <Button label={"Delete"} onClick={handleImageDelete}></Button>
        ) : null}
      </div>
    </div>
  );
};

export default AvatarUploadSection;
