import React, { useState } from "react";

import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import SelectWithList from "./SelectWithList";

import {
  EXERCISE_TYPES,
  EXERCISE_TYPES_DISPLAY,
  MUSCLES,
  MUSCLES_DISPLAY,
} from "utilities/models";

// console.log(EXERCISE_TYPES);

function ExerciseNewPage(props) {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseTags, setExerciseTags] = useState("");
  const [exerciseDesc, setExerciseDesc] = useState("");
  const [exerciseMuscles, setExerciseMuscles] = useState([]);
  // const [exerciseTutorials, setExerciseTutorials] = useState([]);

  const handleExerciseName = (e) => {
    setExerciseName(e.target.value);
  };

  const handleExerciseType = (e) => {
    setExerciseType(e.target.value);
  };

  const handleExerciseTags = (e) => {
    const tagString = e.target.value;

    let delimiter = " ";
    if (tagString.includes(",")) delimiter = ",";
    else if (tagString.includes(";")) delimiter = ";";

    setExerciseTags(tagString.split(delimiter).map((tag) => tag.trim()));
  };

  const handleExerciseDesc = (e) => {
    setExerciseDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting form...", e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Create new exercise</legend>
        <Input
          title={"Name"}
          name={"exercise_name"}
          type={"text"}
          placeholder={"Exercise name..."}
          value={exerciseName}
          handleChange={handleExerciseName}
        ></Input>
        <Select
          title={"Type"}
          name={"exercise_type"}
          options={EXERCISE_TYPES}
          optionsDisplay={EXERCISE_TYPES_DISPLAY}
          value={exerciseType}
          placeholder={"Exercise type..."}
          handleChange={handleExerciseType}
        ></Select>
        <Input
          title={"Tags"}
          name={"exercise_tags"}
          type={"text"}
          placeholder={"Exercise tags..."}
          value={exerciseTags}
          handleChange={handleExerciseTags}
        ></Input>
        <Textarea
          title={"Description"}
          name={"exercise_description"}
          placeholder={"Exercise description..."}
          value={exerciseDesc}
          handleChange={handleExerciseDesc}
          rows={4}
          cols={50}
        ></Textarea>
        <SelectWithList
          title={"Muscles"}
          name={"exercise_muscles"}
          placeholder={"Choose muscles"}
          values={exerciseMuscles}
          setValues={setExerciseMuscles}
          options={MUSCLES}
          optionsDisplay={MUSCLES_DISPLAY}
        ></SelectWithList>
      </fieldset>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default ExerciseNewPage;
