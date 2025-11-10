import { Image, Tooltip } from "antd";
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
export const FileTab = () => {
  const [mode, setMode] = useState("run");
  const fullSize = 56;
  const miniSize = 20;
  const canvas = useSelector((state: RootState) => state.canvas);
  const global = useSelector((state: RootState) => state.global);

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
            JSON.stringify(work.data)
          );
        }
      } catch (e) {
        console.error(e);
      }
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
        <Image
          src={`/options/ribbon/paste.png`}
          width={fullSize}
          height={fullSize}
          alt="icon"
          preview={false}
        />
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
            src={`/options/ribbon/cut.png`}
            width={miniSize}
            height={miniSize}
            alt="icon"
            preview={false}
            style={{
              rotate: "-90deg",
            }}
          />
          <span>Cut</span>
        </div>
        <div className={clsx(styles.miniSizeIcon, styles.feature)}>
          <Image
            src={`/options/ribbon/copy.png`}
            width={miniSize}
            alt="icon"
            preview={false}
          />
          <span>Sao chép</span>
        </div>
        <div className={clsx(styles.miniSizeIcon, styles.feature)}>
          <Image
            src={`/options/ribbon/clean.png`}
            width={miniSize}
            height={miniSize}
            alt="icon"
            preview={false}
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
        <Image
          src={`/options/ribbon/flow.png`}
          width={fullSize}
          height={fullSize}
          alt="icon"
          preview={false}
        />
        <span>Luồng</span>
      </div>
      <div
        className={clsx(styles.comboMiniIcon, styles.borderRight)}
        style={{
          marginLeft: "4px",
        }}
      >
        <div className={clsx(styles.miniSizeIcon, styles.feature)}>
          <Image
            src={`/options/ribbon/doc.png`}
            width={miniSize}
            height={miniSize}
            alt="icon"
            preview={false}
          />
          <span>Tài liệu</span>
        </div>
        <div className={clsx(styles.miniSizeIcon, styles.feature)}>
          <Image
            src={`/options/ribbon/note.png`}
            width={miniSize}
            height={miniSize}
            alt="icon"
            preview={false}
          />
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
                src={`/options/ribbon/undo.png`}
                width={miniSize}
                height={miniSize}
                alt="icon"
                preview={false}
              />
            </div>
          </Tooltip>
          <Tooltip title={"Làm lại"}>
            <div className={clsx(styles.miniSizeIcon, styles.feature)}>
              <Image
                src={`/options/ribbon/undo.png`}
                width={miniSize}
                alt="icon"
                preview={false}
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
                src={`/options/ribbon/save.png`}
                width={miniSize}
                height={miniSize}
                alt="icon"
                preview={false}
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
                src={`/options/ribbon/${mode === "run" ? "run" : "debug"}.png`}
                width={30}
                height={30}
                alt="icon"
                preview={false}
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
                src={`/options/ribbon/cmt.png`}
                width={miniSize}
                height={miniSize}
                alt="icon"
                preview={false}
              />
            </div>
          </Tooltip>
          <Tooltip title={"Bỏ comment"}>
            <div className={clsx(styles.miniSizeIcon, styles.feature)}>
              <Image
                src={`/options/ribbon/un-cmt.png`}
                width={miniSize}
                height={miniSize}
                alt="icon"
                preview={false}
              />
            </div>
          </Tooltip>
        </div>
        <InputCustom placeholder="Tìm kiếm" prefix={<SearchOutlined />} />
      </div>
    </div>
  );
};
