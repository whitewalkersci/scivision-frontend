import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Rect,
  Transformer,
  Group,
} from "react-konva";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useGCSUrlStore, useTrainModelStore } from "../zustand/trainModelStore";
import mainIcon from "../assets/images/main_icon_white.svg";
import alert from "../assets/images/alert.svg";
import profile from "../assets/images/profile.svg";
import question_mark from "../assets/images/question_mark.svg";
import close_white_icon from "../assets/images/close_white_icon.svg";
import next_prev_btn_icon from "../assets/images/next_prev_btn_icon.svg";
import panel_close from "../assets/images/panel_close.svg";
import { brightColors } from "../utils/Annotationsample";
import { Html } from "react-konva-utils";
import { useFetchAnnotationsData } from "../TankStackQuery/UserQueryInjection";
import { useUserData } from "../zustand/userStore";
import { FallingTileLoader } from "../components/Loader";
import AxiosInstance from "../axios/AxiosInstance";
import Konva from "konva";
import { useQuery } from "@tanstack/react-query";
import { fetchAnnotationsSimulation } from "../TankStackQuery/ApiCalls";
import Header from "../components/Header";

function ValidateModalAnnotation() {
  // Section 1: Hooks (Navigation, Location, State Stores)
  const navigate = useNavigate();
  const location = useLocation();
  const { username, user_id } = useUserData();
  const { project_name, ai_model_name, classname, setAnnotation } =
    useTrainModelStore();
  const { upload_data } = useGCSUrlStore();
  const [HandleSubmitLoading, setHandleSubmitLoading] = useState(false);
  // Section 2: Refs for direct DOM/Canvas access
  const containerRef = useRef(null);
  const shapeRefs = useRef(null);
  const transformerRef = useRef(null);

  // canva image ref
  const imageRef = useRef();
  const stageRef = useRef(null);

  // Section 3: Component State
  // --- UI & Panel State ---
  const [openPanel, setOpenPanel] = useState(true);
  const [openPanel2, setOpenPanel2] = useState(true);

  // --- Image & Data State ---
  const [images, setImages] = useState(location.state?.images || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [konvaImage, setKonvaImage] = useState(null);
  const [rectangles, setRectangles] = useState([]);
  const [ImageWidthAndHeight, setImageWidthAndHeight] = useState({
    originalHeight: 0,
    originalWidth: 0,
  });
  const [ImageIsLoading, setImageIsLoading] = useState(false);
  const [IsBrightnessLoading, setIsBrightnessLoading] = useState(false);
  const [brightness, setBrightness] = useState(0.1);

  // --- Canvas Interaction State ---
  // const [scaleId, setScaleId] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [isPanning, setIsPanning] = useState(false);

  // --- Annotation Drawing State ---
  const [newRect, setNewRect] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // --- Annotation Selection & Transformation State ---
  const [selectedId, setSelectedId] = useState(null);
  const [selectedClassname, setSelectedClassName] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // const [rangeValue, setRangeValue] = useState(0);
  // const [totalImages, setTotalImages] = useState(
  //   location.state?.images.length || 0
  // );

  // const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  // const [showBrightness, setShowBrightness] = useState(false);

  // const [ShowMenu, setShowMenu] = useState(false);

  // const [hoverMenu, setHoverMenu] = useState(null);
  // const menuHideTimer = useRef(null);
  // const [contextMenu, setContextMenu] = useState();

  const [ClassList, setClassList] = useState([]);
  // const { data: FetchData, isPending } = useFetchAnnotationsData({
  //   images,
  //   setImages,
  //   setRectangles,
  //   setClassList,
  // });
  const [InvalidImages, setInvalidImages] = useState([]);
  const {
    data: FetchData,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["fetchAnnotationsSimulation12", user_id, ai_model_name],
    queryFn: async () => {
      const resp = await fetchAnnotationsSimulation({
        user_id,
        project_name,
        model_id: ai_model_name,
        val_url_dic: upload_data,
      });

      console.log("fetchAnnotationsSimulation----------->", resp);
      setClassList(resp?.classes_list ?? []);

      const updatedImages = images.map((image) => {
        console.log("fetchAnnotationsSimulation----------->", image);
        let annotation = resp.detections[image?.name];
        console.log("annotation-------->", annotation);

        if (!annotation.error) {
          const updated_result = annotation.map((val, index) => {
            return {
              ...val,
              selectedClassname: val.class_id,
              id: `react-new-${Math.random().toString(36).substring(2, 9)}`,
            };
          });

          console.log("updated_result--------->", updated_result);

          if (!updated_result.length) {
            console.error("api annotation not found");
          }

          setRectangles(updated_result);
          return { ...image, annotations: [] };
        } else {
          const updated_result = {
            x1: "",
            y1: "",
            x2: "",
            y2: "",
            error: annotation.error,
            selectedClassname: "",
            id: `react-new-${Math.random().toString(36).substring(2, 9)}`,
          };

          console.log("updated_result--------->", updated_result);

          if (!updated_result.length) {
            console.error("api annotation not found");
          }

          setRectangles((prev) => {
            return [...prev, updated_result];
          });
          setInvalidImages((prev) => [...prev, image?.name]);
          return { ...image, annotations: updated_result };
        }
      });

      setImages(updatedImages);
      return resp;
    },
    retry: 0,
    refetchOnMount: "always",
  });

  const resetAndCenterView = useCallback((imageToCenter) => {
    // TODO:look for better approach to center image here and when you setImage() it cause it to rerender again
    const stage = stageRef.current;
    const container = containerRef.current;

    // Guard against running without necessary elements
    if (!stage || !container || !imageToCenter) {
      return;
    }

    const { width: containerWidth, height: containerHeight } =
      container.getBoundingClientRect();
    const imageWidth = imageToCenter.width;
    const imageHeight = imageToCenter.height;

    // Reset our React state for scale
    setScale(1);

    // Reset Konva's internal scale and position
    stage.scale({ x: 1, y: 1 });
    const centerX = (containerWidth - imageWidth) / 2;
    const centerY = (containerHeight - imageHeight) / 2;
    stage.position({ x: centerX, y: centerY });
    stage.batchDraw();
  }, []);

  useEffect(() => {
    if (!images || images.length === 0) {
      return;
    }

    const imgData = images[currentIndex];
    if (imgData?.src) {
      console.log("imageData", images);

      const img = new window.Image();
      img.src = imgData?.src;

      img.onload = () => {
        setKonvaImage(img);
        resetAndCenterView(img);
        setImageWidthAndHeight({
          originalHeight: img.originalHeight,
          originalWidth: img.originalWidth,
        });

        setRectangles((prevRects) => {
          const newRects = imgData.annotations || [];
          const hasChanged =
            JSON.stringify(prevRects) !== JSON.stringify(newRects);

          if (hasChanged && newRects?.length > 0) {
            return newRects;
          }

          return prevRects;
        });

        setSelectedId(null);
      };
    } else {
      setKonvaImage(null);
      setRectangles([]);
    }
  }, [currentIndex, images[currentIndex]?.src, resetAndCenterView]);

  const getRelativePointerPosition = useCallback(() => {
    const stage = stageRef.current;
    const pointer = stage.getPointerPosition();
    return {
      x: (pointer.x - stage.x()) / scale,
      y: (pointer.y - stage.y()) / scale,
    };
  }, [scale]);

  const handleMouseDown = (e) => {
    if (isPanning) {
      return;
    }
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
    if (isPanning) {
      setIsDrawing(false); // Ensure drawing state is reset
      setNewRect(null);
      return;
    }

    if (newRect) {
      const x1 = Math.min(newRect.x1, newRect.x2);
      const y1 = Math.min(newRect.y1, newRect.y2);
      const x2 = Math.max(newRect.x1, newRect.x2);
      const y2 = Math.max(newRect.y1, newRect.y2);
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y2 - y1);
      if (width < 15 || height < 15) {
        // Cancel annotation
        setIsDrawing(false);
        setNewRect(null);
        return;
      }
      if (Math.abs(x2 - x1) > 1 && Math.abs(y2 - y1) > 1) {
        const rect = {
          id: `react-new-${Date.now()}`,
          x1,
          y1,
          x2,
          y2,
          selectedClassname,
        };
        const updatedRects = [...rectangles, rect];
        const updatedImages = [...images];
        updatedImages[currentIndex].annotations = updatedRects;
        setRectangles(updatedRects);
        // setImages(updatedImages);
        setTimeout(() => {
          setSelectedId(rect.id);
        }, 500);
      }
    }
    console.log(rectangles);
    setIsDrawing(false);
    setNewRect(null);
  };

  // const handleSubmit = async () => {

  //   console.log();
  //   const annotations = {};
  //   images.forEach((image) => {
  //     annotations[image.name] = convertAnnotations(image.annotations);
  //   });
  //   console.log(annotations);

  //   try {
  //     console.log("hello");
  //     const res = await AxiosInstance.post("/upload-annotations", {
  //       project_name: project_name,
  //       class_names: class_names,
  //       annotations: annotations,
  //       bucket_name: "bucket1",
  //       folder_name: "newFolder",
  //     });
  //     console.log("uploadannotations", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleSubmit = async () => {
  //   navigate("/train", {
  //     state: { images: images, rectangles: rectangles },
  //   });
  // };

  // -=---------------------------------------------------
  const convertToFinalAnnotations = (
    annotation,
    displayedImageNode,
    originalWidth,
    originalHeight
  ) => {
    console.log("annotations ------>", annotation);

    if (!displayedImageNode || !originalWidth || !originalHeight) {
      console.error("Conversion failed: Missing critical dimension data.", {
        hasNode: !!displayedImageNode,
        originalWidth,
        originalHeight,
      });
      return [];
    }
    const result = annotation.map((annotate) => {
      return {
        // id: annotation.id,
        x1: annotate.x1 / originalWidth,
        y1: annotate.y1 / originalHeight,
        x2: annotate.x2 / originalWidth,
        y2: annotate.y2 / originalHeight,
        class: annotate.selectedClassname,
      };
    });
    return result;
  };
  // --------------------------------------------
  const handleSubmit = async () => {
    try {
      setHandleSubmitLoading(true);
      const annotations = {};
      images.forEach((image) => {
        console.log("image_stats---->", image);
        // Get the original dimensions for the current image
        const { originalWidth, originalHeight } = image;
        const displayedImageNode = imageRef.current;
        // Find the corresponding loaded Konva image object to get its display size
        // Note: This assumes `konvaImage` is the currently displayed one.
        // A more robust way would be to store display dimensions if they can vary.

        annotations[image.name] = convertToFinalAnnotations(
          image.annotations,
          displayedImageNode,
          originalWidth,
          originalHeight
        );
      });

      console.log("final_annotations----------", annotations);
      setAnnotation(annotations);

      if (!Object.keys(annotations).length > 0) {
        console.error("Annotations not found while submitting");
      }
      const resp = await AxiosInstance.post("/plot_val_output", {
        user_id: user_id,
        project_name: project_name,
        model_id: ai_model_name,
        detections: annotations,
      });
      console.log("plot_val_output annotations response:", resp.data);

      if (resp?.data) {
        const uploadResp = await AxiosInstance.post("/upload-annotations", {
          user_id,
          project_name: project_name,
          class_names: ClassList,
          annotations: annotations,
          bucket_name: "bucket1",
          folder_name: "newFolder",
        });
        console.log("Upload annotations response:", uploadResp.data);
        if (uploadResp.data) {
          navigate("/validmodelreport");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setHandleSubmitLoading(false);
    }
  };
  const handleUndo = () => {
    if (rectangles.length > 0) {
      const updatedRects = rectangles.slice(0, -1);
      setRectangles(updatedRects);
      const updatedImages = [...images];
      updatedImages[currentIndex].annotations = updatedRects;
      setImages(updatedImages);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const updatedImages = [...images];
      if (updatedImages[currentIndex]) {
        updatedImages[currentIndex].annotations = rectangles;
      }
      setImages(updatedImages);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const updatedImages = [...images];
      if (updatedImages[currentIndex]) {
        updatedImages[currentIndex].annotations = rectangles;
      }
      setImages(updatedImages);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleZoom = (direction) => {
    const factor = direction === "in" ? 1.1 : 0.9;
    setScale((prev) => Math.max(0.1, prev * factor));
  };
  const handleZoomOut = () => {
    // const stage = stageRef.current;

    // // --- Reset View and Center Logic ---
    // setScale(1);
    // stage.scale({ x: 1, y: 1 });
    // stage.position({ x: 0, y: 0 });
    // // Use the now-guaranteed correct dimensions from state

    // // Use the offset trick for clean centering
    // const x = (dimensions.width - imageRef.current.width()) / 2;
    // const y = (dimensions.height - imageRef.current.height()) / 2;
    // imageRef.current.position({ x, y });
    // imageRef.current.offsetX(0);
    // imageRef.current.offsetY(0);

    // stage.batchDraw();
    resetAndCenterView(konvaImage);
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

  // useEffect(() => {
  //   // TODO:Alternative to remove thus useEffect
  //   // to set image at center
  //   if (
  //     konvaImage &&
  //     stageRef.current &&
  //     imageRef.current &&
  //     dimensions.width > 0
  //   ) {
  //     const stage = stageRef.current;
  //     const imageNode = imageRef.current;

  //     // Use the dimensions from the loaded image data, it's more reliable
  //     const imageWidth = konvaImage.width;
  //     const imageHeight = konvaImage.height;

  //     // Reset the view to a default state for consistency
  //     setScale(1);
  //     stage.scale({ x: 1, y: 1 });
  //     stage.position({ x: 0, y: 0 });

  //     // Calculate the centered position
  //     const x = (dimensions.width - imageWidth) / 2;
  //     const y = (dimensions.height - imageHeight) / 2;

  //     // Apply the position and reset any old offsets
  //     imageNode.position({ x: 0, y: 0 });
  //     imageNode.offsetX(0);
  //     imageNode.offsetY(0);
  //     const centerX = (dimensions.width - imageWidth) / 2;
  //     const centerY = (dimensions.height - imageHeight) / 2;
  //     stage.position({ x: centerX, y: centerY });

  //     stage.batchDraw();
  //   }
  // }, [konvaImage]);

  const handleDragEnd = (e, idx) => {
    const node = e.target;
    const id = node.id();
    const newX1 = node.x();
    const newY1 = node.y();

    const updatedRects = rectangles.map((rect) => {
      if (rect.id === id) {
        const width = rect.x2 - rect.x1;
        const height = rect.y2 - rect.y1;
        return {
          ...rect,
          x1: newX1,
          y1: newY1,
          x2: newX1 + width,
          y2: newY1 + height,
        };
      }
      return rect;
    });

    setRectangles(updatedRects);
    const updatedImages = [...images];
    if (updatedImages[currentIndex]) {
      updatedImages[currentIndex].annotations = updatedRects;
      setImages(updatedImages);
    }
    setIsDragging(false);
  };

  // 🔴 CHANGE: A new, corrected function to handle transformations.
  const handleTransformEnd = (e, idx) => {
    const node = e.target;
    const id = node.id();
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // 1. Reset the node's scale to 1 for the next transform
    node.scaleX(1);
    node.scaleY(1);

    // 2. Find the corresponding rectangle in state and update its coordinates
    const updatedRects = rectangles.map((rect) => {
      if (rect.id === id) {
        // The group's position is the new x1, y1
        const newX1 = node.x();
        const newY1 = node.y();
        // The new width/height is the old size multiplied by the scale factor
        const newWidth = node.width() * scaleX;
        const newHeight = node.height() * scaleY;

        return {
          ...rect,
          x1: newX1,
          y1: newY1,
          x2: newX1 + newWidth,
          y2: newY1 + newHeight,
        };
      }
      return rect;
    });

    // 3. Update all relevant state
    setRectangles(updatedRects);
    const updatedImages = [...images];
    if (updatedImages[currentIndex]) {
      updatedImages[currentIndex].annotations = updatedRects;
      setImages(updatedImages);
    }

    // 4. Reset dragging state to show the menu again
    setIsDragging(false);
  };
  const toRgba = (hex, alpha = 1) => {
    if (!hex || typeof hex !== "string" || !hex.startsWith("#")) {
      console.warn("Invalid HEX color passed to toRgba:", hex);
      return `rgba(0, 0, 0, ${alpha})`; // fallback color
    }
    const bigint = parseInt(hex?.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const currentImage = images[currentIndex]?.src;

  const handleDeleteAnnotation = (id) => {
    setRectangles((prev) => {
      const updated_val = [...prev];
      const result = updated_val.filter((val) => val.id !== id);
      console.log("result----->", result);

      return result;
    });
    setImages((prev) => {
      const updated_val = [...prev];
      const current_image = updated_val[currentIndex];

      if (!current_image) return prev;
      const result = current_image.annotations.filter((val) => val.id !== id);

      updated_val[currentIndex] = {
        ...current_image,
        annotations: result,
      };

      return updated_val;
    });
    setSelectedId(null);
  };
  const handelDeleteOnKey = useCallback(() => {
    setRectangles((prev) => {
      const updated_val = [...prev];
      const result = updated_val.filter((val) => val.id !== selectedId);
      console.log("result----->", result);

      return result;
    });
    setImages((prev) => {
      const updated_val = [...prev];
      const current_image = updated_val[currentIndex];

      if (!current_image) return prev;
      const result = current_image.annotations.filter(
        (val) => val.id !== selectedId
      );

      updated_val[currentIndex] = {
        ...current_image,
        annotations: result,
      };

      return updated_val;
    });
    setSelectedId(null);
  }, [selectedId, currentIndex, images]);
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

  useEffect(() => {
    if (transformerRef.current) {
      // Find the node on the stage by its ID
      const selectedNode = stageRef.current.findOne("#" + selectedId);

      if (selectedNode) {
        // Attach transformer to the selected node
        transformerRef.current.nodes([selectedNode]);
      } else {
        // If no node is selected, detach the transformer
        transformerRef.current.nodes([]);
      }
      // Redraw the layer to show/hide the transformer
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  useEffect(() => {
    let wheelTimeout = null;
    const handleKeyDown = (e) => {
      if (e.key === "delete" || e.key === "Delete") {
        console.log("invoked-------->", selectedId);
        handelDeleteOnKey();
      }
      if (!e.ctrlKey) return;

      if (e.key === "+" || e.key === "=") {
        handleZoom("in");
        e.preventDefault();
      }

      if (e.key === "-") {
        e.preventDefault();
        handleZoom("out");
      }
    };

    const handleWheel = (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();

      if (wheelTimeout) return;

      wheelTimeout = setTimeout(() => {
        wheelTimeout = null; // Reset for next scroll

        const zoomFactor = 1.05;
        const zoomIn = e.deltaY < 0;
        const factor = zoomIn ? zoomFactor : 1 / zoomFactor;

        setScale((prev) => {
          const newScale = Math.max(0.1, Math.min(prev * factor, 5));
          return newScale;
        });
      }, 1000);
    };

    const container = containerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions((prev) => {
        // warning:pls consider cause here re-render when change the width and height
        if (prev.width !== width || prev.height !== height) {
          return { width, height };
        }
        return prev; // no unnecessary re-renders
      });
    });

    if (container) {
      resizeObserver.observe(container);
    }

    // Hide menu on window click
    window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (container) {
        resizeObserver.unobserve(container);
      }
      // window.addEventListener("wheel", handleWheel, { passive: false });
      // if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [handelDeleteOnKey]);

  return (
    <div className="h-[100dvh] w-full grid grid-rows-11 bg-GlobalBg">
      <Header />
      <div className="row-span-1 w-full grid grid-cols-12 px-10">
        <div className="col-span-8 flex w-full items-start justify-between px-4 py-4 text-2xl">
          <div className="col-span-2 flex gap-4 mt-4">
            <button className="cursor-pointer" onClick={() => handlePrev()}>
              <img src={next_prev_btn_icon} alt="icon" className="rotate-180" />
            </button>
            <span className="text-xl">
              {currentIndex + 1}/{images?.length}
            </span>
            <button className="cursor-pointer" onClick={() => handleNext()}>
              <img src={next_prev_btn_icon} alt="icon" />
            </button>
          </div>
          <div className="col-span-4 text-2xl text-GlobalPrimary mt-3">
            Please review and confirm all annotations on each image to validate
            the model.
          </div>
        </div>
        <div className="col-span-2 flex justify-center items-center px-5 pb-2"></div>
        <div className="col-span-2 flex justify-center items-center px-2 pb-2">
          <button
            onClick={() => handleSubmit()}
            type="button"
            className=" w-74  self-center flex items-center justify-center h-4/6 bg-GlobalPrimary rounded-full text-xl text-white font-light cursor-pointer "
          >
            {HandleSubmitLoading ? "please wait..." : "Generate Report"}
          </button>
        </div>
      </div>

      <div className="row-span-9">
        <div className=" h-full bg-GlobalBg">
          <div className="w-full h-full   px-10 py-2 flex justify-center items-center space-y-4 relative">
            <div
              ref={containerRef}
              className=" w-full h-full overflow-hidden relative flex justify-center items-center md:min-w-xl xl:min-w-3xl rounded-3xl border-2 border-GlobalLightGrey"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            >
              {isFetching ? (
                <div className="absolute inset-0 bg-slate-200 bg-opacity-70 flex justify-center items-center z-50 transition-all ease-in-out">
                  <FallingTileLoader />
                  <h1 className="text-GlobalPrimary absolute top-[70%] text-2xl">
                    Please wait.... finishing up setup
                  </h1>
                </div>
              ) : (
                ""
              )}
              <div className="bg-white w-5/12 h-20 border-2 absolute top-5 rounded-2xl z-20 right-5 border-[#BBBBBB] flex p-2 justify-between">
                <img
                  onClick={() => {
                    setIsBrightnessLoading(true);
                    setTimeout(() => {
                      const img = imageRef.current;
                      if (!img) return;
                      img.cache();
                      img.filters([Konva.Filters.Brighten]);
                      img.brightness(brightness);
                      img.getLayer().batchDraw();
                      setBrightness((prev) => {
                        if (prev > 0.8) {
                          return 0.1;
                        }
                        return prev + 0.1;
                      });
                      setIsBrightnessLoading(false);
                    }, 500);
                  }}
                  disable={IsBrightnessLoading}
                  className={
                    IsBrightnessLoading ? "cursor-progress" : "cursor-pointer"
                  }
                  src={brightness_square}
                  alt=""
                />
                <img
                  onClick={() => handleZoom("in")}
                  className="cursor-pointer"
                  src={plus_square}
                  alt=""
                />
                <img
                  onClick={() => handleZoom("out")}
                  className="cursor-pointer"
                  src={minus_square}
                  alt=""
                />
                <img
                  className="cursor-pointer"
                  onClick={handleZoomOut}
                  src={screen_size_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed"
                  src={draw_icon_square}
                  alt=""
                />
                <img
                  className="cursor-pointer"
                  onClick={toggleHandMode}
                  src={hand_icon_square}
                  alt=""
                />
                <img
                  onClick={toggleMarkMode}
                  className="cursor-pointer"
                  src={bounding_box_icon_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed"
                  onClick={toggleMarkMode}
                  src={arrow_circle_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed"
                  src={magic_wand_square}
                  alt=""
                />
                <img
                  onClick={handleUndo}
                  className="cursor-pointer"
                  src={undo_icon_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed"
                  src={redo_icon_square}
                  alt=""
                />
                <img
                  className="cursor-not-allowed"
                  src={disable_icon_square}
                  alt=""
                />
              </div>
              <div className="bg-white w-2/10  max-h-3/5 h-fit  absolute top-28 rounded-2xl z-20 right-5 border-[#BBBBBB] flex justify-around">
                <div
                  className={`max-h-16 w-full bg-gradient-to-b from-[#E2DEDA] to-[#D5E5F6] ${
                    openPanel2 ? "rounded-t-2xl" : "rounded-2xl"
                  } flex justify-between items-center p-4 absolute`}
                >
                  <p className="text-2xl">Annotate</p>
                  {openPanel2 ? (
                    <img
                      className="h-10 aspect-square cursor-pointer transition-all"
                      src={panel_close}
                      alt=""
                      onClick={() => {
                        setOpenPanel2(false);
                      }}
                    />
                  ) : (
                    <img
                      className="h-10 aspect-square cursor-pointer rotate-180 transition-all"
                      src={panel_close}
                      alt=""
                      onClick={() => {
                        setOpenPanel2(true);
                      }}
                    />
                  )}
                </div>
                {openPanel2 && (
                  <div className="max-h-full h-fit w-full pt-16 flex flex-col">
                    <div className="w-full flex flex-col  p-2">
                      <p className="text-2xl">Classification:</p>
                      <div className="w-full  max-h-64 h-fit gap-2 flex flex-col px-2  overflow-y-auto">
                        {!isPending
                          ? ClassList?.map((cl, i) => {
                              console.log("classification------->", cl);

                              return (
                                <>
                                  <div
                                    className="bg-[#CCDDF1] py-1 px-4 flex justify-between items-center cursor-pointer rounded-lg"
                                    onClick={() => setSelectedClassName(i)}
                                  >
                                    <div className="flex gap-5 items-center">
                                      <div
                                        className="h-6 aspect-square"
                                        style={{
                                          backgroundColor: brightColors[i],
                                        }}
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
                                </>
                              );
                            })
                          : "loading..."}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-full relative">
                {InvalidImages.includes(images[currentIndex]?.name) &&
                !isFetching ? (
                  <h1 className="sticky top-[50%] left-[50%] z-50 text-white shadow-2xl text-3xl w-full h-full    text-center flex items-center justify-items-center bg-[#061423A6] backdrop-blur-sm bg-opacity-50">
                    <p className="  h-fit   w-fit m-auto p-2 ">Invalid image</p>
                  </h1>
                ) : null}
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
                      <Layer
                        clipFunc={(ctx) => {
                          // warning: import to keep clipFunc() for keeping annotation area limited to image only
                          if (konvaImage) {
                            ctx.rect(0, 0, konvaImage.width, konvaImage.height);
                          }
                        }}
                      >
                        <KonvaImage
                          image={konvaImage}
                          ref={imageRef}
                          filters={[Konva.Filters.Brighten]}
                          brightness={1}
                        />

                        {rectangles.map((r, i) => {
                          // console.log("selected_classNames---------->", r);

                          const isSelected = r.id === selectedId;
                          return (
                            <>
                              <Group key={r.id} ref={shapeRefs}>
                                <Rect
                                  id={r.id}
                                  x={r.x1}
                                  y={r.y1}
                                  width={r.x2 - r.x1}
                                  height={r.y2 - r.y1}
                                  fill={toRgba(
                                    brightColors[r.selectedClassname],
                                    isSelected ? 0.2 : 0
                                  )}
                                  stroke={brightColors[r.selectedClassname]}
                                  strokeScaleEnabled={false}
                                  strokeWidth={isSelected ? 4 : 2} // Thicker border when selected
                                  onClick={(e) => {
                                    // Close context menu if it's open
                                    if (!isPanning) {
                                      setSelectedId(r.id);
                                    }
                                  }}
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={handleDragEnd}
                                  onTransformStart={() => setIsDragging(true)}
                                  onTransformEnd={handleTransformEnd}
                                  shadowColor="black"
                                  shadowBlur={isSelected ? 10 : 0} // Add a shadow for highlight
                                  shadowOpacity={0.6}
                                />

                                {/* Conditionally render the menu */}
                                {selectedId === r.id && !isDragging && (
                                  <Html
                                    groupProps={{
                                      x: Math.min(r.x1, r.x2),
                                      y: Math.min(r.y1, r.y2),
                                    }}
                                    // x={r.x1}
                                    // y={r.y1}
                                    // width={r.x2 - r.x1}1
                                    height={22}
                                  >
                                    <AnnotationMenu
                                      id={r.id}
                                      classname={classname}
                                      handleDeleteAnnotation={
                                        handleDeleteAnnotation
                                      }
                                      x1={r.x1}
                                      y1={r.y1}
                                      currentClass={r?.selectedClassname}
                                      scale={scale}
                                      ClassList={ClassList}
                                    />
                                  </Html>
                                )}
                              </Group>
                            </>
                          );
                        })}
                        {/* 🔴 CHANGE: The Transformer now has its ref attached. */}
                        <Transformer
                          ref={transformerRef}
                          rotateEnabled={false}
                          anchorSize={10}
                          anchorStroke={"#007bff"}
                          anchorFill={"#fff"}
                          borderStroke={"#007bff"}
                          boundBoxFunc={(oldBox, newBox) => {
                            if (newBox.width < 10 || newBox.height < 10) {
                              return oldBox;
                            }
                            return newBox;
                          }}
                        />
                        {newRect && (
                          <Rect
                            x={Math.min(newRect.x1, newRect.x2)}
                            y={Math.min(newRect.y1, newRect.y2)}
                            width={Math.abs(newRect.x2 - newRect.x1)}
                            height={Math.abs(newRect.y2 - newRect.y1)}
                            stroke={brightColors[selectedClassname]}
                            strokeWidth={2 / scale}
                            dash={[4, 4]}
                          />
                        )}
                      </Layer>
                    </Stage>
                  )}
              </div>
              <div className="max-h-full h-fit  w-1/10 absolute bg-white left-10 top-5 rounded-2xl z-50">
                <div
                  className={`max-h-16 w-full bg-gradient-to-b from-[#E2DEDA] to-[#D5E5F6]  ${
                    openPanel ? "rounded-t-2xl" : "rounded-2xl"
                  } flex justify-evenly items-center p-4 absolute`}
                >
                  <p className="text-2xl">Images</p>

                  {openPanel ? (
                    <img
                      className="h-10 aspect-square cursor-pointer transition-all"
                      src={panel_close}
                      alt=""
                      onClick={() => {
                        setOpenPanel(false);
                      }}
                    />
                  ) : (
                    <img
                      className="h-10 aspect-square cursor-pointer rotate-180 transition-all"
                      src={panel_close}
                      alt=""
                      onClick={() => {
                        setOpenPanel(true);
                      }}
                    />
                  )}
                </div>
                {openPanel && (
                  <div className="max-h-[40rem] h-fit overflow-y-scroll flex flex-col justify-start items-center py-5 gap-5 pt-18 scrollbar-hidden">
                    {images?.map((image, index) => (
                      <>
                        <img
                          key={index}
                          className={`w-5/6 min-h-20 rounded-2xl ${
                            index == currentIndex
                              ? "border-4 border-GlobalLightBlue"
                              : ""
                          } ${
                            isPending ? "cursor-progress" : "cursor-pointer"
                          }`}
                          src={image?.src}
                          alt="annotation_image"
                          onClick={() => {
                            if (isPending) {
                              return;
                            }
                            setCurrentIndex(index);
                          }}
                        />
                      </>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidateModalAnnotation;

const AnnotationMenu = ({
  id,
  handleDeleteAnnotation,
  classname,
  scale,
  currentClass,
  x1,
  y1,
  ClassList,
}) => {
  return (
    <>
      <div
        className="h-fit py-2 px-4 text-start rounded-2xl text-xl bg-GlobalPrimary flex gap-2 items-center transition-all ease-in-out delay-100"
        style={{
          transform: `translateY(-100%) translateY(-2px) scale(${0.8 / scale})`,
          transformOrigin: "bottom left",
          pointerEvents: "auto",
        }}
      >
        <span className="text-white text-xl">{ClassList[currentClass]} </span>
        <span className="flex gap-2 text-white">{/* x:{x1} ,y:{y1} */}</span>

        <span className="text-white font-medium">|</span>
        <button
          className="text-white text-xl"
          onClick={() => {
            handleDeleteAnnotation(id);
          }}
        >
          <img src={close_white_icon} alt="icon" />
        </button>
        {/* <span className="text-white text-xl">
          <img src={tick_white_icon} alt="icon" />
        </span> */}
      </div>
    </>
  );
};
