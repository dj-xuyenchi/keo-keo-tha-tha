'use client'
import { Canvas } from "@/component/Canvas";
import { PropertiesPanel } from "@/component/PropertiesPanel";
import { Sidebar } from "@/component/Sidebar";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";

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
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Canvas
          items={items}
          onDrop={handleDrop}
          onSelect={handleSelect}
          selectedId={selectedId}
        />
        <PropertiesPanel selected={selected} onChange={handleChange} />
      </div>
    </DndProvider>
  );
};

export default HomePage;
