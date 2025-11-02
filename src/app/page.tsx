"use client";

import { Canvas } from "@/views/main/canvas/Canvas";
import { SolutionPanel } from "@/views/main/solution/SolutionPanel";
import { Sidebar } from "@/views/main/side-bar/Sidebar";
import { useEffect, useState } from "react";
import "../config/styleOverride.css";
import styles from "./main.module.scss";
import { NodeComponent } from "@/entity/NodeComponent";
import { useDispatch } from "react-redux";
import { setFileList } from "./globalSlice";
import { getAllFile } from "./service";
const HomePage = () => {
  const [justClick, setJustClick] = useState(false);
  const [items, setItems] = useState<NodeComponent[]>([] as NodeComponent[]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const handleClickGlobal = () => {
    setJustClick(!justClick);
  };
  const initData = async () => {
    const files = await getAllFile();

    dispatch(setFileList(files));
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div className={styles.appContainer} onClick={handleClickGlobal}>
      <div className={styles.ruyMenu}>ss</div>
      <SolutionPanel justClick={justClick} selected={selectedId} />
      <Canvas />
      <Sidebar />
    </div>
  );
};

export default HomePage;
