"use client";

import "./globals.css";
import React from "react";
import { DndWrapper } from "@/views/main/DnDWrapper";
import { setMessageInstance } from "@/config/messageContext";

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
          {messageContextHolder}
          <DndWrapper>{children}</DndWrapper>
        </React.StrictMode>
      </body>
    </html>
  );
}
