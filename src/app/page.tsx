"use client";

import { Canvas, NodeDropData } from "@/component/Canvas";
import { SolutionPanel } from "@/component/SolutionPanel";
import { Sidebar } from "@/component/Sidebar";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./main.module.scss";
import { NodeComponent } from "@/entity/NodeComponent";
import { CONTROL_TYPE, DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";
import { XYCoord } from "react-dnd";
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
