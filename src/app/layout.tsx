"use client";

import "./globals.css";
import React from "react";
import { DndWrapper } from "@/views/main/DnDWrapper";
import { setMessageInstance } from "@/config/messageContext";
import { Provider } from "react-redux";
import store from "@/store/store";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messageContextHolder = setMessageInstance();
  return (
    <html lang="en">
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
