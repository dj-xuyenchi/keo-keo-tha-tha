import clsx from "clsx";
import { PropertyTab } from "./property/PropertyTab";
import styles from "./sidebar.module.scss";
import { PROPERTY, SettingOption } from "@/config/sidebar/propertyOption";

export const NodePropsSetting = ({ option }: { option: SettingOption }) => {
  return (
    <div className={clsx(styles.optionContainer,'node-setting')}>
      {option.type === PROPERTY && <PropertyTab />}
    </div>
  );
};
