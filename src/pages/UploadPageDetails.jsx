import React, { useEffect, useState, useRef } from "react";
import tumor_cells from "../assets/images/tumor_cells.png";
import tick from "../assets/images/tick.svg";
import filter from "../assets/images/filter.svg";
import image_icon from "../assets/images/image.svg";
import H_icon from "../assets/images/H.svg";
import hash from "../assets/images/hash.svg";
import square from "../assets/images/square.svg";
import question_circle from "../assets/images/question_circle.svg";
import comment_icon from "../assets/images/comment_icon.svg";
import message_icon from "../assets/images/message_icon.svg";
import car_icon from "../assets/images/car_icon.svg";
import robotics_icon from "../assets/images/robotics_icon.svg";
import { useTrainModelStore } from "../zustand/trainModelStore";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import AxiosInstance from "../axios/AxiosInstance";
import chevron_down from "../assets/images/chevron_down.svg";

function UploadPageDetails() {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  const [classes, setClasses] = useState([]);
  const { setProjectName, setClassname, setAiModelName } = useTrainModelStore();
  const classInputRef = useRef(null);

  const handelClassSelection = (newValue) => {
    setClasses((prev) => {
      const result = [...prev, newValue];
      setValue("class", result);
      return result;
    });
  };

  const removeClassFromSelection = (index) => {
    setClasses((prev) => {
      const newClasses = [...prev];
      const result = newClasses.filter((val) => val !== prev[index]);
      setValue("class", result);
      return result;
    });
  };

  const onSubmit = async (data) => {
    console.log("data--------->", data);
    setProjectName(data.project_name);
    setClassname(data.class);
    setAiModelName(data.ai_model);
    navigate("/uploadpage");
  };

  const handelEnterKeyPress = (e) => {
    const value = e.target.value.trim();
    if (e.key === "Enter" && value) {
      e.preventDefault();
      if (!classes.includes(value) && value !== "") {
        console.log("new_input_value---------->", value);
        handelClassSelection(value);
        e.target.value = "";
      } else {
        e.target.value = "";
      }
    }
  };

  return (
    <div className="h-[100dvh] w-full grid grid-rows-12 bg-GlobalBg ">
      <Header />
      <div className="row-span-11">
        <form
          className="p-5 w-full h-full bg-GlobalBg flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="h-16 border-b-2 border-b-GlobalLightGrey flex items-center justify-start">
            <h1 className="text-3xl">Let’s Generate Your Model</h1>
          </div>
          <div className="grid grid-cols-11 gap-10">
            {/* Ai model name field */}
            <div className="flex flex-col col-span-6 ">
              <h3 className="text-lg">Project Name</h3>
              <div className="border rounded-md border-GlobalLightGrey bg-white px-3 h-12 flex">
                <input
                  type="text"
                  placeholder="Enter Project name"
                  autoComplete="off"
                  className="outline-none w-full text-xl"
                  {...register("project_name", {
                    required: "Project name is required",
                  })}
                  onMouseDown={() => clearErrors("project_name")}
                />
              </div>
              <p className="text-md text-red-400 h-2 mt-1">
                {errors.project_name ? errors.project_name.message : ""}
              </p>
            </div>
            <div className="col-span-5 grid grid-cols-6 gap-6">
              <div className="flex flex-col col-span-3">
                <h3 className="text-lg">AI Model Name</h3>
                <div className="border rounded-md border-GlobalLightGrey bg-white px-3 h-12 flex">
                  <input
                    type="text"
                    // value={aiModel}
                    // onChange={(e) => {
                    //   setAiModel(e.target.value);
                    // }}
                    autoComplete="off"
                    placeholder="Enter AI Model name"
                    className="outline-none w-full text-xl"
                    {...register("ai_model", {
                      required: "AI modal name is required",
                    })}
                    onMouseDown={() => clearErrors("ai_model")}
                  />
                </div>
                <p className="text-md text-red-400 h-2 mt-1">
                  {errors.ai_model ? errors.ai_model.message : ""}
                </p>
              </div>
              <div className="flex flex-col col-span-3">
                <div className="flex gap-2">
                  <h3 className="text-lg">Visibility</h3>
                </div>
                <div className="border rounded-md border-GlobalLightGrey bg-white px-3 h-12 flex items-center">
                  {/* <input
                    type="text"
                    autoComplete="off"
                    placeholder="Select visibility"
                    disabled
                    className="outline-none w-full text-xl cursor-not-allowed"
                  />
                  <img className="h-6" src={chevron_down} alt="" /> */}
                  <select
                    className="w-full text-xl outline-none text-[#8E8E8E]"
                    name=""
                    id=""
                  >
                    <option className="" value="">
                      Select visibility
                    </option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-11 gap-10">
            {/* Data type */}
            <div className="flex flex-col col-span-6">
              <h3 className="text-lg">Data Type</h3>
              <div className="border rounded-md border-GlobalLightGrey bg-white px-3 h-12 flex">
                <input
                  type="text"
                  placeholder="Enter data type"
                  autoComplete="off"
                  className="outline-none w-full text-xl"
                  {...register("data_type", {
                    required: "Data type is required",
                  })}
                  onMouseDown={() => clearErrors("data_type")}
                />
              </div>
              <p className="text-md text-red-400 h-2 mt-1">
                {errors.data_type ? errors.data_type.message : ""}
              </p>
            </div>
            <div className="flex flex-col col-span-5">
              <h3 className="text-lg">Class</h3>
              <div className="border rounded-md border-GlobalLightGrey  px-3 h-12 flex bg-white">
                <input
                  type="text"
                  placeholder="Enter class name"
                  autoComplete="off"
                  className="outline-none w-[99%] text-xl"
                  onKeyDown={(e) => handelEnterKeyPress(e)}
                  onMouseDown={() => clearErrors("class")}
                  ref={classInputRef}
                />
                {/* hidden input field take the input here and set it in react-hook-form and visible input can work accordingly */}
                <input
                  type="hidden"
                  {...register("class", {
                    validate: (value) =>
                      value?.length > 0 || "At least one class is required",
                  })}
                />
                <button className="text-center w-8" type="button">
                  <p
                    className="w-8 h-8 text-2xl  hover:bg-slate-200 custom-fade-in rounded-full cursor-pointer"
                    onClick={() => {
                      if (
                        classInputRef.current &&
                        classInputRef.current.value
                      ) {
                        clearErrors("class");
                        handelClassSelection(classInputRef.current.value);
                        classInputRef.current.value = "";
                      }
                    }}
                  >
                    +
                  </p>
                </button>
              </div>
              <p className="text-md text-red-400 h-2 mt-1">
                {errors.class ? errors.class.message : ""}
              </p>
              <div className="w-full h-min flex gap-2 justify-start transition-all duration-300 overflow-y-auto">
                {classes.length > 0
                  ? classes?.map((val, index) => {
                      return (
                        <>
                          <div
                            className="bg-white w-[7rem] text-start px-1  py-1 rounded-xl flex justify-evenly items-center gap-1 "
                            title={val}
                            key={index}
                          >
                            <p className="w-24  truncate ">{val}</p>
                            <button
                              className="bg-slate-200 w-12 h-8 p-[0.1rem] ml-2 rounded-full text-sm cursor-pointer"
                              type="button"
                              onClick={() => {
                                removeClassFromSelection(index);
                              }}
                            >
                              X
                            </button>
                          </div>
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-11 gap-10 flex-grow min-h-0">
            {/* Data type */}
            <div className=" grid grid-rows-10 h-fit max-h-full overflow-auto col-span-6 gap-6">
              <div className="row-span-4 min-h-fit overflow-y-auto rounded-xl bg-white cursor-not-allowed">
                <div className="h-fit py-2 px-4 flex flex-col gap-1 w-full rounded-xl bg-linear-to-b from-[#E3DED8] to-[#D4E5F8] border border-[#8CA9CA]">
                  {/* heading  */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl">Object Detection</h2>
                    <div className="flex gap-5 text-md">
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img
                          className="w-4 aspect-square"
                          src={square}
                          alt=""
                        />
                        <p>Bounding Boxes</p>
                      </div>
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img className="w-4 aspect-square" src={hash} alt="" />
                        <p>Counts</p>
                      </div>
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img
                          className="w-4 aspect-square"
                          src={H_icon}
                          alt=""
                        />
                        <p>Tracking</p>
                      </div>
                    </div>
                  </div>
                  {/* below content  */}
                  <div>
                    <p className="font-light">
                      Identify objects and their positions with bounding boxes.
                    </p>
                  </div>
                </div>
                <div className="h-fit py-2 px-4 flex flex-col gap-4 w-full rounded-b-xl">
                  {/* heading  */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl">Classification</h2>
                    <div className="flex gap-5 text-md">
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img
                          className="w-4 aspect-square"
                          src={image_icon}
                          alt=""
                        />
                        <p>Image Labels</p>
                      </div>
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img
                          className="w-4 aspect-square"
                          src={filter}
                          alt=""
                        />
                        <p>Filtering</p>
                      </div>
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img className="w-4 aspect-square" src={tick} alt="" />
                        <p>Content Moderation</p>
                      </div>
                    </div>
                  </div>
                  {/* below content  */}
                  <div className="grid grid-cols-12">
                    <p className="font-light col-span-7">
                      Identify objects and their positions with bounding boxes.
                    </p>
                    <div className="col-span-5 flex">
                      <div className="w-1/2 h-full flex gap-2 font-light">
                        <div className="border-GlobalPrimary border-2 w-6 h-6 flex justify-center items-center rounded-full">
                          <div className="h-4 w-4 bg-GlobalPrimary rounded-full border"></div>
                        </div>
                        <span>Single Lead</span>
                      </div>
                      <div className="w-1/2 h-full flex gap-2 font-light">
                        <div className="border-GlobalPrimary border-2 w-6 h-6 flex justify-center items-center rounded-full"></div>
                        <span>Multi Lead</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex text-sm bg-GlobalPrimary w-fit h-fit py-[2px] px-2 rounded-md gap-3 justify-center items-center">
                  <p className="text-white">For Advanced Users</p>
                  <img className="w-6" src={question_circle} alt="" />
                </div>
                <div>
                  <p className="text-GlobalPrimary text-md">Coming Soon</p>
                </div>
              </div>
              <div className="row-span-4 min-h-fit overflow-y-auto rounded-xl relative bg-white cursor-not-allowed">
                <div className="h-fit py-2 px-4 flex flex-col gap-1 w-full border-b border-b-[#8E8E8E]">
                  {/* heading  */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl">Multimodal</h2>
                    <div className="flex gap-5 text-md">
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img
                          className="w-4 aspect-square"
                          src={comment_icon}
                          alt=""
                        />
                        <p>Prompts</p>
                      </div>
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img
                          className="w-4 aspect-square"
                          src={message_icon}
                          alt=""
                        />
                        <p>Pose Estimation</p>
                      </div>
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img
                          className="w-4 aspect-square"
                          src={image_icon}
                          alt=""
                        />
                        <p>Captions</p>
                      </div>
                    </div>
                  </div>
                  {/* below content  */}
                  <div>
                    <p className="font-light">
                      Describe images using text pairs.
                    </p>
                  </div>
                </div>
                <div className="h-fit py-2 px-4 flex flex-col gap-1 w-full">
                  {/* heading  */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl">Semantic Segmentaion</h2>
                    <div className="flex gap-5 text-md">
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3">
                        <img
                          className="w-4 aspect-square"
                          src={robotics_icon}
                          alt=""
                        />
                        <p>Robotics</p>
                      </div>
                      <div className="flex items-center rounded-xl p-2 bg-GlobalBg gap-3  ">
                        <img
                          className="w-4 aspect-square"
                          src={car_icon}
                          alt=""
                        />
                        <p>Autonomous Driving</p>
                      </div>
                    </div>
                  </div>
                  {/* below content  */}
                  <div>
                    <p className="font-light">
                      Assign every pixel to a label. Often inferior to instance
                      segmentation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row-span-2 grid grid-cols-12 gap-5 justify-center items-center">
                <button
                  className="col-span-6 border border-GlobalPrimary text-GlobalPrimary h-full max-h-14 rounded-full text-xl cursor-pointer"
                  type="reset"
                  onClick={() => {
                    reset();
                    navigate("/");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="col-span-6 border h-full max-h-14 rounded-full bg-GlobalPrimary text-white text-xl cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full col-span-5  rounded-xl bg-white h-11/12 shadow-xl">
              <p className="w-full px-4 text-lg">eg. Tumour Cells</p>
              <div
                className=" h-full w-full flex justify-center max-h-full overflow-auto rounded-2xl bg-cover bg-center bg-no-repeat bg-GlobalBg  scale-98"
                // style={{ backgroundColor: "#99119" }}
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
        </form>
      </div>
    </div>
  );
}

export default UploadPageDetails;
