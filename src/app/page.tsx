"use client";

import { Canvas } from "@/views/main/Canvas";
import { SolutionPanel } from "@/views/main/solution/SolutionPanel";
import { Sidebar } from "@/views/main/Sidebar";
import { useState } from "react";
import "../config/styleOverride.css";
import styles from "./main.module.scss";
import { NodeComponent } from "@/entity/NodeComponent";
const HomePage = () => {
  const [justClick, setJustClick] = useState(false);
  const [items, setItems] = useState<NodeComponent[]>([] as NodeComponent[]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const handleClickGlobal = () => {
    setJustClick(!justClick);
  };
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
