import React, { useCallback, useEffect, useRef } from "react";
import Header from "../components/Header";
import image_icon from "../assets/images/image.svg";
import tick from "../assets/images/tick.svg";
import filter from "../assets/images/filter.svg";
import sample_icon from "../assets/images/sample_image.svg";
import { useState } from "react";
import { annotations } from "../utils/Annotationsample";
import Modal from "../components/Modal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import sample_image from "../assets/images/sample_image.svg";
import scale_icon from "../assets/images/scale_icon.svg";
import next_prev_btn_icon from "../assets/images/next_prev_btn_icon.svg";
import { useDrag } from "../hooks/useDrag";
import open_btn_icon from "../assets/images/bottom_panel_close.svg";
import radio_btn_icon from "../assets/images/radio_btn_icon.svg";
import { useNavigate } from "react-router-dom";
import { Rect, Stage, Layer, Image as KonvaImage, Text } from "react-konva";
import ValidationRunDataChip from "./ValidationRunDataChip";
import { useModelReportData } from "../TankStackQuery/UserQueryInjection";
import ModelStatusComponent from "../components/ModelStatusComponent";
import { useTrainModelStore } from "../zustand/trainModelStore";
import {
  DeployBoxWithoutBottomBox,
  DeployLoaderBox,
  InfinityBoxLoader,
} from "../components/Loader";
import AxiosInstance from "../axios/AxiosInstance";
import { useUserData } from "../zustand/userStore";

const ValidModelReport = () => {
  // annotation
  const { username, user_id } = useUserData();
  const { ai_model_name, project_name, data_type, creation_date } =
    useTrainModelStore();
  const {
    data: ValidModalReportData,
    isFetching,
  } = useModelReportData();
  const imageRef = useRef(null);
  const [imageElement, setImageElement] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imageLoadError, setImageLoadError] = useState(null);

  const navigate = useNavigate();
  const draggableRef = useRef(null);
  const containerRef = useRef(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [ReviewModal, setReviewModal] = useState(false);
  const [isApproveAndPublish, setIsApproveAndPublish] = useState(false);

  const { position, handleMouseDown } = useDrag({
    ref: draggableRef,
    containerRef: containerRef,
  });

  // konva state
  const [rectangles, setRectangles] = useState([]);

  const [ImagesData, setImagesData] = useState([
    {
      url: sample_image,
      message: "image_1",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 100,
          y: 120,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 650,
          y: 100,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
    {
      url: sample_image,
      message: "image_2",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 20,
          y: 220,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 50,
          y: 180,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
    {
      url: sample_image,
      message: "image_3",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 20,
          y: 220,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 50,
          y: 180,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
    {
      url: sample_image,
      message: "image_4",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 20,
          y: 220,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 50,
          y: 180,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
    {
      url: sample_image,
      message: "image_5",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 20,
          y: 220,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 50,
          y: 180,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
    {
      url: sample_image,
      message: "image_5",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 20,
          y: 220,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 50,
          y: 180,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
    {
      url: sample_image,
      message: "image_5",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 20,
          y: 220,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 50,
          y: 180,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
    {
      url: sample_image,
      message: "image_5",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 20,
          y: 220,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 50,
          y: 180,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
    {
      url: sample_image,
      message: "image_5",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 20,
          y: 220,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 50,
          y: 180,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
    {
      url: sample_image,
      message: "image_5",
      annotations: [
        {
          id: "rect1",
          type: "rectangle",
          x: 20,
          y: 220,
          width: 200,
          height: 150,
          stroke: "#E53E3E",
          strokeWidth: 3,
          fill: "rgba(229, 62, 62, 0.25)",
          text: "Region A",
          label: "Tumor Region",
          draggable: true,
        },
        {
          id: "text1",
          type: "text",
          x: 50,
          y: 180,
          width: 180,
          height: 120,
          text: "Important Note",
          fill: "#38A169",
          fontSize: 22,
          label: "Tumor Region",
          draggable: true,
        },
      ],
    },
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handelNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      return prevIndex >= ImagesData.length - 1 ? 0 : prevIndex + 1;
    });
  };
  const handelPrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      return prevIndex <= 0 ? ImagesData.length - 1 : prevIndex - 1;
    });
  };

  // -----------------------------------------------

  useEffect(() => {
    // Update rectangles when current image changes
    if (ImagesData && ImagesData[currentImageIndex]) {
      setRectangles(ImagesData[currentImageIndex].annotations || []);
    } else {
      setRectangles([]); // Or initialize with default annotations
    }
  }, [currentImageIndex, ImagesData]);

  useEffect(() => {
    const img = new window.Image();
    img.src = ImagesData[currentImageIndex].url;
    img.onload = () => {
      setImageElement(img);
    };
  }, [currentImageIndex]);

  useEffect(() => {
    if (!IsModalOpen) return;

    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateSize(); // Run once on open

    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [IsModalOpen]);

  const handelApproveAndPublish = async () => {
    try {
      setIsApproveAndPublish(true);

      const resp = await AxiosInstance.post("/deploy_publish_model", {
        model_id: ai_model_name,
        user_id: user_id,
        project_name: project_name,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsApproveAndPublish(false);
        navigate("/");
      }, 6000);
    }
  };

  if (isFetching) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full  backdrop-blur-sm   bg-opacity-50 flex justify-center items-center z-50 bg-[#c5dffaa6]">
          <div className="w-full h-screen flex items-center justify-center">
            <InfinityBoxLoader />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isApproveAndPublish && (
        <>
          <div className="fixed top-0 left-0 w-full h-full  backdrop-blur-sm   bg-opacity-50 flex justify-center items-center z-50 bg-[#e8e8e8]">
            <div className="w-full absolute top-0">
              <Header clx={"py-4"} />
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <DeployBoxWithoutBottomBox />
            </div>
            <h1 className="text-GlobalPrimary absolute top-[80%] text-2xl">
              Please wait.... we are publishing your model
            </h1>
          </div>
        </>
      )}
      <div className="h-[100dvh] w-full bg-GlobalBg flex flex-col">
        {/* Header */}
        <div className="grid grid-rows-1">
          <Header clx={"py-5"} />
        </div>

        {/* Action Bar */}
        <div className="bg-white flex items-center justify-between border-b px-4 py-3">
          <p className="text-2xl text-GlobalPrimary font-medium">
            Model Training Details
          </p>
          <div className="flex gap-3">
            {/* <button className="border border-GlobalPrimary text-GlobalPrimary px-4 py-2 rounded-full cursor-pointer">
              Retrain Model
            </button> */}

            <button
              className="bg-GlobalPrimary text-white px-4 py-2 rounded-full cursor-pointer"
              onClick={() => {
                handelApproveAndPublish();
              }}
            >
              Approve & Publish
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 bg-white grid grid-cols-12 gap-2 p-2  overflow-hidden ">
          {/* Left Section */}
          <div className="col-span-6 flex flex-col gap-2 overflow-y-auto pr-2">
            {/* Model Details + Classification */}
            <div className="p-1  rounded-xl ">
              <h1 className="text-xl font-light mb-4">
                Model Performance Statistics:
              </h1>
              <div className="flex justify-between gap-4">
                <ModelStatusComponent
                  value={
                    ValidModalReportData?.requested_metrics?.training
                      ?.model_recall
                  }
                  label={"Modal Accuracy"}
                />
                <ModelStatusComponent
                  value={ValidModalReportData?.requested_metrics?.training?.mAP}
                  label={"Modal Map"}
                />
                <ModelStatusComponent
                  value={
                    ValidModalReportData?.requested_metrics?.training
                      ?.model_precision
                  }
                  label={"Model Precision"}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {/* Info Section */}
              <div className="grid grid-cols-2 place-content-center gap-4">
                {/* {[
                  ["Model name:", "Lorem Ipsum Dolor Sit"],
                  ["Project Name:", "Lorem Ipsum Dolor Sit"],
                  ["Data Type:", "Lorem Ipsum Dolor Sit"],
                  ["Creation Date:", "dd/mm/yy"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="font-medium text-lg">{label}</p>
                    <p className="text-md font-light">{value}</p>
                  </div>
                ))} */}
                <div>
                  <p className="font-medium text-lg">Model name:</p>
                  <p className=" text-md font-light">{ai_model_name}</p>
                </div>
                <div>
                  <p className="font-medium text-lg">Project Name:</p>
                  <p className="text-md font-light">{project_name}</p>
                </div>
                <div>
                  <p className="font-medium text-lg">Data Type:</p>
                  <p className="text-md font-light">{data_type}</p>
                </div>
                <div>
                  <p className="font-medium text-lg">Creation Date:</p>
                  <p className="text-md font-light">{creation_date}</p>
                </div>
              </div>

              {/* Classification Legend */}

              <div className="flex flex-col gap-4">
                <p className="text-center mr-5 font-medium text-lg">
                  Classification:
                </p>
                {[
                  ["Class name 1", "bg-yellow-400"],
                  ["Class name 2", "bg-green-200"],
                  ["Class name 3", "bg-red-400"],
                ].map(([name, color], idx) => (
                  <div
                    key={idx}
                    className="w-2/3 self-end bg-[#CCDDF1] px-2 py-1 flex justify-between items-center rounded-md"
                  >
                    <span className="flex gap-2 items-center">
                      <span
                        className={`w-4 h-4 border border-black ${color} rounded-sm`}
                      />
                      <span>{name}</span>
                    </span>
                    <span>00</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Classification Info */}
            <p className=" text-xl font-light">Project Type</p>
            <div className="border border-[#8CA9CA] rounded-xl bg-gradient-to-b from-[#E2DEDA] to-[#D5E5F6] p-3">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-medium">Classification</h2>
                <div className="flex gap-3">
                  {[image_icon, filter, tick].map((icon, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-GlobalBg rounded-xl"
                    >
                      <img src={icon} alt="icon" className="w-4 h-4" />
                      <p>
                        {
                          ["Image Labels", "Filtering", "Content Moderation"][
                            idx
                          ]
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm font-light w-full flex justify-between">
                Identify objects and their positions with bounding boxes.
                <span className="flex gap-2 text-lg whitespace-nowrap">
                  <img src={radio_btn_icon} width={22} alt="icon" />
                  Single Lead
                </span>
              </p>
            </div>

            {/* Uploaded Images Section */}
            {/* <div className="border rounded-2xl overflow-hidden flex flex-col">
              <h1 className="bg-gradient-to-b from-[#E2DEDA] to-[#D5E5F6] px-4 py-2 text-lg font-semibold">
                Uploaded Images
              </h1>
              <div className="grid grid-cols-4 gap-4 p-4 max-h-[25rem] overflow-y-auto">
                {ImagesData.map((val, index) => (
                  <p className="w-full relative">
                    <button
                      className="absolute top-1 right-1 cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(true);
                        setCurrentImageIndex(index);
                      }}
                    >
                      <img src={scale_icon} width={35} alt="icon" />
                    </button>
                    <img
                      key={index}
                      src={val.url}
                      alt="Sample"
                      className="w-full max-w-[400px]"
                    />
                  </p>
                ))}
              </div>
            </div> */}
          </div>

          {/* ----------------------------------------------------------------------------Right Section--------------------------------------------------------------------------------- */}
          <div className="col-span-6 flex flex-col gap-2 overflow-y-auto pl-1">
            {/* Model Stats */}
            {/* <div className="p-1  rounded-xl ">
              <h1 className="text-xl font-light mb-4">
                Model Performance Statistics:
              </h1>
              <div className="flex justify-between gap-4">
                {[
                  ["92%", "Modal Accuracy"],
                  ["52%", "Modal Map"],
                  ["42%", "Model Precision"],
                ].map(([value, label], idx) => (
                  <div
                    key={idx}
                    className="min-w-[25%] flex flex-col items-center gap-1 px-2 py-8 border border-GlobalLightBlue rounded-2xl  bg-gradient-to-b from-[#DDD6CE] to-[#D4E5F8]"
                  >
                    <div className="h-28 w-28 flex items-center justify-center border rounded-full text-2xl font-bold bg-white">
                      {value}
                    </div>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Placeholder for next section */}
            <div className="h-fit  rounded-xl  grid grid-cols-2 place-content-start gap-x-1">
              <h2 className="text-lg font-medium mb-2 col-span-2">
                Model Accuracy & Precision
              </h2>
              <div className="border rounded-xl p-2 h-50">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={
                      ValidModalReportData?.requested_metrics?.validation
                        ?.f1_score_vs_IOU_threshold
                    }
                    margin={{
                      left: -10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="f1_score" tick={{ fontSize: 10 }} dx={0} />
                    <YAxis tick={{ fontSize: 10 }} dx={-20} />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="iou_threshold"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="f1_score"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="border rounded-xl p-2 col-span-1 h-50">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={
                      ValidModalReportData?.requested_metrics?.validation
                        ?.mAP_vs_IOU_threshold
                    }
                    margin={{
                      left: -10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="iou_threshold"
                      tick={{ fontSize: 10 }}
                      dx={0}
                    />
                    <YAxis tick={{ fontSize: 10 }} dx={-20} />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="iou_threshold"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="mAP"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="h-fit  rounded-xl  grid grid-cols-2 place-content-start gap-x-1">
              <div className="border rounded-xl p-2 h-50">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={
                      ValidModalReportData?.requested_metrics?.validation
                        ?.mAP_vs_IOU_threshold
                    }
                    margin={{
                      left: -10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} dx={0} />
                    <YAxis tick={{ fontSize: 10 }} dx={-20} />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="iou_threshold"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="mAP"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="border rounded-xl p-2 col-span-1 h-50">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    width={500}
                    height={200}
                    data={
                      ValidModalReportData?.requested_metrics?.validation
                        ?.f1_score_vs_IOU_threshold
                    }
                    //    syncId={"anyId"}
                    margin={{
                      top: 20,
                      right: 30,
                      left: -10,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} dx={0} />
                    <YAxis tick={{ fontSize: 10 }} dx={-20} />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="iou_threshold"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="f1_score"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="h-96  grid grid-cols-8 place-content-start gap-x-1  w-full  border border-[#8CA9CA] rounded-xl overflow-hidden ">
              <h2 className="bg-gradient-to-b from-[#E2DEDA] to-[#D5E5F6] p-3 col-span-8 h-12 rounded-t-xl text-GlobalPrimary">
                Validate Run Data
              </h2>
              <div className="w-full col-span-2 p-2  overflow-y-auto">
                <div className="h-full w-full max-h-[18rem] border border-GlobalLightBlue  p-1 rounded-2xl overflow-hidden">
                  <div className="h-full w-full    p-1 rounded-2xl overflow-y-auto flex flex-col gap-2 scroll-hide">
                    {ImagesData?.map((val, index) => (
                      <p className="w-full relative">
                        <button
                          className="absolute top-1 right-1 cursor-not-allowed "
                          // onClick={() => {
                          //   setIsModalOpen(true);
                          //   setCurrentImageIndex(index);
                          // }}
                        >
                          <img src={scale_icon} width={30} alt="icon" />
                        </button>
                        <img
                          key={index}
                          src={val.url}
                          alt="Sample"
                          className="w-full max-w-[400px]"
                        />
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full col-span-3 ">
                <div className="w-full h-full  flex flex-col justify-between py-2">
                  <div className="w-full flex flex-col item-start ">
                    <p className="font-normal">AI Verdict:</p>
                    <p className="font-light">6 of 8 images annotation</p>
                  </div>
                  <div className="w-full flex flex-col item-start ">
                    <p className="font-normal">Key Findings:</p>
                    <p className="font-light ">
                      higher class 2 percentage found in images 4,5,6,7,8,9
                    </p>
                  </div>
                  <div className="w-full flex flex-col item-start ">
                    <p className="font-normal">Slide Summary:</p>
                    <p className="font-light">
                      8 images analysed 56 regions of interest detected
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-3 ">
                <div className="flex flex-col justify-between">
                  <div className="h-14  w-full p-2 flex flex-col gap-2">
                    <ValidationRunDataChip />
                    <ValidationRunDataChip />
                    <ValidationRunDataChip />

                    {/* <span className="fle flex-col ">
                        <span>Area/Size</span>
                        <span>20</span>
                      </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={IsModalOpen}
        onClose={closeModal}
        OuterParentClass={"w-full h-[85dvh] relative "}
        WindowSize={" min-w-[85%] "}
      >
        <div className="w-full flex flex-col  h-full place-content-start gap-2 ">
          <div className="col-span-12 grid grid-cols-3 ">
            <span className="col-span-1 w-full flex items-start   gap-4 ">
              <button
                className="cursor-pointer"
                onClick={() => handelPrevImage(currentImageIndex)}
              >
                <img
                  src={next_prev_btn_icon}
                  alt="icon"
                  className="rotate-180"
                />
              </button>
              <span className="text-xl">
                {currentImageIndex + 1}/{ImagesData?.length}
              </span>
              <button
                className="cursor-pointer"
                onClick={() => handelNextImage(currentImageIndex)}
              >
                <img src={next_prev_btn_icon} alt="icon" />
              </button>
            </span>
            <p className="col-span-1 w-full text-center text-3xl text-GlobalPrimary ">
              Upload Image Name
            </p>
          </div>
          {/*  */}
          <div
            className="col-span-12  w-full h-11/12 bg-no-repeat  bg-cover bg-center rounded-4xl  relative"
            // style={{
            //   backgroundImage: `URL(${ImagesData[currentImageIndex]?.url})`,
            // }}
            ref={containerRef}
          >
            {dimensions.height && dimensions.width && imageElement ? (
              <Stage
                // ref={stageRef}
                width={dimensions.width}
                height={dimensions.height - 5}
                // scaleX={scale}
                // scaleY={scale}
                // draggable={isPanning}
                // onMouseDown={handleMouseDown}
                // onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}
                draggable
                style={{
                  cursor: "grab",
                  maxWidth: "100%",
                  overflow: "hidden",
                  border: "1px solid black",
                }}
              >
                <Layer>
                  <KonvaImage
                    image={imageElement}
                    crop={33}
                    width={dimensions.width}
                    height={dimensions.width}
                  />
                  {ImagesData[currentImageIndex]?.annotations?.map((r, i) => {
                    return (
                      <>
                        <Rect
                          key={i}
                          x={r.x}
                          y={r.y}
                          width={r.width}
                          height={r.height}
                          stroke={"red"}
                          strokeWidth={4}
                        />
                        {/* {r.label && (
                          <Text
                            x={r.x + 4} // Small offset inside the box
                            y={r.y + 4}
                            text={r.label}
                            fontSize={26}
                            fill="red"
                            fontStyle="bold"
                          />
                        )} */}
                      </>
                    );
                  })}
                </Layer>
              </Stage>
            ) : (
              <div className="h-12">Failed to load image</div>
            )}
            <div
              className={`absolute top-10 right-4  w-[15dvw] transition-[max-height]  ${
                ReviewModal ? "max-h-[5dvh]" : "max-h-[48dvh]"
              } rounded-2xl border border-GlobalLightBlue overflow-hidden bg-white`}
              ref={draggableRef}
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                willChange: "transform",
                cursor: "grab",
                top: 0,
                left: 0,
              }}
              onMouseDown={handleMouseDown}
            >
              <h1
                className={`h-12 flex items-center justify-between px-4  rounded-t-2xl  w-full cursor-grab bg-gradient-to-b from-[#E2DEDA] to-[#D5E5F6] shadow-3xl shadow-GlobalBg text-lg `}
              >
                Review Model Name
                <button
                  className="px-2 cursor-pointer"
                  onClick={() => setReviewModal((prev) => !prev)}
                >
                  <img src={open_btn_icon} alt="icon" />
                </button>
              </h1>
              <div className="w-full flex flex-col gap-4 px-2">
                <div className="flex flex-col ">
                  <span className="font-normal text-xl">Data Type</span>
                  <span className="font-light text-lg">
                    Lorem Ipsum Dolor Sit
                  </span>
                </div>
                <div className="flex flex-col ">
                  <span className="font-normal text-xl">Class</span>
                  <span className="font-light text-lg">
                    Lorem Ipsum Dolor Sit
                  </span>
                </div>

                <div className="flex flex-col ">
                  <span className="font-normal text-xl">Project Type</span>
                  <span className="font-light text-lg">
                    Lorem Ipsum Dolor Sit
                  </span>
                </div>

                <div className="w-full flex flex-col items-start  justify-start gap-4 pb-4">
                  <p className="text-center font-medium text-lg self-start">
                    Classification:
                  </p>
                  {[
                    ["Class name 1", "bg-yellow-400"],
                    ["Class name 2", "bg-green-200"],
                    ["Class name 3", "bg-red-400"],
                  ].map(([name, color], idx) => (
                    <div
                      key={idx}
                      className="w-full self-start bg-[#CCDDF1] px-2 py-1 flex justify-between items-center rounded-md"
                    >
                      <span className="flex gap-2 items-center">
                        <span
                          className={`w-4 h-4 border border-black ${color} rounded-sm`}
                        />
                        <span>{name}</span>
                      </span>
                      <span>00</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </Modal>
    </>
  );
};

export default ValidModelReport;
