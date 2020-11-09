import React from "react";
import PropTypes from "prop-types";

function ExerciseNewPage(props) {
  return (
    <form>
      <fieldset>
        <legend>Create new exercise</legend>
        <label for="exerciseName">Exercise name</label>
        <br></br>
        <input type="text" id="exerciseName"></input>
      </fieldset>
    </form>
  );
}

ExerciseNewPage.propTypes = {};

export default ExerciseNewPage;
