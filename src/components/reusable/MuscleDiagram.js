import React from "react";
import Muscles from "components/icons/Muscles";
import styles from "./MuscleDiagram.module.scss";

import { MUSCLES } from "utilities/models";
import { classNames } from "utilities/misc";

/**
 * @param {Object} muscles – Should be an object where key is muscle abbreviation and value is
 * either 1, 2 or 3. Higher value will result in darker gray muscle on a diagram.
 */
const MuscleDiagram = ({ svgClassName, muscles = {} }) => {
  const svgClasses = classNames({
    [styles.svg]: true,
    [svgClassName]: Boolean(svgClassName),
  });

  const musclesClasses = Object.fromEntries(
    MUSCLES.map((muscle) => [
      `${muscle}ClassName`,
      muscles[muscle] ? styles[`l${muscles[muscle]}`] : "",
    ])
  );

  return <Muscles svgClassName={svgClasses} {...musclesClasses}></Muscles>;
};

export default MuscleDiagram;
