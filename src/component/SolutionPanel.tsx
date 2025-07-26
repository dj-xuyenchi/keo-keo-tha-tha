import React from "react";

import styles from "./solution.module.scss";
import clsx from "clsx";
export const SolutionPanel = ({
  selected,
}: {
  selected: any | null;
}) => {
  return (
    <div className={styles.solutionContainer}>
      {/* {selected.type === "Button" && (
        <div>
          Text:
          <input
            type="text"
            value={selected.props.text}
            onChange={(e) => onChange("text", e.target.value)}
          />
        </div>
      )} */}
    </div>
  );
};
