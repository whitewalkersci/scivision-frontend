import React, { useRef, useState, useEffect, useCallback } from "react";
import { Stage, Layer, Image as KonvaImage, Rect } from "react-konva";
import { useLocation } from "react-router-dom";
import brightness_square from "../assets/images/brightness_square.svg";
import minus_square from "../assets/images/minus_square.svg";
import plus_square from "../assets/images/plus_square.svg";
import screen_size_square from "../assets/images/screen_size_square.svg";
import draw_icon_square from "../assets/images/draw_icon_square.svg";
import hand_icon_square from "../assets/images/hand_icon_square.svg";
import bounding_box_icon_square from "../assets/images/bounding_box_icon_square.svg";
import arrow_circle_square from "../assets/images/arrow_circle_square.svg";
import magic_wand_square from "../assets/images/magic_wand_square.svg";
import undo_icon_square from "../assets/images/undo_icon_square.svg";
import redo_icon_square from "../assets/images/redo_icon_square.svg";
import disable_icon_square from "../assets/images/disable_icon_square.svg";
import AxiosInstance from "../axios/AxiosInstance";
import { useTrainModelStore } from "../zustand/trainModelStore";
import mainIcon from "../assets/images/main_icon_white.svg";
import alert from "../assets/images/alert.svg";
import profile from "../assets/images/profile.svg";
import question_mark from "../assets/images/question_mark.svg";
import greenTickCircle from "../assets/images/GreenTickCircle.svg";
import panel_close from "../assets/images/panel_close.svg";
import close_icon from "../assets/images/close_icon.svg";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../zustand/userStore";
import circle_left from "../assets/images/circle_left.svg";
import circle_right from "../assets/images/circle_right.svg";
import Header from "../components/Header";
import { toast } from "sonner";
import { SmallSpinner } from "../components/Loader";
import { InfinityLoader } from "../components/Loader";
function TrainPage() {
  const { user_id } = useUserData();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const { project_name, ai_model_name, classname } = useTrainModelStore();
  const [konvaImage, setKonvaImage] = useState(null);
  const [rangeValue, setRangeValue] = useState(0);
  const location = useLocation();
  const [images, setImages] = useState(location.state?.images || []);
  const class_names = classname;
  const [totalImages, setTotalImages] = useState(
    location.state?.images.length || 0
  );
  const [showBrightness, setShowBrightness] = useState(false);
  const [openPanel, setOpenPanel] = useState(true);
  const [openPanel2, setOpenPanel2] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rectangles, setRectangles] = useState(
    location.state?.rectangles || []
  );
  const [newRect, setNewRect] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scale, setScale] = useState(1);
  const [isPanning, setIsPanning] = useState(true);
  const imageRef = useRef();
  const stageRef = useRef();

  const [selectedClassname, setSelectedClassName] = useState(0);

  const brightColors = [
    "#FF5733", // Bright Orange
    "#FF69B4", // Hot Pink
    "#FFD700", // Gold
    "#00FFFF", // Aqua
    "#ADFF2F", // Green Yellow
    "#00FF7F", // Spring Green
    "#FFA07A", // Light Salmon
    "#7CFC00", // Lawn Green
    "#FFB6C1", // Light Pink
    "#FF00FF", // Fuchsia / Magenta
    "#87CEFA", // Light Sky Blue
    "#FFFF00", // Yellow
    "#40E0D0", // Turquoise
    "#E0FFFF", // Light Cyan
    "#FF1493", // Deep Pink
    "#98FB98", // Pale Green
    "#F0E68C", // Khaki
    "#DA70D6", // Orchid
    "#FFE4B5", // Moccasin
    "#FFC0CB", // Pink
  ];

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (images[currentIndex]) {
      setRectangles(images[currentIndex].annotations || []);
    }
  }, [currentIndex, images]);

  useEffect(() => {
    const imgData = images[currentIndex]?.src;
    if (!imgData) return;

    const img = new window.Image();
    img.src = imgData;
    img.onload = () => {
      setKonvaImage(img);
      setRectangles(images[currentIndex].annotations || []);
    };
  }, [currentIndex, images]);

  const getRelativePointerPosition = useCallback(() => {
    const stage = stageRef.current;
    const pointer = stage.getPointerPosition();
    return {
      x: (pointer.x - stage.x()) / scale,
      y: (pointer.y - stage.y()) / scale,
    };
  }, [scale]);

  const handleMouseDown = (e) => {
    if (!images[currentIndex] || isPanning) return;
    const pos = getRelativePointerPosition();
    setNewRect({ x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !newRect || isPanning) return;
    const pos = getRelativePointerPosition();
    setNewRect({ ...newRect, x2: pos.x, y2: pos.y });
  };

  const handleMouseUp = () => {
    if (newRect) {
      const x1 = Math.min(newRect.x1, newRect.x2);
      const y1 = Math.min(newRect.y1, newRect.y2);
      const x2 = Math.max(newRect.x1, newRect.x2);
      const y2 = Math.max(newRect.y1, newRect.y2);

      if (Math.abs(x2 - x1) > 1 && Math.abs(y2 - y1) > 1) {
        const rect = { x1, y1, x2, y2, selectedClassname };
        const updatedRects = [...rectangles, rect];
        const updatedImages = [...images];
        updatedImages[currentIndex].annotations = updatedRects;
        setRectangles(updatedRects);
        setImages(updatedImages);
      }

      console.log(rectangles);
      console.log(images);
    }
    console.log(rectangles);
    setNewRect(null);
    setIsDrawing(false);
  };

  function convertAnnotations(annotation) {
    return annotation.map((ann) => [
      ann.x1,
      ann.y1,
      ann.x2,
      ann.y2,
      ann.selectedClassname,
    ]);
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await AxiosInstance.post("/train", {
        project_name: project_name,
        endpoint_display_name: "endpoint_display_name_Demo",
        training_budget_milli_node_hours: 20000,
        user_id: user_id,
        model_display_name: ai_model_name,
        classes: classname,
        dataset_display_name: "dataset_display_name_Demo",
        data_type: "images",
      });
      console.log("uploadannotations", res);
      if (res.status === 200 || res.status === 202) {
        setLoading(false);
        setShowUploadPopup(true);
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
      // setShowUploadPopup(true);
      console.log(err);
    }
  };

  // const handleSubmit = async () => {
  //   const annotations = {};
  //   images.forEach((image) => {
  //     annotations[image.name] = convertAnnotations(image.annotations);
  //   });
  //   console.log(annotations);

  //   try {
  //     const res = await AxiosInstance.post("/upload-annotations", {
  //       user_id: user_id,
  //       project_name: project_name,
  //       class_names: class_names,
  //       annotations: annotations,
  //       bucket_name: "bucket1",
  //     });
  //     console.log("uploadannotations", res);
  //     setShowUploadPopup(true);
  //   } catch (err) {
  //     setShowUploadPopup(true);
  //     console.log(err);
  //   }
  // };

  const handleUndo = () => {
    if (rectangles.length > 0) {
      const updatedRects = rectangles.slice(0, -1);
      setRectangles(updatedRects);
      const updatedImages = [...images];
      updatedImages[currentIndex].annotations = updatedRects;
      setImages(updatedImages);
    }
  };

  // const handleNext = () => {
  //   if (currentIndex < images.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //   }
  // };

  const handleNext = () => {
    const nextIndex = Math.min(currentIndex + 1, images.length - 1);

    if (imageRefs.current[nextIndex]) {
      imageRefs.current[nextIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }

    if (currentIndex < images.length - 1) {
      setCurrentIndex(nextIndex);
    }
  };

  // const handlePrev = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   }
  // };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);

    if (imageRefs.current[prevIndex]) {
      imageRefs.current[prevIndex].scrollIntoView({
        behavior: "smooth",
        block: "center", // or 'center' or 'start'
      });
    }

    if (currentIndex > 0) {
      setCurrentIndex(prevIndex);
    }
  };

  const handleZoom = (direction) => {
    const factor = direction === "in" ? 1.1 : 0.9;
    setScale((prev) => Math.max(0.1, prev * factor));
  };
  const handleZoomOut = () => {
    setScale(1);
  };
  const togglePanMode = () => {
    setIsPanning((prev) => !prev);
  };

  const toggleHandMode = () => {
    setIsPanning(true);
  };

  const toggleMarkMode = () => {
    setIsPanning(false);
  };

  const currentImage = images[currentIndex]?.src;

  const HeaderUpload = () => {
    return (
      <div className="row-span-1 bg-GlobalPrimary flex justify-between px-8">
        <div className="h-full w-3/12  lg:w-3/12 flex justify-center items-center ">
          <img className="w-full md:h-10" src={mainIcon} alt="" />
        </div>
        <div className="h-full w-3/12 xl:w-2/12 flex justify-evenly ">
          <img className="w-10" src={question_mark} />
          <img className="w-10" src={alert} />
          <img className="w-10" src={profile} />
        </div>
      </div>
    );
  };

  const UploadPopup = () => {
    return (
      <div className="h-full w-full z-30 absolute bg-[#061423A6] backdrop-blur-[10px] flex justify-center items-center">
        <div className="w-7/12 bg-GlobalBg h-3/6 rounded-3xl p-10 relative flex flex-col justify-center items-center">
          <div className="w-6/12 h-full flex flex-col justify-evenly items-center">
            <h1 className="text-4xl text-GlobalPrimary font-semibold">
              Model Training in Progress
            </h1>
            <p className="text-3xl text-GlobalPrimary font-normal">
              Model Name: {ai_model_name}
            </p>
            <InfinityLoader />
            <div className="w-fit px-15 py-2 rounded-xl text-2xl bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex justify-center items-center">
              Status: In Progress
            </div>
            <div>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="h-16 w-96 text-white text-2xl border rounded-full bg-GlobalPrimary cursor-pointer"
              >
                Back to Home
              </button>
            </div>
            <p className="text-2xl text-GlobalPrimary text-center">
              We will be training the model in background
            </p>
          </div>
        </div>
      </div>
    );
  };

  const CurrentPageHeader = () => {
    return (
      <div className="row-span-1 w-full grid grid-cols-12 px-10 min-h-20 h-10/12">
        <div className="col-span-7 flex w-full items-start justify-between xl:px-10 pt-2 xl:pb-1  xl:text-xl">
          {/* Step 1: Upload */}
          <div className="flex flex-col items-center text-center h-full relative">
            <img className="w-8 aspect-square" src={greenTickCircle} alt="" />
            <p className=" font-normal text-GlobalPrimary mt-1  text-nowrap absolute bottom-0">
              Upload
            </p>
          </div>

          {/* Progress Line */}
          {/* <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
                <div className="w-full border border-GlobalPrimary"></div>
              </div> */}
          <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
            <div className="w-full h-2 rounded-full bg-[#008C76]"></div>
          </div>
          <div className="flex flex-col items-center text-center relative h-full">
            <img className="w-8 aspect-square" src={greenTickCircle} alt="" />
            <p className=" font-semibold text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
              Vision of Interest
            </p>
          </div>

          {/* Progress Line */}
          <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
            <div className="w-full h-2 rounded-full bg-[#008C76]"></div>
          </div>

          {/* Step 3: Annotate */}
          <div className="flex flex-col items-center text-center relative h-full">
            <img className="w-8 aspect-square" src={greenTickCircle} alt="" />
            <p className=" font-normal text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
              Annotate
            </p>
          </div>

          {/* Progress Line */}
          <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
            <div className="w-full h-2 rounded-full bg-[#008C76]"></div>
          </div>

          {/* Step 4: Train */}
          <div className="flex flex-col items-center text-center relative h-full">
            <div className="w-8 h-8 border-[2px] border-GlobalPrimary rounded-full p-1">
              <div className="w-full aspect-square bg-GlobalPrimary rounded-full"></div>
            </div>
            <p className=" font-normal text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
              Train
            </p>
          </div>
        </div>

        <div className="col-span-5 h-full grid grid-cols-9 text-sm lg:text-lg xl:text-xl 2xl:text-2xl">
          <div className="col-span-5 xl:col-span-4 h-full flex justify-center items-center">
            <button
              onClick={() => {
                navigate("/");
              }}
              disabled={isLoading}
              className={`h-14  w-11/12 rounded-full text-GlobalPrimary border border-GlobalPrimary ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              } text-center`}
            >
              Abort Generation
            </button>
          </div>
          <div className="col-span-4 xl:col-span-5 h-full flex justify-center items-center">
            <button
              onClick={() => {
                // handleNext();
                handleSubmit();
              }}
              disabled={isLoading}
              className={`bg-GlobalPrimary h-14  w-11/12 rounded-full text-white ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              }  flex justify-center items-center`}
            >
              {isLoading ? <SmallSpinner /> : "Confirm and Train Model"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full grid grid-rows-11 bg-GlobalBg">
      {showUploadPopup && <UploadPopup />}
      <Header />
      <CurrentPageHeader />

      <div className="row-span-9">
        <div className=" h-full bg-GlobalBg">
          <div className="w-full h-full px-10 py-2 flex justify-center items-center space-y-4 relative">
            <div
              ref={containerRef}
              className=" w-full h-full overflow-hidden relative flex justify-center items-center md:min-w-xl xl:min-w-3xl rounded-3xl border-2 border-GlobalLightGrey"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            >
              {/* <div className="bg-white min-w-fit w-8/12 xl:w-5/12 2xl:w-4/12 h-16 border-2 absolute top-5 rounded-2xl z-20 right-5 border-[#BBBBBB] flex p-2 justify-between items-center overflow-auto gap-1">
                <img
                  // onClick={() => handleZoom("in")}
                  className="cursor-not-allowed h-10"
                  src={brightness_square}
                  alt=""
                />
                <img
                  onClick={() => handleZoom("in")}
                  className="cursor-pointer h-10"
                  src={plus_square}
                  alt=""
                />
                <img
                  onClick={() => handleZoom("out")}
                  className="cursor-pointer h-10"
                  src={minus_square}
                  alt=""
                />
                <img
                  className="cursor-pointer h-10"
                  onClick={handleZoomOut}
                  src={screen_size_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed h-10"
                  src={draw_icon_square}
                  alt=""
                />
                <img
                  className="cursor-pointer h-10"
                  // onClick={toggleHandMode}
                  src={hand_icon_square}
                  alt=""
                />
                <img
                  // onClick={toggleMarkMode}
                  className="cursor-not-allowed h-10"
                  src={bounding_box_icon_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed h-10"
                  // onClick={toggleMarkMode}
                  src={arrow_circle_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed h-10"
                  src={magic_wand_square}
                  alt=""
                />
                <img
                  onClick={handleUndo}
                  className="cursor-not-allowed h-10"
                  src={undo_icon_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed h-10"
                  src={redo_icon_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed h-10"
                  src={disable_icon_square}
                  alt=""
                />
              </div> */}
              <div className="bg-white w-2/10  max-h-3/5 h-fit  absolute top-5 rounded-2xl z-20 right-5 border-[#BBBBBB] flex justify-around">
                <div className="max-h-16 w-full  bg-gradient-to-b from-[#E3DED8] to-[#D4E5F8] rounded-t-2xl flex justify-between items-center p-4 absolute">
                  <p className="text-2xl">Review Model</p>
                  {openPanel2 ? (
                    <img
                      className="h-10 aspect-square cursor-pointer"
                      src={panel_close}
                      alt=""
                      onClick={() => {
                        setOpenPanel2(false);
                      }}
                    />
                  ) : (
                    <img
                      className="h-10 aspect-square cursor-pointer rotate-180"
                      src={panel_close}
                      alt=""
                      onClick={() => {
                        setOpenPanel2(true);
                      }}
                    />
                  )}
                </div>
                {openPanel2 && (
                  <div className="max-h-[30rem] h-fit w-full pt-16 flex flex-col pb-5 overflow-auto scrollbar-hidden">
                    <div className="w-full flex flex-col  p-2">
                      <div className="text-2xl flex flex-col gap-4 mb-4">
                        <div>
                          <p>Model name:</p>
                          <p className="text-xl">{ai_model_name}</p>
                        </div>
                        <div>
                          <p>Project name:</p>
                          <p className="text-xl">{project_name}</p>
                        </div>
                        <div>
                          <p>Data type:</p>
                          <p className="text-xl">Image</p>
                        </div>
                        <div>
                          <p>Class:</p>
                          <p>{class_names.join(", ")}</p>
                        </div>
                      </div>
                      <p className="text-2xl">Classification:</p>
                      <div className="w-full  max-h-64 h-fit gap-2 flex flex-col px-2 scrollbar-hidden overflow-y-auto">
                        {class_names?.map((cl, i) => (
                          <div
                            className="bg-[#CCDDF1] py-1 px-4 flex justify-between items-center cursor-pointer rounded-lg"
                            onClick={() => setSelectedClassName(i)}
                          >
                            <div className="flex gap-5 items-center">
                              <div
                                className="h-6 aspect-square"
                                style={{ backgroundColor: brightColors[i] }}
                              ></div>
                              <p className="text-xl">{cl}</p>
                            </div>
                            <div className="text-xl">
                              {
                                rectangles.filter(
                                  (r) => r.selectedClassname === i
                                ).length
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {currentImage &&
                dimensions.width > 0 &&
                dimensions.height > 0 && (
                  <Stage
                    ref={stageRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    scaleX={scale}
                    scaleY={scale}
                    draggable={isPanning}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    style={{
                      cursor: isPanning ? "grab" : "crosshair",
                      maxWidth: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Layer>
                      <KonvaImage image={konvaImage} ref={imageRef} />
                      {rectangles.map((r, i) => (
                        <Rect
                          key={i}
                          x={r.x1}
                          y={r.y1}
                          width={r.x2 - r.x1}
                          height={r.y2 - r.y1}
                          stroke={brightColors[r.selectedClassname]}
                          strokeWidth={4}
                        />
                      ))}
                      {newRect && (
                        <Rect
                          x={Math.min(newRect.x1, newRect.x2)}
                          y={Math.min(newRect.y1, newRect.y2)}
                          width={Math.abs(newRect.x2 - newRect.x1)}
                          height={Math.abs(newRect.y2 - newRect.y1)}
                          stroke={brightColors[selectedClassname]}
                          dash={[4, 4]}
                        />
                      )}
                    </Layer>
                  </Stage>
                )}
              <div className="max-h-full h-fit min-w-40 md:w-1/10 absolute bg-white left-10 top-5 rounded-t-xl rounded-b-xl">
                <div className="max-h-16 w-full  bg-gradient-to-b from-[#E3DED8] to-[#D4E5F8] rounded-t-2xl flex justify-between items-center py-4 px-3 absolute">
                  <p className="text-2xl">Images</p>
                  {openPanel ? (
                    <img
                      className="h-10 aspect-square cursor-pointer"
                      src={panel_close}
                      alt=""
                      onClick={() => {
                        setOpenPanel(false);
                      }}
                    />
                  ) : (
                    <img
                      className="h-10 aspect-square cursor-pointer rotate-180"
                      src={panel_close}
                      alt=""
                      onClick={() => {
                        setOpenPanel(true);
                      }}
                    />
                  )}
                </div>
                {openPanel && (
                  <div className="max-h-[30rem] xl:max-h-[35rem] 2xl:max-h-[40rem] h-fit overflow-y-scroll flex flex-col justify-start items-center py-5 gap-5 pt-18 scrollbar-hidden">
                    {[...images].map((image, index) => (
                      <img
                        key={index}
                        ref={(el) => (imageRefs.current[index] = el)}
                        className={`w-5/6 min-h-20 rounded-2xl ${
                          index === currentIndex ? "border-4" : ""
                        }`}
                        src={image.src}
                        alt=""
                        onClick={() => setCurrentIndex(index)}
                      />
                    ))}
                  </div>
                )}
                <div className="max-h-24 h-14 w-full bg-gradient-to-b bg-white rounded-b-xl flex justify-between items-center py-4 px-3">
                  <div>
                    <img
                      onClick={() => {
                        handlePrev();
                      }}
                      className="cursor-pointer h-8"
                      src={circle_left}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-xl text-GlobalPrimary">
                      <span>{currentIndex + 1}</span>
                      <span>/</span>
                      <span>{totalImages}</span>
                    </p>
                  </div>
                  <div>
                    <img
                      onClick={() => {
                        handleNext();
                      }}
                      className="cursor-pointer h-8"
                      src={circle_right}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainPage;
