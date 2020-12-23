import React from "react";

import styles from "./ExerciseForm.module.scss";
import { FORM_ACTIONS } from "reducers/form";
import { v4 } from "uuid";
import { zip } from "utilities/misc";

import {
  EXERCISE_TYPES,
  EXERCISE_TYPES_DISPLAY,
  MUSCLES,
  MUSCLES_DISPLAY,
} from "utilities/models";

import Input from "components/forms/Input";
import Button from "components/reusable/Button";
import IconButton from "components/reusable/IconButton";
import Select from "components/forms/Select";
import Label from "components/forms/Label";
import Trash from "components/icons/Trash";
import Textarea from "components/forms/Textarea";

const fieldProps = {
  name: {
    label: "Name",
    htmlName: "name",
    placeholder: "exercise name",
  },
  kind: {
    label: "Type",
    htmlName: "kind",
    placeholder: "exercise type",
  },
  instructions: {
    label: "Instructions",
    htmlName: "instructions",
    placeholder: "exercise instructions",
  },
  tags: {
    name: {
      label: null,
      htmlName: "tags__name",
      placeholder: "enter tag",
    },
  },
  muscles: {
    name: {
      label: null,
      htmlName: "muscles__name",
      placeholder: "select muscle",
    },
  },
};

function ExerciseForm({ formData, dispatch, handleSubmit, handleCancel }) {
  console.log(formData);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: FORM_ACTIONS.CHANGE_FIELD,
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleListChange = (e, index) => {
    e.preventDefault();
    dispatch({
      type: FORM_ACTIONS.CHANGE_LIST_FIELD,
      name: e.target.name,
      value: e.target.value,
      index: index,
    });
  };

  const handleAddTag = (e) => {
    if (formData.values.tags.length <= 5) {
      dispatch({
        type: FORM_ACTIONS.APPEND_TO_LIST,
        name: "tags",
        object: { key: v4(), name: "" },
      });
    }
  };

  const handleRemoveTag = (e, index) => {
    dispatch({
      type: FORM_ACTIONS.REMOVE_FROM_LIST,
      name: "tags",
      index: index,
    });
  };

  const handleAddMuscle = (e) => {
    dispatch({
      type: FORM_ACTIONS.APPEND_TO_LIST,
      name: "muscles",
      object: { key: v4(), name: "" },
    });
  };

  const handleRemoveMuscle = (e, index) => {
    dispatch({
      type: FORM_ACTIONS.REMOVE_FROM_LIST,
      name: "muscles",
      index: index,
    });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <Input
            className={styles.field}
            label={fieldProps.name.label}
            name={fieldProps.name.htmlName}
            type={"text"}
            placeholder={fieldProps.name.placeholder}
            onChange={handleChange}
            value={formData.values.name}
            error={formData.errors.name}
          />
          <Select
            className={styles.field}
            label={fieldProps.kind.label}
            name={fieldProps.kind.htmlName}
            options={EXERCISE_TYPES}
            optionsDisplay={EXERCISE_TYPES_DISPLAY}
            placeholder={fieldProps.kind.placeholder}
            onChange={handleChange}
            value={formData.values.kind}
            error={formData.errors.kind}
          />
          <Textarea
            className={styles.field}
            label={fieldProps.instructions.label}
            name={fieldProps.instructions.htmlName}
            placeholder={fieldProps.instructions.placeholder}
            onChange={handleChange}
            value={formData.values.instructions}
            error={formData.errors.instructions}
          />

          {/* Tags dynamic inputs */}
          <Label label={"Tags"}></Label>
          {zip(formData.values.tags, formData.errors.tags).map(
            ([tag, tagError], index) => (
              <div key={tag.key} className={styles.multiline}>
                <Input
                  className={styles.field}
                  name={fieldProps.tags.name.htmlName}
                  placeholder={fieldProps.tags.name.placeholder}
                  type={"text"}
                  onChange={(e) => handleListChange(e, index)}
                  value={tag.name}
                  error={tagError.name}
                />
                <IconButton
                  handleClick={(e) => handleRemoveTag(e, index)}
                  aria-label={"delete"}
                  className={styles["delete-btn"]}
                >
                  <Trash size={22} />
                </IconButton>
              </div>
            )
          )}
          <Button
            label="Add tag"
            buttonSize="small"
            handleClick={handleAddTag}
            type="button"
            disabled={formData.values.tags.length >= 5}
          />

          {/* Muscles dynamic select */}
          <Label label={"Muscles"}></Label>
          {zip(formData.values.muscles, formData.errors.muscles).map(
            ([muscle, muscleError], index) => (
              <div key={muscle.key} className={styles.multiline}>
                <Select
                  className={styles.field}
                  name={fieldProps.muscles.name.htmlName}
                  options={MUSCLES}
                  optionsDisplay={MUSCLES_DISPLAY}
                  placeholder={fieldProps.muscles.name.placeholder}
                  onChange={(e) => handleListChange(e, index)}
                  value={muscle.name}
                  error={muscleError.name}
                />
                <IconButton
                  handleClick={(e) => handleRemoveMuscle(e, index)}
                  aria-label={"delete"}
                  className={styles["delete-btn"]}
                >
                  <Trash size={22} />
                </IconButton>
              </div>
            )
          )}
          <Button
            label="Add muscle"
            buttonSize="small"
            handleClick={handleAddMuscle}
            type="button"
          />
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
