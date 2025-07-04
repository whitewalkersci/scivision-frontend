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
import square from "../assets/images/square.svg";
import hash from "../assets/images/hash.svg";
import H_icon from "../assets/images/H.svg";
import {
  BlueSmallSpinner,
  InfinityLoader,
  SmallSpinner,
} from "../components/Loader";
function ModelsRegistry() {
  const navigate = useNavigate();
  const { user_id } = useUserData();
  const [images, setImages] = useState([]);
  const [deployedModels, setDeployedModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [experimentName, setExperimentName] = useState("");
  const CurrentPageHeader = () => {
    return (
      <div className="row-span-1 w-full px-10">
        <div className=" w-full grid grid-cols-12 px-10 min-h-20 h-10/12 border-b border-b-[#8E8E8E]">
          <div className="col-span-12 md:col-start-3 md:col-span-8 flex w-full items-start justify-between xl:px-10 pt-2 xl:pb-1  xl:text-xl">
            {/* Step 1: Upload */}
            <div className="flex flex-col items-center text-center h-full relative">
              <div className="w-8 h-8 border-[2px] border-GlobalPrimary rounded-full p-1">
                <div className="w-full aspect-square bg-GlobalPrimary rounded-full"></div>
              </div>
              <p className=" font-semibold text-GlobalPrimary mt-1  text-nowrap absolute bottom-0">
                Select Model
              </p>
            </div>

            {/* Progress Line */}
            {/* <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
            <div className="w-full border border-GlobalPrimary"></div>
          </div> */}
            <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
              <div className="w-full border border-GlobalPrimary"></div>
            </div>
            <div className="flex flex-col items-center text-center relative h-full">
              <div className="w-8 h-8 border-[2px] border-GlobalPrimary rounded-full p-1"></div>
              <p className=" font-normal text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
                Upload
              </p>
            </div>

            {/* Progress Line */}
            <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
              <div className="w-full border border-GlobalPrimary"></div>
            </div>

            {/* Step 3: Annotate */}
            <div className="flex flex-col items-center text-center relative h-full">
              <div className="w-8 h-8 border-[2px] border-GlobalPrimary rounded-full p-1"></div>
              <p className=" font-normal text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
                Annotation Review
              </p>
            </div>

            {/* Progress Line */}
            <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
              <div className="w-full border border-GlobalPrimary"></div>
            </div>

            {/* Step 4: Train */}
            <div className="flex flex-col items-center text-center relative h-full">
              <div className="w-8 h-8 border-[2px] border-GlobalPrimary rounded-full"></div>
              <p className=" font-normal text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
                Report
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const [showDialogueBox, setShowDialogueBox] = useState(false);

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
      <CurrentPageHeader />
      {showDialogueBox && (
        <div className="absolute z-10 h-full w-full  bg-[#061423A6] backdrop-blur-md flex justify-center items-center">
          <div className="w-8/11 h-8/12 bg-GlobalBg relative rounded-xl flex flex-col items-center px-5">
            <img
              onClick={() => {
                setSelectedModel({});
                setShowDialogueBox(false);
              }}
              className="w-12 absolute right-5 top-5 cursor-pointer"
              src={close_icon}
              alt="close_icon"
            />
            <div className=" border-b border-b-[#8E8E8E] h-1/8 w-full flex justify-start items-center">
              <h1 className="text-3xl text-GlobalPrimary">
                Let’s Analyse your Specimen
              </h1>
            </div>
            <div className="h-6/7 w-full grid grid-cols-9 grid-rows-4 text-TextColor text-lg p-5">
              <div className="col-span-3 row-span-1  flex flex-col gap-1">
                <h1 className="">Model name:</h1>
                <p className="font-light">{selectedModel?.model_name}</p>
              </div>
              <div className="col-span-3 row-span-1  flex flex-col gap-1">
                <h1 className="">Labels:</h1>
                <p className="font-light">
                  {selectedModel?.classes?.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index < selectedModel?.classes.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
              <div className="col-span-3 row-span-1  flex flex-col gap-1">
                <h1 className="">Experiment Name</h1>
                <div className="w-full border border-[#CBD5E1] rounded-md h-10 p-1 bg-white">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Experiment name"
                    className="outline-none w-full px-2"
                    value={experimentName}
                    onChange={(e) => {
                      setExperimentName(e.target.value);
                      setSelectedModel((prev) => ({
                        ...prev,
                        experiment_name: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="col-span-3 row-span-1">
                <h1 className="">Project name:</h1>
                {/* <p className="font-light">Lorem Ipsum Dolor Sit</p> */}
                <p className="font-light">{selectedModel?.project_name}</p>
              </div>
              <div className="col-span-3 row-span-1">
                <h1 className="">Creation Date:</h1>
                <p className="font-light">
                  {new Date(selectedModel?.create_time).toLocaleString()}
                </p>
              </div>
              <div className="col-span-3 row-span-1 flex flex-col gap-1 text-TextColor">
                <div className="w-full pe-5 flex justify-between">
                  <p>Visibility</p>
                  <img className="w-6" src={question_blue} alt="" />
                </div>
                <select
                  className="w-full border h-10 border-[#CBD5E1] outline-none rounded-md bg-white text-TextColor"
                  name=""
                  id=""
                >
                  <option value="">Select Visibility</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="col-span-6 row-span-1 pe-10 ">
                <p className="">Project Type</p>
                <div className="h-10/12 w-full border border-[#8CA9CA] rounded-xl bg-linear-to-b from-[#E3DED8] to-[#D4E5F8] flex flex-col">
                  <div className="h-1/2 min-h-[40px]  w-full grid grid-cols-10">
                    <div className="h-full col-span-4 w-full flex items-center px-4">
                      <p className="text-xl ">Object Detection</p>
                    </div>
                    <div className="h-full col-span-6 px-2 w-full grid grid-cols-12 text-sm gap-2">
                      <div className="col-span-4 h-fit p-1 bg-GlobalBg rounded-sm self-center flex gap-2">
                        <img src={square} alt="" />
                        <p>Bounding Boxes</p>
                      </div>
                      <div className="col-span-3 h-fit p-1 bg-GlobalBg rounded-sm self-center flex gap-2">
                        <img src={hash} alt="" />
                        <p>Counts</p>
                      </div>
                      <div className="col-span-5 h-fit p-1 bg-GlobalBg rounded-sm self-center flex gap-2">
                        <img src={H_icon} alt="" />
                        <p>Tracking</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-1/2 min-h-[40px] w-full grid grid-cols-10">
                    <div className="col-span-10 font-light flex justify-start items-center px-5">
                      <p>
                        Identify objects and their positions with bounding
                        boxes.
                      </p>
                    </div>
                    {/* <div className="col-span-6 grid grid-cols-9 font-light gap-3">
                      <div className="col-span-3 col-start-4 flex justify-center items-center gap-2">
                        <div className="w-6 h-6 aspect-square border flex justify-center items-center rounded-full">
                          <div className="w-4 aspect-square border rounded-full bg-GlobalPrimary"></div>
                        </div>
                        <p>Single Lead</p>
                      </div>
                      <div className="col-span-3 col-start-7 flex justify-center items-center gap-2">
                        <div className="w-6 h-6 aspect-square border flex justify-center items-center rounded-full"></div>
                        <p>Multi Lead</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-span-3 row-span-2">
                <div className="h-full w-full bg-white rounded-xl px-5 flex flex-col gap-2">
                  <p>eg. Tumour Cells</p>
                  <div
                    className="w-full h-10/12 rounded-xl"
                    style={{
                      backgroundImage: `url(${tumor_cells})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat, no-repeat",
                      backgroundPosition: "center, center",
                      // backgroundBlendMode: "multiply",
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-span-6 row-span-1s flex justify-between pe-10 items-end">
                <button
                  type="button"
                  className="w-5/11 h-12 border rounded-full bg-white text-GlobalPrimary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSelectedModel((prev) => ({
                      ...prev,
                      experiment_name: experimentName,
                    }));
                    navigate("/postmodelselection", {
                      state: { selectedModel: selectedModel },
                    });
                  }}
                  type="button"
                  className="w-5/11 h-12 border rounded-full bg-GlobalPrimary text-white cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row-span-9 w-full px-10">
        <div className="flex flex-col justify-center items-start text-GlobalPrimary gap-4 border-b border-b-[#8E8E8E] py-4">
          <p className="text-xl">
            Please select a trained model to associate with your new specimen
            uploads and begin analysis.
          </p>
          <div className="flex w-full">
            <div className="w-4/12 flex items-center">
              <p className="text-2xl font-normal">List of Models trained</p>
            </div>
            <div className="w-8/12 grid grid-cols-12 gap-4">
              <div className="col-span-8 border rounded-full grid grid-cols-12">
                <div className="col-span-1 flex justify-center items-center">
                  <img className="h-8 max-h-10 min-h-6" src={search_icon} />
                </div>
                <div className="col-span-11  flex pe-5">
                  <input className="w-full outline-none text-2xl" type="text" />
                </div>
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
                  onClick={() => {
                    setSelectedModel((prev) => ({
                      ...prev,
                      user_id: user_id,
                      project_name: model?.project_name,
                      model_name: model?.model_id,
                      create_time: model?.create_time,
                      classes: model?.classes,
                      experiment_name: "",
                    }));
                    setShowDialogueBox(true);
                  }}
                  key={index}
                  className="col-span-2 h-48 border border-[#8ca9ca] rounded-2xl cursor-pointer"
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

export default ModelsRegistry;
