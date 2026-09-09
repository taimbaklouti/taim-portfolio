"use client";
import Sidebar from "@/components/Sidebar";
import FloatingChat from "@/components/FloatingChat";

export default function RootLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
      <FloatingChat />
    </>
  );
}
