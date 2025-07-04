import React from "react";
import Header from "../components/Header";
import Content from "../components/Content";
function RootLayout() {
  return (
    <div className="h-[100dvh] grid grid-rows-12">
      <Header />
      <Content />
    </div>
  );
}

export default RootLayout;
