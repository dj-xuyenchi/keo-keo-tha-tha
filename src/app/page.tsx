"use client";

import { Canvas } from "@/component/Canvas";
import { SolutionPanel } from "@/component/SolutionPanel";
import { Sidebar } from "@/component/Sidebar";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./main.module.scss";
import { NodeComponent } from "@/entity/NodeComponent";
import { CONTROL_TYPE, DATA_TYPE, LAYOUT_TYPE } from "@/config/TypeComponent";
import { XYCoord } from "react-dnd";
const HomePage = () => {
  const [items, setItems] = useState<NodeComponent[]>([] as NodeComponent[]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDrop = (type: DATA_TYPE | CONTROL_TYPE | LAYOUT_TYPE, offset: XYCoord | null) => {
    setItems((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: type,
        props: {},
        top: offset?.y || 0,
        left: offset?.x || 0
      },
    ] as NodeComponent[]);
  };

  const handleMoveNode = (node: NodeComponent) => {
    setItems((prev) =>
      prev.filter((item) => item.id !== node.id)
    );
  };

  const handleUpdateNode = (node: NodeComponent) => {

  }

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
          onMoveNode={handleMoveNode}
          onSelect={handleSelect}
          selectedId={selectedId}
        />
        <Sidebar
          onUpdateNode={handleUpdateNode}
        />
      </div>
    </div>
  );
};

export default HomePage;
