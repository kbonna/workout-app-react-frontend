import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router";
import { useNotify } from "context/NotificationProvider";
import { useUser } from "context/UserProvider";

import CenteredSpinner from "components/reusable/CenteredSpinner";
import AvatarUploadSection from "./AvatarUploadSection";
import UserProfileForm from "./UserProfileForm";

import { formReducer, FORM_ACTIONS, validateForm } from "reducers/form";
import { fetchUser, updateUserProfile } from "services/users";
import {
  fieldProps,
  formDataFromUserData,
  userDataFromFormData,
  formErrorsFromUserDataErrors,
} from "forms/profile";
import routes from "utilities/routes";

const UserProfileUpdate = () => {
  const user = useUser();
  const [formData, dispatch] = useReducer(formReducer, null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const notify = useNotify();
  const history = useHistory();

  const handleSubmit = async (e) => {
    // TODO: fix invalid frontend values still goes to server
    e.preventDefault();
    try {
      // Frontend validation
      await validateForm(fieldProps, formData);
    } catch (errors) {
      notify({
        message: "Form has errors. Fix them and resubmit again.",
        type: "error",
      });
      dispatch({
        type: FORM_ACTIONS.UPDATE_ERRORS,
        errors,
      });
    }
    try {
      // Backend validation has to be separated because of different format of error JSON (backend
      // serializer is nested, whereas frontend informations are represented by "flat" structure)
      await updateUserProfile(userDataFromFormData(formData), user.pk);
      history.push(`${routes.app.settings.profile.self}`);
      notify({
        message: `Successfully updated your profile.`,
        type: "success",
      });
    } catch (errors) {
      console.log("backend fail", formErrorsFromUserDataErrors(errors));
      dispatch({
        type: FORM_ACTIONS.UPDATE_ERRORS,
        errors: formErrorsFromUserDataErrors(errors),
      });
    }
  };

  useEffect(() => {
    fetchUser(user.pk)
      .then((userData) => {
        console.log(userData);
        dispatch({ type: FORM_ACTIONS.SET_STATE, state: formDataFromUserData(userData) });
        setProfilePictureURL(userData.profile.profile_picture);
      })
      .catch();
    // eslint-disable-next-line
  }, []);

  console.log(formData, profilePictureURL);

  return formData === null ? (
    <CenteredSpinner></CenteredSpinner>
  ) : (
    <>
      <h1 className={"mb-5"}>Edit your profile</h1>
      <AvatarUploadSection
        profilePictureURL={profilePictureURL}
        setProfilePictureURL={setProfilePictureURL}
        className={"mb-5"}
      ></AvatarUploadSection>
      <UserProfileForm
        formData={formData}
        dispatch={dispatch}
        handleSubmit={handleSubmit}
      ></UserProfileForm>
    </>
  );
};

export default UserProfileUpdate;
