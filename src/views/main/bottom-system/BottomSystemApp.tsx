import clsx from "clsx";
import styles from "./bottomSystemApp.module.scss";
import { Col, Row } from "antd";
import Image from "next/image";
import gitIcon from '../../../../public/options/bottom-system/git.png'
import runningIcon from '../../../../public/options/bottom-system/running.png'
import buildIcon from '../../../../public/options/bottom-system/build.png'
import reloadIcon from '../../../../public/options/bottom-system/reload.png'

import borderIcon from "../../../../public/options/ribbon/border.png";
import behaviorIcon from "../../../../public/options/ribbon/behavior.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getSessionCacheValueByKey } from "../solution/service";
import { IS_ALLOW_DEFAULT_BEHAVIOR, IS_SHOW_BORDER } from "@/config/folder-data/sessionCachingKey";
export const BottomSystemApp = () => {
  const sessionCaching = useSelector(
    (state: RootState) => state.global.sessionCaching
  );
  const isShowBorder =
    getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === "true";
  const isAllowDefaultBehavior =
    getSessionCacheValueByKey(sessionCaching, IS_ALLOW_DEFAULT_BEHAVIOR) === "true";
  return <div className={clsx(styles.bottomSystemContainer)}>
    <Row style={{
      width: "100%"
    }}>
      <Col span={10} style={{
        display: "flex",
        alignItems: "center"
      }}>
        <Image style={{
          marginRight: "8px"
        }} height={20} width={20} src={gitIcon} alt="git" />
        master
        <div className={styles.system} style={{
          marginLeft: "4px"
        }}>
          <Image height={20} width={20} src={reloadIcon} alt="git" />
        </div>
      </Col>

      <Col style={{
        display: "flex",
        justifyContent: "flex-end"
      }} span={14}>
        <div className={styles.system}
        >
          <Image style={{
            marginRight: "6px"
          }} height={20} width={20} src={buildIcon} alt="git" />
          Đang build
        </div>
        <div className={styles.system}
        >
          <Image style={{
            marginRight: "6px"
          }} height={20} width={20} src={runningIcon} alt="git" />
          http://localhost:3000
        </div>
        {isShowBorder && <div className={styles.system}
        >
          <Image style={{
            marginRight: "6px"
          }} height={20} width={20} src={borderIcon} alt="git" />
          Đường viền đối tượng
        </div>}
        {isAllowDefaultBehavior &&
          <div className={styles.system}
          >
            <Image style={{
              marginRight: "6px"
            }} height={20} width={20} src={behaviorIcon} alt="git" />
            Hành vi mặc định
          </div>
        }
      </Col>
    </Row>
  </div>;
};
