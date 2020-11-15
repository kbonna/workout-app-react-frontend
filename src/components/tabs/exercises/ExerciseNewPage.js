import React, { useState } from "react";

import Input from "./Input";
import Textarea from "./Textarea";
import MultiSelect from "./MultiSelect";
import MultiInput from "./MultiInput";
import Select from "./Select";
import { createExercise } from "services/Exercises";

import {
  EXERCISE_TYPES,
  EXERCISE_TYPES_DISPLAY,
  MUSCLES,
  MUSCLES_DISPLAY,
} from "utilities/models";

const letters = "0123456789abcdefghijklmnopqrstuvwxyz ";

const fieldProps = {
  exerciseName: {
    title: "Name",
    name: "exercise_name",
    placeholder: "exercise name",
  },
  exerciseType: {
    title: "Type",
    name: "exercise_type",
    placeholder: "exercise type",
  },
  exerciseTags: {
    title: "Tags",
    name: "exercise_name",
    placeholder: "add tags (optional)",
  },
  exerciseDesc: {
    title: "Description",
    name: "exercise_desc",
    placeholder: "add instructions (optional)",
  },
  exerciseMuscles: {
    title: "Muscles",
    name: "exercise_muscles",
    placeholder: "add muscles (optional)",
  },
  exerciseTutorials: {
    title: "Tutorials",
    name: "exercise_tutorials",
    placeholder: "add tutorials (optional)",
  },
};

const initialStateString = { value: "", error: "" };
const initialStateArray = { value: [], error: "" };

function ExerciseNewPage(props) {
  const [exerciseName, setExerciseName] = useState({
    value: "Exercise",
    error: "",
  });
  const [exerciseType, setExerciseType] = useState({ value: "rew", error: "" });
  const [exerciseTags, setExerciseTags] = useState({
    value: "tag1 tag2 tag3 ",
    error: "",
  });
  const [exerciseDesc, setExerciseDesc] = useState({
    value: "Lorem ipsummmm",
    error: "",
  });
  const [exerciseMuscles, setExerciseMuscles] = useState({
    value: ["cal", "pec"],
    error: "",
  });
  const [exerciseTutorials, setExerciseTutorials] = useState({
    value: ["www.tutorial1.pl", "www.tutorial2.com"],
    error: "",
  });

  const handleExerciseName = (e) => {
    e.persist();
    setExerciseName((prevState) => ({ ...prevState, value: e.target.value }));
  };

  const handleExerciseType = (e) => {
    e.persist();
    setExerciseType((prevState) => ({ ...prevState, value: e.target.value }));
  };

  const handleExerciseTags = (e) => {
    e.persist();
    setExerciseTags((prevState) => ({
      ...prevState,
      value: e.target.value
        .split("")
        .filter((ch) => letters.includes(ch.toLowerCase()))
        .join("")
        .replace(/\s+/g, " "),
    }));
  };

  const handleExerciseDesc = (e) => {
    e.persist();
    setExerciseDesc((prevState) => ({ ...prevState, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exerciseTagsArray = exerciseTags.value
      .split(" ")
      .filter((tag) => tag.length !== 0);

    const data = {
      name: exerciseName.value,
      kind: exerciseType.value,
      instructions: exerciseDesc.value,
      tags: exerciseTagsArray.map((name) => ({ name })),
      tutorials: exerciseTutorials.value.map((url) => ({ url })),
      muscles: exerciseMuscles.value.map((name) => ({ name })),
    };
    createExercise(data).then((json) => console.log(json));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Create new exercise</legend>
        <Input
          title={fieldProps.exerciseName.title}
          name={fieldProps.exerciseName.name}
          type={"text"}
          placeholder={fieldProps.exerciseName.placeholder}
          value={exerciseName.value}
          handleChange={handleExerciseName}
          error={exerciseName.error}
        ></Input>
        <Select
          title={fieldProps.exerciseType.title}
          name={fieldProps.exerciseType.name}
          options={EXERCISE_TYPES}
          optionsDisplay={EXERCISE_TYPES_DISPLAY}
          value={exerciseType.value}
          placeholder={fieldProps.exerciseType.placeholder}
          handleChange={handleExerciseType}
          error={exerciseType.error}
        ></Select>
        <Input
          title={fieldProps.exerciseTags.title}
          name={fieldProps.exerciseTags.name}
          type={"text"}
          placeholder={fieldProps.exerciseTags.placeholder}
          value={exerciseTags.value}
          handleChange={handleExerciseTags}
          error={exerciseTags.error}
        ></Input>
        <Textarea
          title={fieldProps.exerciseDesc.title}
          name={fieldProps.exerciseDesc.name}
          placeholder={fieldProps.exerciseDesc.placeholder}
          value={exerciseDesc.value}
          handleChange={handleExerciseDesc}
          rows={4}
          cols={50}
          error={exerciseDesc.error}
        ></Textarea>
        <MultiSelect
          title={fieldProps.exerciseMuscles.title}
          name={fieldProps.exerciseMuscles.name}
          placeholder={fieldProps.exerciseMuscles.placeholder}
          values={exerciseMuscles.value}
          setValues={(fn) => {
            setExerciseMuscles((prevState) => ({
              ...prevState,
              value: fn(prevState.value),
            }));
          }}
          options={MUSCLES}
          optionsDisplay={MUSCLES_DISPLAY}
        ></MultiSelect>
        <MultiInput
          title={fieldProps.exerciseTutorials.title}
          name={fieldProps.exerciseTutorials.name}
          placeholder={fieldProps.exerciseTutorials.placeholder}
          values={exerciseTutorials.value}
          setValues={(fn) => {
            setExerciseTutorials((prevState) => ({
              ...prevState,
              value: fn(prevState.value),
            }));
          }}
        ></MultiInput>
      </fieldset>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default ExerciseNewPage;
