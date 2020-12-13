import React from "react";

import SimpleInput from "components/reusable/forms/SimpleInput";
import SimpleSelect from "components/reusable/forms/SimpleSelect";
import SimpleTextarea from "components/reusable/forms/SimpleTextarea";
import MultiInput from "components/reusable/forms/MultiInput";
import MultiSelect from "components/reusable/forms/MultiSelect";
import Button from "components/reusable/Button";

import styles from "./ExerciseForm.module.scss";
import { ACTIONS } from "components/tabs/exercises/ExerciseCreateUpdate";

import {
  EXERCISE_TYPES,
  EXERCISE_TYPES_DISPLAY,
  MUSCLES,
  MUSCLES_DISPLAY,
} from "utilities/models";

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
    jsonKey: "name",
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
    jsonKey: "name",
  },
  tutorials: {
    title: "Tutorials",
    name: "tutorials",
    placeholder: "add tutorials (optional)",
    jsonKey: "url",
  },
};

function ExerciseForm({ formData, dispatch, handleSubmit, handleCancel }) {
  // REMOVE???
  const handleChange = (e) => {
    e.persist();
    dispatch({
      type: ACTIONS.SET_FIELD,
      field: e.target.name,
      value: e.target.value,
    });
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
            value={formData.values.name}
            handleChange={handleChange}
            error={formData.errors.name}
          ></SimpleInput>
          <SimpleSelect
            className={styles["input--kind"]}
            title={fieldProps.kind.title}
            name={fieldProps.kind.name}
            options={EXERCISE_TYPES}
            optionsDisplay={EXERCISE_TYPES_DISPLAY}
            value={formData.values.kind}
            placeholder={fieldProps.kind.placeholder}
            handleChange={handleChange}
            error={formData.errors.kind}
          ></SimpleSelect>
          <MultiInput
            className={styles["input--tags"]}
            title={fieldProps.tags.title}
            name={fieldProps.tags.name}
            placeholder={fieldProps.tags.placeholder}
            value={formData.values.tags.map((tag) => tag.name)}
            error={formData.errors.tags.map((tag) => tag.name)}
            dispatch={dispatch}
            jsonKey={fieldProps.tags.jsonKey}
          ></MultiInput>
          <SimpleTextarea
            className={styles["input--instructions"]}
            title={fieldProps.instructions.title}
            name={fieldProps.instructions.name}
            placeholder={fieldProps.instructions.placeholder}
            value={formData.values.instructions}
            error={formData.errors.instructions}
            handleChange={handleChange}
            rows={4}
            cols={50}
          ></SimpleTextarea>
          <MultiSelect
            className={styles["input--muscles"]}
            title={fieldProps.muscles.title}
            name={fieldProps.muscles.name}
            placeholder={fieldProps.muscles.placeholder}
            value={formData.values.muscles.map((muscle) => muscle.name)}
            error={formData.errors.muscles.map((muscle) => muscle.name)}
            options={MUSCLES}
            optionsDisplay={MUSCLES_DISPLAY}
            dispatch={dispatch}
            jsonKey={fieldProps.muscles.jsonKey}
          ></MultiSelect>
          <MultiInput
            className={styles["input--tutorials"]}
            title={fieldProps.tutorials.title}
            name={fieldProps.tutorials.name}
            placeholder={fieldProps.tutorials.placeholder}
            value={formData.values.tutorials.map((tutorial) => tutorial.url)}
            error={formData.errors.tutorials.map((tutorial) => tutorial.url)}
            dispatch={dispatch}
            jsonKey={fieldProps.tutorials.jsonKey}
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
