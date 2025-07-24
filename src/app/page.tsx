"use client";

import { Canvas } from "@/component/Canvas";
import { SolutionPanel } from "@/component/SolutionPanel";
import { Sidebar } from "@/component/Sidebar";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./main.module.scss";
const HomePage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDrop = (type: string) => {
    const newNode = {
      id: uuidv4(),
      type,
      props:
        type === "Button"
          ? { text: "Click Me" }
          : { placeholder: "Enter text" },
    };
    setItems([...items, newNode]);
  };

  const handleSelect = (id: string) => setSelectedId(id);

  const handleChange = (field: string, value: any) => {
    setItems((prev) =>
      prev.map((n) =>
        n.id === selectedId
          ? { ...n, props: { ...n.props, [field]: value } }
          : n
      )
    );
  };

  const selected = items.find((n) => n.id === selectedId) || null;

  return (
    <div className={styles.appContainer}>
      <div className={styles.ruyMenu}>ss</div>
      <div className={styles.contentContainer}>
        <SolutionPanel selected={selected} onChange={handleChange} />
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
