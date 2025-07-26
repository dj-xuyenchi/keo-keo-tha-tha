"use client";

import { Canvas } from "@/component/Canvas";
import { SolutionPanel } from "@/component/SolutionPanel";
import { Sidebar } from "@/component/Sidebar";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./main.module.scss";
import { NodeComponent, NodeProps } from "@/entity/NodeComponent";
import { CONTROL_TYPE, DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";
const HomePage = () => {
  const [items, setItems] = useState<NodeComponent[]>([] as NodeComponent[]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDrop = (type: DATA_TYPE | CONTROL_TYPE | LAYOUT_TYPE) => {
    const newNode = {
      id: uuidv4(),
      type,
      props: {} as NodeProps
    };
    setItems([...items, newNode]);
    console.error(items);

  };

  const handleSelect = (id: string) => setSelectedId(id);


  const selected = items.find((n) => n.id === selectedId) || null;

  return (
    <div className={styles.appContainer}>
      <div className={styles.ruyMenu}>ss</div>
      <div className={styles.contentContainer}>
        <SolutionPanel selected={selected} />
        <Canvas
          items={items}
          onDrop={handleDrop}
          onSelect={handleSelect}
          selectedId={selectedId}
        />
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
