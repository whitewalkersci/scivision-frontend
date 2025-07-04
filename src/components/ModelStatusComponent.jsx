import React from "react";

const ModelStatusComponent = ({value,label}) => {
  return (
    <div className="min-w-[25%] flex flex-col items-center gap-1 px-2 py-8 border border-GlobalLightBlue rounded-2xl  bg-gradient-to-b from-[#DDD6CE] to-[#D4E5F8]">
      <div className="h-28 w-28 flex items-center justify-center border rounded-full text-2xl font-bold bg-white">
        {value}%
      </div>
      <p>{label}</p>
    </div>
  );
};

export default ModelStatusComponent;
