"use client";

import { Canvas } from "@/views/main/canvas/Canvas";
import { SolutionPanel } from "@/views/main/solution/SolutionPanel";
import { Sidebar } from "@/views/main/Sidebar";
import { useEffect, useState } from "react";
import "../config/styleOverride.css";
import styles from "./main.module.scss";
import { NodeComponent } from "@/entity/NodeComponent";
import { useDispatch } from "react-redux";
import { setFileList } from "./globalSlice";
const HomePage = () => {
  const [justClick, setJustClick] = useState(false);
  const [items, setItems] = useState<NodeComponent[]>([] as NodeComponent[]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const handleClickGlobal = () => {
    setJustClick(!justClick);
  };
  const getAllFile = async () => {
    const content = [
      { key: "512356e1-beb2-4d2d-9d39-d12a1f4ed30e", content: "hehj hẹ hẹ" },
      { key: "e1e063d8-61c1-4d02-a25c-486f550f7b04", content: "code để" },
    ];
    dispatch(setFileList(content));
  };
  useEffect(() => {
    getAllFile();
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
