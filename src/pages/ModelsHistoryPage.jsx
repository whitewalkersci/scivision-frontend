import React, { useState } from "react";
import Header from "../components/Header";
import search_icon from "../assets/images/search_icon.svg";
import { data } from "../utils/ModelsHistroySampleData";
import green_tick from "../assets/images/green_tick.svg";
import eye_icon from "../assets/images/eye_icon.svg";
import reload_icon from "../assets/images/reload_icon.png";

import { BlueSmallSpinner, SmallSpinner } from "../components/Loader";
import { useModelTrainingStatus } from "../TankStackQuery/UserQueryInjection";
import { useNavigate } from "react-router-dom";
import { useTrainModelStore } from "../zustand/trainModelStore";

const ModelsHistoryPage = () => {
  const navigate = useNavigate();
  const { setAiModelName, setProjectName, setDataType, setCreationDate } =
    useTrainModelStore();
  const [SearchInput, setSearchInput] = useState("");
  const {
    data: ModelStatusData = [],
    error,
    isFetching,
    isRefetching,
    refetch,
  } = useModelTrainingStatus();

  const SaveDataAndNext = (
    model_name,
    project_name,
    data_type,
    created_date
  ) => {
    setAiModelName(model_name);
    setProjectName(project_name);
    setDataType(data_type);
    setCreationDate(created_date);
    navigate("/validatemodel");
  };

  return (
    <>
      <div className="h-[100dvh] w-full grid grid-rows-12 bg-GlobalBg ">
        <Header />
        <div className="row-span-1 bg-white flex items-center justify-between border-b">
          <p className="ml-8 text-GlobalPrimary text-2xl">Model History</p>
          <div className="flex items-center justify-center mr-8">
            <div className="w-96 rounded-full  border h-10 mr-2 flex items-center gap-2 pr-8">
              <img src={search_icon} alt="icon" className="ml-4 " />
              <input
                type="text"
                className="h-full w-full border-none-input"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
            </div>
            <button
              className="w-fit cursor-pointer"
              onClick={() => {
                refetch();
              }}
            >
              <img src={reload_icon} width={50} alt="icon" />
            </button>
          </div>
        </div>
        <div className="row-span-10 w-full h-full bg-white">
          <div className=" grid grid-cols-12 grid-rows-12 h-full w-full place-content-start ">
            <div className="col-span-12 grid grid-cols-12  border-b  row-span-1 pe-4">
              <div className="h-full w-full bg-white col-span-3 place-content-center text-center font-medium text-xl">
                Model
              </div>
              <div className="h-full w-full bg-white col-span-2 place-content-center text-center font-medium text-xl">
                Creation Date
              </div>
              <div className="h-full w-full bg-white col-span-1 place-content-center text-center font-medium text-xl">
                Time
              </div>
              <div className="h-full w-full bg-white col-span-2 place-content-center text-center font-medium text-xl">
                Project Name
              </div>
              <div className="h-full w-full bg-white col-span-2 place-content-center text-center font-medium text-xl">
                Status
              </div>
              <div className="h-full w-full bg-white col-span-1 place-content-center text-center font-medium text-xl">
                View
              </div>
              <div className="h-full w-full bg-white col-span-1 place-content-center text-center font-medium text-xl">
                Validate
              </div>
              {/* <div className="h-full w-full bg-white col-span-1 place-content-center text-center font-medium text-xl">
                Retrain
              </div> */}
            </div>
            <div className="grid grid-cols-12 row-span-10 col-span-12 overflow-y-auto gap-y-2 place-content-start place-items-center py-2 ">
              {ModelStatusData?.length&&!isRefetching ? (
                ModelStatusData?.filter((status_data) => {
                  if (SearchInput.trim() === "") {
                    return true;
                  }
                  return status_data.model_id
                    .toLowerCase()
                    .includes(SearchInput.trim().toLowerCase());
                })?.map((val, index) => {
                  return (
                    <>
                      <div
                        className={`${
                          val?.progress === 100 && !error
                            ? "bg-green-200"
                            : val?.progress > 0 && val?.progress < 100 && !error
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        } w-full col-span-3 place-content-center text-center h-12 text-xl`}
                      >
                        {val.model_id}
                      </div>
                      <div
                        className={`${
                          val?.progress === 100 && !error
                            ? "bg-green-200"
                            : val?.progress > 0 && val?.progress < 100 && !error
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        } w-full col-span-2 place-content-center text-center  text-xl h-12`}
                      >
                        {new Date(val.created).toISOString().split("T")[0] ??
                          "-"}
                      </div>
                      <div
                        className={`${
                          val?.progress === 100 && !error
                            ? "bg-green-200"
                            : val?.progress > 0 && val?.progress < 100 && !error
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        } w-full col-span-1 place-content-center text-center  text-xl h-12`}
                      >
                        {new Date(val.created)
                          .toISOString()
                          .split("T")[1]
                          .slice(0, 8) ?? "-"}
                      </div>
                      <div
                        className={`${
                          val?.progress === 100 && !error
                            ? "bg-green-200"
                            : val?.progress > 0 && val?.progress < 100 && !error
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        } w-full col-span-2 place-content-center text-center text-xl h-12`}
                      >
                        {val.project_name}
                      </div>
                      <div
                        className={`${
                          val?.progress === 100 && !error
                            ? "bg-green-200"
                            : val?.progress > 0 && val?.progress < 100 && !error
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        } w-full col-span-2 place-content-center text-center text-xl h-12`}
                      >
                        {val?.progress === 100 && !error
                          ? "Complete"
                          : val?.progress > 0 && val?.progress < 100 && !error
                          ? `In progress...${val?.progress ?? 0}%`
                          : "Failed"}
                      </div>
                      <div
                        className={`${
                          val?.progress === 100 && !error
                            ? "bg-green-200"
                            : val?.progress > 0 && val?.progress < 100 && !error
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        } w-full col-span-1 place-content-center text-center h-12 flex item-center `}
                      >
                        {val.progress === 100 ? (
                          <button
                            onClick={() => {
                              SaveDataAndNext(
                                val.model_id,
                                val.project_name,
                                val.data_type,
                                val.created
                              );
                              navigate(
                                `/modelsreport/${val?.model_id}/${val?.project_name}`
                              );
                            }}
                            className="cursor-pointer"
                          >
                            <img src={eye_icon} width={28} alt="icon" />
                          </button>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div
                        className={`${
                          val?.progress === 100 && !error
                            ? "bg-green-200"
                            : val?.progress > 0 && val?.progress < 100 && !error
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        } w-full col-span-1 place-content-center text-center h-12 flex item-center`}
                      >
                        {val.progress !== 100 ? (
                          "-"
                        ) : (
                          <button
                            className="px-2 h-8 py-1 border w-fit rounded-full bg-transparent self-center"
                            onClick={() => {
                              SaveDataAndNext(
                                val.model_id,
                                val.project_name,
                                val.data_type,
                                val.created
                              );
                            }}
                          >
                            Validate
                          </button>
                        )}
                      </div>
                      {/* <div
                        className={`${
                          val?.progress === 100 && !error
                            ? "bg-green-200"
                            : val?.progress > 0 && val?.progress < 100 && !error
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        } w-full col-span-1 place-content-center text-center h-12 `}
                      >
                        {val.progress !== 100
                          ? // <button className="px-8 py-1 border w-fit rounded-full bg-transparent cursor-not-allowed">
                            //   Retrain
                            // </button>
                            "-"
                          : // <button className="whitespace-nowrap px-1 py-1 border w-fit rounded-full bg-transparent text-sm cursor-not-allowed">
                            //   Validate & Retrain
                            // </button>
                            "-"}
                      </div> */}
                    </>
                  );
                })
              ) : isFetching ||isRefetching? (
                <div className="w-full col-span-12 text-3xl h-96 flex items-center justify-center">
                  <BlueSmallSpinner />
                </div>
              ) : (
                <div className="w-full col-span-12 text-3xl h-96 flex items-center justify-center">
                  No data found
                </div>
              )}
            </div>
            <div className="w-full grid grid-cols-12 row-span-1 bg-white border col-span-12 place-items-center">
              <p className="  flex items-center justify-center "></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelsHistoryPage;
