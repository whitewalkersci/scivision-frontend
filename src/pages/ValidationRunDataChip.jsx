import React from "react";

const ValidationRunDataChip = () => {
  return (
    <div className="w-full flex bg-[#CCDDF1] flex-col rounded-xl gap-1 px-2 ">
      <div className="w-full h-full self-end  pr-2 py-1 flex justify-between items-center  border-b">
        <span className="flex gap-2 items-center">
          <span
            className={`w-4 h-4 border border-black bg-red-400 rounded-sm`}
          />
          <span>Class name 1</span>
        </span>
        <span className="self">00</span>
      </div>
      <div className="flex justify-between ">
        <span>Area/Size</span>
        <span>20μm²</span>
      </div>
      <div className="flex justify-between ">
        <span>Confidence Score</span>
        <span>80%</span>
      </div>
    </div>
  );
};

export default ValidationRunDataChip;
