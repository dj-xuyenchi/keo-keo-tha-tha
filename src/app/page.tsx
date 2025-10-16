"use client";

import { Canvas, NodeDropData } from "@/component/Canvas";
import { SolutionPanel } from "@/component/SolutionPanel";
import { Sidebar } from "@/component/Sidebar";
import { useEffect, useRef, useState } from "react";
import "../config/styleOverride.css";
import styles from "./main.module.scss";
import { NodeComponent } from "@/entity/NodeComponent";
const HomePage = () => {
  const [items, setItems] = useState<NodeComponent[]>([] as NodeComponent[]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className={styles.appContainer}>
      <div className={styles.ruyMenu}>ss</div>
      <SolutionPanel />
      <Canvas />
      <Sidebar />
    </div>
  );
};

export default HomePage;
