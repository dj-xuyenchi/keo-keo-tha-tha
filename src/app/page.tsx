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
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleDrop = (node: NodeDropData, offset: XYCoord | null) => {
    setItems(
      (prev) =>
        [
          ...prev,
          {
            id: uuidv4(),
            type: node.type,
            props: {},
            showingProps: node.defaultProps,
            top: offset?.y || 0,
            left: offset?.x || 0,
          },
        ] as NodeComponent[]
    );
  };

  const handleMoveNode = (node: NodeComponent) => {
    setItems((prev) => prev.filter((item) => item.id !== node.id));
  };

  const handleUpdateNode = (node: NodeComponent) => {};

  const handlePutNode2Node = (
    nodeTarget: NodeComponent,
    nodeSource: NodeComponent
  ) => {
    setItems((prev) =>
      prev.map((node) => {
        if (node.id === nodeTarget.id) {
          var children = nodeTarget.props.children;
          if (!children) {
            children = [nodeSource];
          } else {
            children.push(nodeSource);
          }
          nodeTarget.props.children = children;
        }
        return node;
      })
    );
  };

  const handleSelect = (id: string) => setSelectedId(id);

  const selected = items.find((n) => n.id === selectedId) || null;
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    let isSpacePressed = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Chặn scroll khi nhấn Space nhưng không ở trong input/textarea
      if (
        e.code === "Space" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        isSpacePressed = true;
        el.style.cursor = "grab";
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        isSpacePressed = false;
        el.style.cursor = "default";
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isSpacePressed && e.button === 0) {
        isPanning.current = true;
        panStart.current = { x: e.clientX, y: e.clientY };
        translateStart.current = { ...translate };
        el.style.cursor = "grabbing";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanning.current) return;
      e.preventDefault();
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setTranslate({
        x: translateStart.current.x + dx,
        y: translateStart.current.y + dy,
      });
    };

    const handleMouseUp = () => {
      isPanning.current = false;
      if (isSpacePressed) el.style.cursor = "grab";
      else el.style.cursor = "default";
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [translate]);

  // Áp dụng transform
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`;
    }
  }, [scale, translate]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.ruyMenu}>ss</div>
      <SolutionPanel selected={selected} />
      <div className={styles.contentContainer} ref={canvasRef}>
        <Canvas
          items={items}
          onDrop={handleDrop}
          onMoveNode={handleMoveNode}
          onSelect={handleSelect}
          selectedId={selectedId}
          onPutNode2Node={handlePutNode2Node}
        />
      </div>
      <Sidebar onUpdateNode={handleUpdateNode} />
    </div>
  );
};

export default HomePage;
