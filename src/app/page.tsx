"use client";

import { Canvas } from "@/views/main/canvas/Canvas";
import { SolutionPanel } from "@/views/main/solution/SolutionPanel";
import { Sidebar } from "@/views/main/side-bar/Sidebar";
import { useEffect, useState } from "react";
import "../config/styleOverride.css";
import styles from "./main.module.scss";
import { useDispatch } from "react-redux";
import { setFileList, setSessionCaching } from "./globalSlice";
import { getAllFile, getSessionCachingData } from "./service";
import { CustomDragLayer } from "@/views/main/side-bar/CustomDragLayer";
import { RibbonMenu } from "@/views/main/ribbon-menu/RibbonMenu";
import { FileInfo } from "@/entity/fileHandler/FileInfo";
import { SessionCaching } from "@/entity/fileHandler/SessionCaching";
import { LAST_OPEN_FILE } from "@/config/folder-data/sessionCachingKey";
import { setFileClick } from "@/views/main/canvas/canvasSlice";
import { BottomSystemApp } from "@/views/main/bottom-system/BottomSystemApp";
const HomePage = () => {
  const [justClick, setJustClick] = useState(false);

  const dispatch = useDispatch();
  const handleClickGlobal = () => {
    setJustClick(!justClick);
  };
  const initData = async () => {
    const files = await getAllFile();
    const sessionCaching = await getSessionCachingData();
    dispatch(setFileList(files));
    dispatch(setSessionCaching(sessionCaching));
    openLastOpenFile(sessionCaching as SessionCaching[], files);
  };
  const openLastOpenFile = (
    sessionCaching: SessionCaching[],
    files: FileInfo[]
  ) => {
    const lastOpenFile = sessionCaching.find((item) => {
      return item.key === LAST_OPEN_FILE;
    });
    if (lastOpenFile) {
      const file = files.find((item: FileInfo) => {
        return item.key === lastOpenFile.value;
      });
      dispatch(setFileClick(file));
    }
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div className={styles.appContainer} onClick={handleClickGlobal}>
      <div className={styles.ruyMenu}>
        <RibbonMenu />
      </div>
      <SolutionPanel justClick={justClick} />
      <Canvas />
      <Sidebar />
      <BottomSystemApp />
      <CustomDragLayer />
    </div>
  );
};

export default HomePage;
