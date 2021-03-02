import Input from "components/form_elements/Input";
import Select from "components/form_elements/Select";
import Textarea from "components/form_elements/Textarea";
import Trash from "components/icons/Trash";
import Button from "components/reusable/Button";
import IconButton from "components/reusable/IconButton";
import React from "react";
import { FORM_ACTIONS } from "reducers/form";
import { zip } from "utilities/misc";
import { v4 } from "uuid";
import styles from "./RoutineForm.module.scss";

const RoutineForm = ({
  fieldProps,
  formData,
  dispatch,
  handleSubmit,
  handleCancel,
  availableExercises,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: FORM_ACTIONS.CHANGE_FIELD,
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleListChange = (e, index, modifier) => {
    e.preventDefault();
    dispatch({
      type: FORM_ACTIONS.CHANGE_LIST_FIELD,
      name: e.target.name,
      value: modifier(e.target.value),
      index: index,
    });
  };

  const handleAddExercise = (e) => {
    if (formData.values.exercises.length <= fieldProps.exercises._limit) {
      dispatch({
        type: FORM_ACTIONS.APPEND_TO_LIST,
        name: "exercises",
        object: { key: v4(), exercise: "", sets: 1, instructions: "" },
      });
    }
  };

  const handleRemoveExercise = (e, index) => {
    dispatch({
      type: FORM_ACTIONS.REMOVE_FROM_LIST,
      name: "exercises",
      index: index,
    });
  };

  return (
    <form className={styles.form}>
      <fieldset className={styles.fieldset}>
        <Input
          className={`${styles.field} ${styles.fieldName}`}
          label={fieldProps.name.label}
          name={fieldProps.name.htmlName}
          placeholder={fieldProps.name.placeholder}
          value={formData.values.name}
          error={formData.errors.name}
          onChange={handleChange}
        ></Input>
        <Select
          className={`${styles.field} ${styles.fieldKind}`}
          label={fieldProps.kind.label}
          name={fieldProps.kind.htmlName}
          options={fieldProps.kind.options}
          optionsDisplay={fieldProps.kind.optionsDisplay}
          placeholder={fieldProps.kind.placeholder}
          onChange={handleChange}
          value={formData.values.kind}
          error={formData.errors.kind}
        ></Select>
        <Textarea
          className={`${styles.field} ${styles.fieldInstructions}`}
          label={fieldProps.instructions.label}
          name={fieldProps.instructions.htmlName}
          placeholder={fieldProps.instructions.placeholder}
          onChange={handleChange}
          value={formData.values.instructions}
          error={formData.errors.instructions}
        />
        <div className={styles.fieldExercises}>
          {zip([formData.values.exercises, formData.errors.exercises]).map(
            ([exercise, exerciseError], index) => (
              <div className={styles.multiline} key={exercise.key}>
                <Select
                  className={`${styles.field} ${styles.fieldExercisesExercise}`}
                  label={fieldProps.exercises.exercise.label}
                  name={fieldProps.exercises.exercise.htmlName}
                  placeholder={fieldProps.exercises.exercise.placeholder}
                  value={exercise.exercise}
                  error={exerciseError.exercise}
                  options={availableExercises.map((ex) => ex.pk)}
                  optionsDisplay={availableExercises.map((ex) => ex.name)}
                  onChange={(e) => {
                    handleListChange(e, index, fieldProps.exercises.exercise.modifier);
                  }}
                />
                <Input
                  className={`${styles.field} ${styles.fieldExercisesSets}`}
                  label={fieldProps.exercises.sets.label}
                  name={fieldProps.exercises.sets.htmlName}
                  type={fieldProps.exercises.sets.type}
                  placeholder={fieldProps.exercises.sets.placeholder}
                  value={exercise.sets}
                  error={exerciseError.sets}
                  onChange={(e) => {
                    handleListChange(e, index, fieldProps.exercises.sets.modifier);
                  }}
                  min={fieldProps.exercises.sets.minValue}
                  max={fieldProps.exercises.sets.maxValue}
                ></Input>
                <Textarea
                  className={`${styles.field} ${styles.fieldExercisesInstructions}`}
                  label={fieldProps.exercises.instructions.label}
                  name={fieldProps.exercises.instructions.htmlName}
                  placeholder={fieldProps.exercises.instructions.placeholder}
                  value={exercise.instructions}
                  error={exerciseError.instructions}
                  onChange={(e) => {
                    handleListChange(e, index, fieldProps.exercises.instructions.modifier);
                  }}
                ></Textarea>
                <IconButton
                  className={styles.btnDelete}
                  onClick={(e) => handleRemoveExercise(e, index)}
                  aria-label={"delete"}
                  type={"button"}
                >
                  <Trash svgClassName={styles.trashSvg} pathClassName={styles.trashPath} />
                </IconButton>
              </div>
            )
          )}
          <Button
            className={styles.btnAdd}
            label="Add exercise"
            buttonSize="small"
            handleClick={handleAddExercise}
            type="button"
            disabled={formData.values.exercises.length >= fieldProps.exercises._limit}
          />
        </div>
      </fieldset>
      <div className={styles.formButtons}>
        <Button
          className={styles.formButtonsSubmit}
          type="submit"
          buttonType="dark"
          handleClick={handleSubmit}
          label="Submit"
        ></Button>
        <Button
          className={styles.formButtonsCancel}
          type="button"
          handleClick={handleCancel}
          label="Cancel"
        ></Button>
      </div>
    </form>
  );
};

export default RoutineForm;
