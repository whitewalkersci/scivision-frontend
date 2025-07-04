import React, { useCallback, useEffect, useRef } from "react";
import Header from "../components/Header";
import image_icon from "../assets/images/image.svg";
import tick from "../assets/images/tick.svg";
import filter from "../assets/images/filter.svg";
import { useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Rect, Stage, Layer, Image as KonvaImage, Text } from "react-konva";
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../axios/AxiosInstance";
import { useModelReportData } from "../TankStackQuery/UserQueryInjection";
import ModelStatusComponent from "../components/ModelStatusComponent";
import { InfinityBoxLoader } from "../components/Loader";
import { useTrainModelStore } from "../zustand/trainModelStore";

const ModelReportPage = () => {
  // annotation
  const { model_id, project_name } = useParams();
  const {
    ai_model_name,
    project_name: project_store_name,
    data_type,
    creation_date,
  } = useTrainModelStore();
  const { data: ModelReportData, isPending } = useModelReportData({
    model_id,
    project_name,
  });

  const [imageElement, setImageElement] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const navigate = useNavigate();
  const draggableRef = useRef(null);
  const containerRef = useRef(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [ReviewModal, setReviewModal] = useState(false);
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
    // TODO: remove this useEffect and add this logic in single useEffect
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

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <InfinityBoxLoader />
      </div>
    );
  }

  return (
    <>
      <div className="h-[100dvh] w-full bg-GlobalBg flex flex-col">
        {/* Header */}
        <div className="grid grid-rows-1">
          <Header clx={"py-5"} />
        </div>

        {/* Action Bar */}
        <div className="bg-white flex items-center justify-between border-b px-4 py-3">
          <p className="text-2xl text-GlobalPrimary font-semibold">
            Model History
          </p>
          <div className="flex gap-3">
            <button
              className="border border-GlobalPrimary text-GlobalPrimary px-4 py-2 rounded-full cursor-pointer"
              onClick={() => navigate("/validatemodel")}
            >
              Validate Model
            </button>
            <button className="border border-GlobalPrimary text-GlobalPrimary px-4 py-2 rounded-full cursor-not-allowed">
              Retrain Model
            </button>
            <button className="bg-GlobalPrimary text-white px-4 py-2 rounded-full cursor-pointer">
              Publish Model
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 bg-white grid grid-cols-12 gap-2 p-2  overflow-hidden">
          {/* Left Section */}
          <div className="col-span-6 flex flex-col gap-2 overflow-y-auto pr-2">
            {/* Model Details + Classification */}
            <div className="grid grid-cols-2 gap-4">
              {/* Info Section */}
              <div className="flex flex-col gap-2">
                {/* {[
                  ["Model name:", "Lorem Ipsum Dolor Sit"],
                  ["Project Name:", "Lorem Ipsum Dolor Sit"],
                  ["Data Type:", "Lorem Ipsum Dolor Sit"],
                  ["Creation Date:", "dd/mm/yy"],
                ].map(([label, value]) => (
                 
                ))} */}
                <div>
                  <p className="font-medium text-lg">Model name:</p>
                  <p className=" text-md font-light">{ai_model_name}</p>
                </div>
                <div>
                  <p className="font-medium text-lg">Project Name:</p>
                  <p className="text-md font-light">{project_store_name}</p>
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
                <p className="text-center font-medium text-lg">
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
            <div className="border border-[#8CA9CA] rounded-xl bg-gradient-to-b from-[#E3DED8] to-[#D4E5F8] p-3">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Classification</h2>
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
                <span className="flex gap-2 text-lg">
                  <img src={radio_btn_icon} alt="icon" />
                  Single Lead
                </span>
              </p>
            </div>

            {/* Uploaded Images Section */}
            {/* <div className="border rounded-2xl overflow-hidden flex flex-col">
              <h1 className="bg-gradient-to-b from-[#E3DED8] to-[#D4E5F8] px-4 py-2 text-lg font-semibold">
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

          {/* Right Section */}
          <div className="col-span-6 flex flex-col gap-2 overflow-y-auto pl-1">
            {/* Model Stats */}
            <div className="p-1  rounded-xl ">
              <h1 className="text-xl font-light mb-4">
                Model Performance Statistics:
              </h1>
              <div className="flex justify-between gap-4">
                {/* {[
                  ["92%", "Modal Accuracy"],
                  ["52%", "Modal Map"],
                  ["42%", "Model Precision"],
                ].map(([value, label], idx) => (
                  <div
                    
                    className="min-w-[25%] flex flex-col items-center gap-1 px-2 py-8 border border-GlobalLightBlue rounded-2xl  bg-gradient-to-b from-[#DDD6CE] to-[#D4E5F8]"
                  >
                    <div className="h-28 w-28 flex items-center justify-center border rounded-full text-2xl font-bold bg-white">
                      {value}
                    </div>
                    <p>{label}</p>
                  </div>
                ))} */}
                <ModelStatusComponent
                  value={
                    ModelReportData?.requested_metrics.training?.model_recall
                  }
                  label={"Modal Accuracy"}
                />
                <ModelStatusComponent
                  value={ModelReportData?.requested_metrics.training?.mAP}
                  label={"Modal Map"}
                />
                <ModelStatusComponent
                  value={
                    ModelReportData?.requested_metrics.training?.model_precision
                  }
                  label={"Model Precision"}
                />
              </div>
            </div>

            {/* Placeholder for next section */}
            <div className="h-auto  rounded-xl  grid grid-cols-2  place-content-start gap-x-1 ">
              <h2 className="text-lg font-medium mb-2 col-span-2">
                Model Accuracy & Precision
              </h2>
              <div className="border rounded-xl p-2  min-h-[24rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={
                      ModelReportData?.requested_metrics?.training
                        ?.f1_score_vs_IOU_threshold
                    }
                    margin={{
                      left: -10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis tick={{ fontSize: 10 }} dx={0} />
                    <YAxis tick={{ fontSize: 10 }} dx={-20} />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="f1_score"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="iou_threshold"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="border rounded-xl p-2 col-span-1  min-h-[24rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={
                      ModelReportData?.requested_metrics?.training
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
            {/* <div className="h-96  rounded-xl  grid grid-cols-2 place-content-start gap-x-1">
              <h2 className="text-lg font-medium mb-2 col-span-2">
                Model Accuracy & Precision
              </h2>
              <div className="border rounded-xl p-2 h-50">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      left: -10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} dx={0} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} dx={-20} />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="precision"
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
                    data={chartData}
                    syncId="anyId"
                    margin={{
                      top: 20,
                      right: 30,
                      left: -10,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} dx={0} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} dx={-20} />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="precision"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div> */}
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
                  {ImagesData[currentImageIndex].annotations?.map((r, i) => {
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
                  {" "}
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

export default ModelReportPage;
