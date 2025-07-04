import React, { useRef, useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import list_icon from "../assets/images/list_icon.svg";
import grid_icon from "../assets/images/grid_icon.svg";
import search_icon from "../assets/images/search_icon.svg";
import green_tick from "../assets/images/green_tick.svg";
import AxiosInstance from "../axios/AxiosInstance";
import close_icon from "../assets/images/close_icon.svg";
import question_blue from "../assets/images/question_blue.svg";
import tumor_cells from "../assets/images/tumor_cells.png";
import tick from "../assets/images/tick.svg";
import filter from "../assets/images/filter.svg";
import image_icon from "../assets/images/image.svg";
import { useUserData } from "../zustand/userStore";
import { useNavigate } from "react-router-dom";
import {
  BlueSmallSpinner,
  InfinityLoader,
  SmallSpinner,
} from "../components/Loader";
function ModelsRegistryListPage() {
  const navigate = useNavigate();
  const { user_id } = useUserData();
  const [images, setImages] = useState([]);
  const [deployedModels, setDeployedModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState({});
  const [showDialogueBox, setShowDialogueBox] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    fetchModels();
  }, []);
  const fetchModels = async () => {
    setShowLoading(true);
    console.log("i am here");
    try {
      const response = await AxiosInstance.post("/model_registry", {
        user_id: "admin_0",
      });
      if (
        response.status === 200 &&
        response?.data?.deployed_models.length > 0
      ) {
        // console.log(response?.data?.deployed_models.length > 0);
        // console.log(response.status);
        setDeployedModels(response?.data?.deployed_models);
      } else {
        setDeployedModels([]);
      }
      console.log(response);
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
      console.log(error);
      setDeployedModels([]);
    }
  };

  return (
    <div className="h-[100dvh] w-full grid grid-rows-11 bg-GlobalBg">
      <Header />

      <div className="row-span-9 w-full px-10">
        <div className="flex flex-col justify-center items-start text-GlobalPrimary gap-4 border-b border-b-[#8E8E8E] py-4">
          
          <div className="flex w-full">
            <div className="w-4/12 flex items-center">
              <p className="text-2xl font-normal">List of Models trained</p>
            </div>
            <div className="w-8/12 grid grid-cols-12 gap-4">
              <div className="col-span-5 border rounded-full grid grid-cols-12 px-2">
                <div className="col-span-1 flex justify-center items-center">
                  <img className="h-8 max-h-10 min-h-6" src={search_icon} />
                </div>
                <div className="col-span-11  flex pe-5">
                  <input className="w-full outline-none text-2xl" type="text" />
                </div>
              </div>
              <div className="col-span-3">
                <button
                  onClick={() => {
                    navigate("/uploadpagedetails");
                  }}
                  type="button"
                  className=" h-14 border w-full rounded-full text-xl bg-GlobalPrimary text-white cursor-pointer"
                >
                  Generate Model
                </button>
              </div>
              <div className="col-span-2 h-14 border rounded-full flex justify-center items-center px-5">
                <select className="w-full text-xl outline-none" name="" id="">
                  <option value="">Sort by</option>
                </select>
              </div>
              <div className="col-span-2 flex justify-evenly">
                <div className="flex justify-center items-center">
                  <img
                    className="h-full max-h-12 aspect-square"
                    src={grid_icon}
                    alt=""
                  />
                </div>
                <div className="flex justify-center items-center">
                  <img
                    className="h-full max-h-12 aspect-square"
                    src={list_icon}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {showLoading ? (
          <div className="w-full min-h-[20rem] h-8/12 2xl:h-9/12 flex justify-center items-center">
            <BlueSmallSpinner />
          </div>
        ) : (
          <div className=" w-full min-h-[20rem] h-8/12 2xl:h-9/12 grid grid-cols-10 place-content-start py-4 gap-3 overflow-auto">
            {deployedModels.map((model, index) => (
              <>
                <div
                  key={index}
                  className="col-span-2 h-48 border border-[#8ca9ca] rounded-2xl cursor-default"
                >
                  <div className="p-2 rounded-t-2xl bg-gradient-to-b from-[#E3DED8] to-[#D4E5F8]">
                    <h1 className="text-xl text-GlobalPrimary">
                      {model.deployed_model_display_name}
                    </h1>
                  </div>
                  <div className="h-36 p-2 flex flex-col justify-between text-TextColor">
                    <div className="text-xl flex justify-between">
                      <div>
                        <p>Date:</p>

                        <p>{new Date(model.create_time).toLocaleString()}</p>
                      </div>
                      <div className="self-start">
                        <img src={green_tick} alt="" />
                      </div>
                    </div>
                    <div className="text-xl flex flex-col">
                      <p>Project Type:</p>
                      <p>Lorem 2</p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelsRegistryListPage;
