"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CustomDragLayer } from "../views/main/side-bar/CustomDragLayer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { handleCommandCtrlS } from "@/app/service";

export const DndWrapper = ({ children }: { children: React.ReactNode }) => {
  const canvas = useSelector((state: RootState) => state.canvas);
  const global = useSelector((state: RootState) => state.global);
  useEffect(() => {
   

    const handleSaveShortcut = (event: KeyboardEvent) => {
      handleCommandCtrlS(event, global, canvas);
    };

    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
     
    };
  }, [global, canvas]);
  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      {children}
    </DndProvider>
  );
};
