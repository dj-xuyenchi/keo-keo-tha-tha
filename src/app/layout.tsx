"use client";

import "./globals.css";
import React from "react";
import { DndWrapper } from "@/views/main/DnDWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`hide-scrollbar`}>
        <React.StrictMode>
          <DndWrapper>{children}</DndWrapper>
        </React.StrictMode>
      </body>
    </html>
  );
}
