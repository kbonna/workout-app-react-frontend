import React from "react";

import styles from "./ExerciseForm.module.scss";
import { FORM_ACTIONS } from "reducers/form";
import { v4 } from "uuid";
import { zip } from "utilities/misc";

import Input from "components/form_elements/Input";
import Button from "components/reusable/Button";
import IconButton from "components/reusable/IconButton";
import Select from "components/form_elements/Select";
import Label from "components/form_elements/Label";
import Trash from "components/icons/Trash";
import Textarea from "components/form_elements/Textarea";

function ExerciseForm({
  fieldProps,
  formData,
  dispatch,
  handleSubmit,
  handleCancel,
}) {
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
    if (formData.values.tags.length <= fieldProps.tags._limit) {
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
    if (formData.values.muscles.length <= fieldProps.muscles._limit) {
      dispatch({
        type: FORM_ACTIONS.APPEND_TO_LIST,
        name: "muscles",
        object: { key: v4(), name: "" },
      });
    }
  };

  const handleRemoveMuscle = (e, index) => {
    dispatch({
      type: FORM_ACTIONS.REMOVE_FROM_LIST,
      name: "muscles",
      index: index,
    });
  };

  const handleAddTutorial = (e) => {
    if (formData.values.tutorials.length <= fieldProps.tutorials._limit) {
      dispatch({
        type: FORM_ACTIONS.APPEND_TO_LIST,
        name: "tutorials",
        object: { key: v4(), url: "" },
      });
    }
  };

  const handleRemoveTutorial = (e, index) => {
    dispatch({
      type: FORM_ACTIONS.REMOVE_FROM_LIST,
      name: "tutorials",
      index: index,
    });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <Input
            className={`${styles.field} ${styles["field--name"]}`}
            label={fieldProps.name.label}
            name={fieldProps.name.htmlName}
            type={"text"}
            placeholder={fieldProps.name.placeholder}
            onChange={handleChange}
            value={formData.values.name}
            error={formData.errors.name}
          />
          <Select
            className={`${styles.field} ${styles["field--kind"]}`}
            label={fieldProps.kind.label}
            name={fieldProps.kind.htmlName}
            options={fieldProps.kind.options}
            optionsDisplay={fieldProps.kind.optionsDisplay}
            placeholder={fieldProps.kind.placeholder}
            onChange={handleChange}
            value={formData.values.kind}
            error={formData.errors.kind}
          />
          <Textarea
            className={`${styles.field} ${styles["field--instructions"]}`}
            label={fieldProps.instructions.label}
            name={fieldProps.instructions.htmlName}
            placeholder={fieldProps.instructions.placeholder}
            onChange={handleChange}
            value={formData.values.instructions}
            error={formData.errors.instructions}
          />

          <div className={styles.tags}>
            <Label label={"Tags"}></Label>
            {zip(formData.values.tags, formData.errors.tags).map(
              ([tag, tagError], index) => (
                <div key={tag.key} className={styles.multiline}>
                  <Input
                    className={`${styles.field} ${styles["field--tag"]}`}
                    name={fieldProps.tags.name.htmlName}
                    placeholder={fieldProps.tags.name.placeholder}
                    type={"text"}
                    onChange={(e) => handleListChange(e, index)}
                    value={tag.name}
                    error={tagError.name}
                  />
                  <IconButton
                    onClick={(e) => handleRemoveTag(e, index)}
                    aria-label={"delete"}
                    className={styles.btnDelete}
                  >
                    <Trash
                      svgClassName={styles.trashSvg}
                      pathClassName={styles.trashPath}
                    />
                  </IconButton>
                </div>
              )
            )}
            <Button
              className={styles["btn--add"]}
              label="Add tag"
              buttonSize="small"
              handleClick={handleAddTag}
              type="button"
              disabled={formData.values.tags.length >= fieldProps.tags._limit}
            />
          </div>

          <div className={styles.muscles}>
            <Label label={"Muscles"}></Label>
            {zip(formData.values.muscles, formData.errors.muscles).map(
              ([muscle, muscleError], index) => (
                <div key={muscle.key} className={styles.multiline}>
                  <Select
                    className={`${styles.field} ${styles["field--muscle"]}`}
                    name={fieldProps.muscles.name.htmlName}
                    options={fieldProps.muscles.name.options}
                    optionsDisplay={fieldProps.muscles.name.optionsDisplay}
                    placeholder={fieldProps.muscles.name.placeholder}
                    onChange={(e) => handleListChange(e, index)}
                    value={muscle.name}
                    error={muscleError.name}
                  />
                  <IconButton
                    onClick={(e) => handleRemoveMuscle(e, index)}
                    aria-label={"delete"}
                    className={styles.btnDelete}
                  >
                    <Trash
                      svgClassName={styles.trashSvg}
                      pathClassName={styles.trashPath}
                    />
                  </IconButton>
                </div>
              )
            )}
            <Button
              className={styles["btn--add"]}
              label="Add muscle"
              buttonSize="small"
              handleClick={handleAddMuscle}
              type="button"
              disabled={
                formData.values.muscles.length >= fieldProps.muscles._limit
              }
            />
          </div>

          <div className={styles.tutorials}>
            <Label label={"Tutorials"}></Label>
            {zip(formData.values.tutorials, formData.errors.tutorials).map(
              ([tutorial, tutorialError], index) => (
                <div key={tutorial.key} className={styles.multiline}>
                  <Input
                    className={`${styles.field} ${styles["field--tutorial"]}`}
                    name={fieldProps.tutorials.url.htmlName}
                    placeholder={fieldProps.tutorials.url.placeholder}
                    type={"text"}
                    onChange={(e) => handleListChange(e, index)}
                    value={tutorial.url}
                    error={tutorialError.url}
                  />
                  <IconButton
                    onClick={(e) => handleRemoveTutorial(e, index)}
                    aria-label={"delete"}
                    className={styles.btnDelete}
                  >
                    <Trash
                      svgClassName={styles.trashSvg}
                      pathClassName={styles.trashPath}
                    />
                  </IconButton>
                </div>
              )
            )}
            <Button
              className={styles["btn--add"]}
              label="Add tutorial"
              buttonSize="small"
              handleClick={handleAddTutorial}
              type="button"
              disabled={
                formData.values.tutorials.length >= fieldProps.tutorials._limit
              }
            />
          </div>
        </fieldset>
        <div className={styles["form__buttons"]}>
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
