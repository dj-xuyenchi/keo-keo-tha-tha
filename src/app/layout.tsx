// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import "./globals.css";
import React, { useEffect } from "react";
import { DndWrapper } from "@/app/DnDWrapper";
import { setMessageInstance } from "@/config/messageContext";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Modal } from "antd";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [modal, modalContextHolder] = Modal.useModal();
  const messageContextHolder = setMessageInstance();
  useEffect(() => {
    const removeListener = window.electronAPI.onShowExitConfirm(() => {
      modal.confirm({
        title: "Dữ liệu chưa được lưu thì sao?",
        content:
          "Dữ liệu chưa lưu sẽ bị mất. Bạn có chắc vẫn muốn thoát chương trình?",
        okText: "Bỏ và thoát",
        cancelText: "Để xem lại",
        centered: true,
        onOk: () => {
          window.electronAPI.confirmExit();
        },
      });
    });

    return () => removeListener && removeListener();
  }, []);
  return (
    <html lang="en">
      {modalContextHolder}
      <body className={`hide-scrollbar`}>
        <React.StrictMode>
          <Provider store={store}>
            {messageContextHolder}
            <DndWrapper>{children}</DndWrapper>
          </Provider>
        </React.StrictMode>
      </body>
    </html>
  );
}
