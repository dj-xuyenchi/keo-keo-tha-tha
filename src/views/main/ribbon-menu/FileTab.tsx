import { Tooltip } from "antd";
import styles from "./ribbon.module.scss";
import clsx from "clsx";
import { SelectCustom } from "@/component/componentCustom/SelectCustom";
import { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { SearchOutlined } from "@ant-design/icons";
import { InputCustom } from "@/component/componentCustom/InputCustom";
import { saveData2File } from "./service";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FileInfo } from "@/entity/fileHandler/FileInfo";
import { getMessageInstance } from "@/config/messageContext";
import { DataWork } from "../canvas/canvasSlice";
import Image from "next/image";

import pasteIcon from "../../../../public/options/ribbon/paste.png";
import cutIcon from "../../../../public/options/ribbon/cut.png";
import copyIcon from "../../../../public/options/ribbon/copy.png";
import cleanIcon from "../../../../public/options/ribbon/clean.png";
import flowIcon from "../../../../public/options/ribbon/flow.png";
import docIcon from "../../../../public/options/ribbon/doc.png";
import noteIcon from "../../../../public/options/ribbon/note.png";
import undoIcon from "../../../../public/options/ribbon/undo.png";
import saveIcon from "../../../../public/options/ribbon/save.png";
import cmtIcon from "../../../../public/options/ribbon/cmt.png";
import unCmtIcon from "../../../../public/options/ribbon/un-cmt.png";
import runIcon from "../../../../public/options/ribbon/run.png";
import debugIcon from "../../../../public/options/ribbon/debug.png";
import borderIcon from "../../../../public/options/ribbon/border.png";
import behaviorIcon from "../../../../public/options/ribbon/behavior.png";
import { getSessionCacheValueByKey } from "../solution/service";
import { IS_SHOW_BORDER } from "@/config/folder-data/sessionCachingKey";
import { SessionCaching } from "@/entity/fileHandler/SessionCaching";
import { SESSION_CACHING_JSON } from "@/config/folder-data/fileType";
import { setSessionCaching } from "@/app/globalSlice";
import { useDispatch } from "react-redux";
export const FileTab = () => {
  const [mode, setMode] = useState("run");
  const fullSize = 56;
  const miniSize = 20;
  const canvas = useSelector((state: RootState) => state.canvas);
  const global = useSelector((state: RootState) => state.global);

  const dispatch = useDispatch();
  const sessionCaching = useSelector(
    (state: RootState) => state.global.sessionCaching
  );
  const isShowBorder =
    getSessionCacheValueByKey(sessionCaching, IS_SHOW_BORDER) === "true";
  const messageApi = getMessageInstance();
  const handlePaste = () => {};
  const handleSetMode = (value: string) => {
    setMode(value);
  };
  const handleSaveData2File = () => {
    const saveList = cloneDeep(canvas.dataWorkList) as DataWork[];
    const file = global.fileList.find((item: FileInfo) => {
      return item.key === canvas.fileData.key;
    });
    const thisFile = {
      key: file?.key as string,
      data: canvas.dataWork,
    };
    const check = saveList.find((item) => {
      return item.key === thisFile.key;
    });
    if (check) {
      check.data = thisFile.data;
    } else {
      saveList.push(thisFile);
    }
    for (const work of saveList) {
      try {
        const file = global.fileList.find((item) => {
          return item.key == work.key;
        });
        if (file) {
          saveData2File(
            file.folderName + "/" + file.name,
            JSON.stringify(work.data),
            "Lưu dữ liệu thành công!"
          );
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  const handleTurnShowBorder = () => {
    const cacheList = cloneDeep(sessionCaching) as SessionCaching[];
    const show = cacheList.find((item) => {
      return item.key == IS_SHOW_BORDER;
    });
    if (show) {
      show.value = !isShowBorder ? "true" : "false";
      saveData2File(
        SESSION_CACHING_JSON,
        JSON.stringify(cacheList),
        !isShowBorder ? "Bật hiển thị phạm vi" : "Tắt hiển thị phạm vi"
      );
      dispatch(setSessionCaching(cacheList));
    }
  };
  return (
    <div className={styles.menuList}>
      <div
        onClick={handlePaste}
        className={clsx(
          styles.fullSizeIcon,
          styles.feature,
          !canvas.copyData && styles.disabled
        )}
      >
        <Image src={pasteIcon} width={fullSize} height={fullSize} alt="icon" />
        <span>Dán</span>
      </div>
      <div
        className={clsx(styles.comboMiniIcon, styles.borderRight)}
        style={{
          marginLeft: "4px",
        }}
      >
        <div
          className={clsx(styles.miniSizeIcon, styles.feature, styles.disabled)}
        >
          <Image
            src={cutIcon}
            width={miniSize}
            height={miniSize}
            alt="icon"
            style={{
              rotate: "-90deg",
            }}
          />
          <span>Cut</span>
        </div>
        <div className={clsx(styles.miniSizeIcon, styles.feature)}>
          <Image src={copyIcon} height={miniSize} width={miniSize} alt="icon" />
          <span>Sao chép</span>
        </div>
        <div className={clsx(styles.miniSizeIcon, styles.feature)}>
          <Image
            src={cleanIcon}
            width={miniSize}
            height={miniSize}
            alt="icon"
          />
          <span>Format code</span>
        </div>
      </div>
      <div
        style={{
          marginLeft: "4px",
        }}
        onClick={handlePaste}
        className={clsx(styles.fullSizeIcon, styles.feature)}
      >
        <Image src={flowIcon} width={fullSize} height={fullSize} alt="icon" />
        <span>Luồng</span>
      </div>
      <div
        className={clsx(styles.comboMiniIcon, styles.borderRight)}
        style={{
          marginLeft: "4px",
        }}
      >
        <div className={clsx(styles.miniSizeIcon, styles.feature)}>
          <Image src={docIcon} width={miniSize} height={miniSize} alt="icon" />
          <span>Tài liệu</span>
        </div>
        <div className={clsx(styles.miniSizeIcon, styles.feature)}>
          <Image src={noteIcon} width={miniSize} height={miniSize} alt="icon" />
          <span>Ghi chú</span>
        </div>
      </div>
      <div
        className={clsx(styles.comboMiniIconCol, styles.borderRight)}
        style={{
          marginLeft: "6px",
        }}
      >
        <div
          className={clsx(styles.comboMiniIconRow)}
          style={{
            marginBottom: "4px",
          }}
        >
          <Tooltip title={"Hoàn tác"}>
            <div className={clsx(styles.miniSizeIcon, styles.feature)}>
              <Image
                src={undoIcon}
                width={miniSize}
                height={miniSize}
                alt="icon"
              />
            </div>
          </Tooltip>
          <Tooltip title={"Làm lại"}>
            <div className={clsx(styles.miniSizeIcon, styles.feature)}>
              <Image
                src={undoIcon}
                width={miniSize}
                height={miniSize}
                alt="icon"
                style={{
                  transform: "scaleX(-1)",
                }}
              />
            </div>
          </Tooltip>
          <Tooltip title={"Lưu thay đổi"}>
            <div
              className={clsx(styles.miniSizeIcon, styles.feature)}
              onClick={handleSaveData2File}
            >
              <Image
                src={saveIcon}
                width={miniSize}
                height={miniSize}
                alt="icon"
              />
            </div>
          </Tooltip>
        </div>
        <div className={styles.runDebug}>
          <SelectCustom
            defaultValue="run"
            style={{ width: 220 }}
            onChange={handleSetMode}
            options={[
              { value: "run", label: "Run kéo kéo thả thả :3" },
              {
                value: "debug",
                label: "Debug kéo kéo thả thả :3",
                disabled: true,
              },
            ]}
          />
          <Tooltip title={mode === "run" ? "Run" : "Debug"}>
            <div
              className={clsx(styles.miniSizeIcon, styles.feature)}
              style={{
                height: "30px",
                marginLeft: "4px",
              }}
            >
              <Image
                src={mode === "run" ? runIcon : debugIcon}
                width={30}
                height={30}
                alt="icon"
              />
            </div>
          </Tooltip>
        </div>
      </div>

      <div
        className={clsx(styles.comboMiniIconCol)}
        style={{
          marginLeft: "6px",
        }}
      >
        <div
          className={clsx(styles.comboMiniIconRow)}
          style={{
            marginBottom: "4px",
          }}
        >
          <Tooltip title={"Comment code"}>
            <div className={clsx(styles.miniSizeIcon, styles.feature)}>
              <Image
                src={cmtIcon}
                width={miniSize}
                height={miniSize}
                alt="icon"
              />
            </div>
          </Tooltip>
          <Tooltip title={"Bỏ comment"}>
            <div className={clsx(styles.miniSizeIcon, styles.feature)}>
              <Image
                src={unCmtIcon}
                width={miniSize}
                height={miniSize}
                alt="icon"
              />
            </div>
          </Tooltip>
          <Tooltip title={`${isShowBorder ? "Tắt" : "Bật"} hiển thị phạm vi`}>
            <div
              onClick={handleTurnShowBorder}
              className={clsx(
                styles.miniSizeIcon,
                styles.feature,
                isShowBorder && styles.iconBtnOn
              )}
            >
              <Image
                src={borderIcon}
                width={miniSize}
                height={miniSize}
                alt="icon"
              />
            </div>
          </Tooltip>
          <Tooltip title={`Hành vi mặc định của component`}>
            <div
              onClick={handleTurnShowBorder}
              className={clsx(
                styles.miniSizeIcon,
                styles.feature,
                isShowBorder && styles.iconBtnOn
              )}
            >
              <Image
                src={behaviorIcon}
                width={miniSize}
                height={miniSize}
                alt="icon"
              />
            </div>
          </Tooltip>
        </div>
        <InputCustom placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
      </div>
    </div>
  );
};
