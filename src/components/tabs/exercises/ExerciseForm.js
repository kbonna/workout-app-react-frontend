import React from "react";

import SimpleInput from "components/reusable/forms/SimpleInput";
import SimpleSelect from "components/reusable/forms/SimpleSelect";
import SimpleTextarea from "components/reusable/forms/SimpleTextarea";
import MultiInput from "components/reusable/forms/MultiInput";
import MultiSelect from "components/reusable/forms/MultiSelect";
import MultiInputListless from "components/reusable/forms/MultiInputListless";
import Button from "components/reusable/Button";

import styles from "./ExerciseForm.module.scss";

import {
  EXERCISE_TYPES,
  EXERCISE_TYPES_DISPLAY,
  MUSCLES,
  MUSCLES_DISPLAY,
} from "utilities/models";

const letters = "0123456789abcdefghijklmnopqrstuvwxyz";
const fieldProps = {
  name: {
    title: "Name",
    name: "name",
    placeholder: "exercise name",
  },
  kind: {
    title: "Type",
    name: "kind",
    placeholder: "exercise type",
  },
  tags: {
    title: "Tags",
    name: "tags",
    placeholder: "add tags (optional)",
  },
  instructions: {
    title: "Description",
    name: "instructions",
    placeholder: "add instructions (optional)",
  },
  muscles: {
    title: "Muscles",
    name: "muscles",
    placeholder: "add muscles (optional)",
  },
  tutorials: {
    title: "Tutorials",
    name: "tutorials",
    placeholder: "add tutorials (optional)",
  },
};

function ExerciseForm({ formData, setFormData, handleSubmit, handleCancel }) {
  const handleChange = (e) => {
    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: { ...prevState[e.target.name], value: e.target.value },
    }));
  };

  /**
   * Acts like setFormData function for simple type, but works on nested object.
   *
   * @param {string} prop - Name of the field. Must match state key.
   * @param {string|function} fn_or_value - Update function or updated value.
   */
  const setValue = (prop, fn_or_value) => {
    setFormData((prevState) => ({
      ...prevState,
      [prop]: {
        ...prevState[prop],
        value:
          typeof fn_or_value === "function"
            ? fn_or_value(prevState[prop].value)
            : fn_or_value,
      },
    }));
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <SimpleInput
            className={styles["input--name"]}
            title={fieldProps.name.title}
            name={fieldProps.name.name}
            type={"text"}
            placeholder={fieldProps.name.placeholder}
            value={formData.name.value}
            handleChange={handleChange}
            error={formData.name.error}
          ></SimpleInput>
          <SimpleSelect
            className={styles["input--kind"]}
            title={fieldProps.kind.title}
            name={fieldProps.kind.name}
            options={EXERCISE_TYPES}
            optionsDisplay={EXERCISE_TYPES_DISPLAY}
            value={formData.kind.value}
            placeholder={fieldProps.kind.placeholder}
            handleChange={handleChange}
            error={formData.kind.error}
          ></SimpleSelect>
          <MultiInputListless
            className={styles["input--tags"]}
            title={fieldProps.tags.title}
            name={fieldProps.tags.name}
            placeholder={fieldProps.tags.placeholder}
            value={formData.tags.value}
            setValue={(fn_or_value) => {
              setValue("tags", fn_or_value);
            }}
            error={formData.tags.error}
            allowedChars={letters}
          ></MultiInputListless>
          <SimpleTextarea
            className={styles["input--instructions"]}
            title={fieldProps.instructions.title}
            name={fieldProps.instructions.name}
            placeholder={fieldProps.instructions.placeholder}
            value={formData.instructions.value}
            handleChange={handleChange}
            rows={4}
            cols={50}
            error={formData.instructions.error}
          ></SimpleTextarea>
          <MultiSelect
            className={styles["input--muscles"]}
            title={fieldProps.muscles.title}
            name={fieldProps.muscles.name}
            placeholder={fieldProps.muscles.placeholder}
            value={formData.muscles.value}
            setValue={(fn_or_value) => {
              setValue("muscles", fn_or_value);
            }}
            options={MUSCLES}
            optionsDisplay={MUSCLES_DISPLAY}
            error={formData.muscles.error}
          ></MultiSelect>
          <MultiInput
            className={styles["input--tutorials"]}
            title={fieldProps.tutorials.title}
            name={fieldProps.tutorials.name}
            placeholder={fieldProps.tutorials.placeholder}
            value={formData.tutorials.value}
            setValue={(fn_or_value) => {
              setValue("tutorials", fn_or_value);
            }}
            error={formData.tutorials.error}
          ></MultiInput>
        </fieldset>
        <div className={styles.buttons}>
          <Button
            type="submit"
            buttonType="dark"
            handleClick={handleSubmit}
            label="Submit"
          ></Button>
          <Button
            type="button"
            handleClick={handleCancel}
            label="Cancel"
          ></Button>
        </div>
      </form>
    </>
  );
}

export default ExerciseForm;
