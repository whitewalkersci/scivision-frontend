import React from "react";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <>
      <div className="w-full h-full row-span-11">
        <Outlet />
      </div>
    </>
  );
};

export default Content;
