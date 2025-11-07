import { ribbonMenu } from "@/config/ribbonMenu";
import { Tabs } from "antd";
import clsx from "clsx";
import styles from './ribbon.module.scss'

export const RibbonMenu = () => {
  const onChange = () => { }

  return (

    <div className={clsx(styles.ribbonMenuContainer, 'ribbon-menu')}>
      <Tabs
        onChange={onChange}
        type="card"
        items={ribbonMenu.map((_, i) => {
          const id = String(i + 1);
          return {
            label: _.title,
            key: id,
          };
        })}
      />
      <div className={styles.menuList}>
        
      </div>
    </div>
  );
};
