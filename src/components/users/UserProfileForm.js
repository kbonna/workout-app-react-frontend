import React from "react";
import { useHistory } from "react-router";

import Input from "components/form_elements/Input";
import Button from "components/reusable/Button";
import Select from "components/form_elements/Select";

import { handleChangeField } from "reducers/form";
import { fieldProps } from "forms/profile";
import routes from "utilities/routes";
import styles from "./UserProfileForm.module.scss";

const UserProfileForm = ({ formData, dispatch, handleSubmit }) => {
  const history = useHistory();

  return (
    <form className={styles.Form}>
      <Input
        label={fieldProps.firstName.label}
        name={fieldProps.firstName.htmlName}
        placeholder={fieldProps.firstName.placeholder}
        value={formData.values.firstName}
        error={formData.errors.firstName}
        onChange={handleChangeField(dispatch)}
      ></Input>
      <Input
        label={fieldProps.lastName.label}
        name={fieldProps.lastName.htmlName}
        placeholder={fieldProps.lastName.placeholder}
        value={formData.values.lastName}
        error={formData.errors.lastName}
        onChange={handleChangeField(dispatch)}
      ></Input>
      <Input
        label={fieldProps.country.label}
        name={fieldProps.country.htmlName}
        placeholder={fieldProps.country.placeholder}
        value={formData.values.country}
        error={formData.errors.country}
        onChange={handleChangeField(dispatch)}
      ></Input>
      <Input
        label={fieldProps.city.label}
        name={fieldProps.city.htmlName}
        placeholder={fieldProps.city.placeholder}
        value={formData.values.city}
        error={formData.errors.city}
        onChange={handleChangeField(dispatch)}
      ></Input>
      <Input
        label={fieldProps.dateOfBirth.label}
        name={fieldProps.dateOfBirth.htmlName}
        type={fieldProps.dateOfBirth.type}
        placeholder={fieldProps.dateOfBirth.placeholder}
        value={formData.values.dateOfBirth}
        error={formData.errors.dateOfBirth}
        onChange={handleChangeField(dispatch)}
      ></Input>
      <Select
        label={fieldProps.gender.label}
        name={fieldProps.gender.htmlName}
        placeholder={fieldProps.gender.placeholder}
        options={fieldProps.gender.options}
        optionsDisplay={fieldProps.gender.optionsDisplay}
        value={formData.values.gender}
        error={formData.errors.gender}
        onChange={handleChangeField(dispatch)}
      ></Select>
      <div className={styles.Form_buttons}>
        <Button label={"Save"} buttonType={"dark"} onClick={handleSubmit}></Button>
        <Button
          label={"Cancel"}
          role={"button"}
          onClick={() => {
            history.push(routes.app.settings.profile.self);
          }}
        ></Button>
      </div>
    </form>
  );
};

export default UserProfileForm;
