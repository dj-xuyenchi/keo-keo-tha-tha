import React from "react";

import styles from "./solution.module.scss";
import clsx from "clsx";
export const SolutionPanel = ({
  selected,
  onChange,
}: {
  selected: any | null;
  onChange: (field: string, value: any) => void;
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
