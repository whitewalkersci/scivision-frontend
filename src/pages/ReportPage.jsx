import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import greenTickCircle from "../assets/images/GreenTickCircle.svg";
import question_blue from "../assets/images/question_blue.svg";
import panel_close from "../assets/images/panel_close.svg";
import circle_left from "../assets/images/circle_left.svg";
import circle_right from "../assets/images/circle_right.svg";
import histogram_image from "../assets/images/histogram_image.svg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import AxiosInstance from "../axios/AxiosInstance";

// const data = [
//   {
//     name: "Total Area",
//     total: 15,
//   },
//   {
//     name: "Classname 1",
//     total: 10,
//   },
//   {
//     name: "Classname 2",
//     total: 8,
//   },
//   {
//     name: "Classname 3",
//     total: 6,
//   },
// ];

function ReportPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openPanel, setOpenPanel] = useState(true);
  const imageRefs = useRef([]);
  const [images, setImages] = useState(location.state?.images || []);
  const [selectedModel, setSelectedModel] = useState(
    location.state?.selectedModel || []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const [highDensityData, setHighDensityData] = useState({});
  const barColors = ["#9DBCE1", "#E2C103", "#1AB027", "#D4372E"];

  const Histogram = () => {
    return (
      <div className="w-[full] h-full max-w-md border border-[#8CA9CA] rounded-xl shadow">
        <h1 className="h-10 max-h-3/10 bg-gradient-to-b from-[#E2DEDA] to-[#D3E5F8] rounded-t-xl text-xl text-TextColor flex items-center px-5">
          Histogram
        </h1>

        <div className="p-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              {/* Single Bar component using `dataKey="total"` */}
              <Bar dataKey="value" isAnimationActive={false}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend manually */}
          <div className="w-full ps-[10%] flex">
            <div className="text-sm space-y-1 flex gap-4 overflow-auto">
              {data.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    style={{
                      backgroundColor: barColors[index],
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                    }}
                  ></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const fetchData = async () => {
    try {
      const apiResponse = await AxiosInstance.post("/inference_report", {
        model_id: selectedModel?.model_name,
        user_id: selectedModel?.user_id,
      });
      if (apiResponse?.status == 200) {
        const histogramData = Object.entries(
          apiResponse.data.report.histogram
        ).map(([name, value]) => ({
          name,
          value,
        }));
        const densityData = Object.entries(
          apiResponse.data.report.high_density_img
        ).map(([name, value]) => ({
          name,
          value,
        }));
        setHighDensityData(densityData);
        setData(histogramData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CurrentPageHeader = () => {
    return (
      <div className="row-span-1 w-full px-10">
        <div className=" w-full grid grid-cols-12 px-10 min-h-20 h-10/12">
          <div
            className={` 
                    col-span-7
                } flex w-full items-start justify-between xl:px-5 pt-2 xl:pb-1  xl:text-xl`}
          >
            {/* Step 1: Upload */}
            <div className="flex flex-col items-center text-center h-full relative">
              {/* <div className="w-8 h-8 border-[2px] border-GlobalPrimary rounded-full p-1">
                        <div className="w-full aspect-square bg-GlobalPrimary rounded-full"></div>
                      </div> */}
              <img className="w-8 aspect-square" src={greenTickCircle} alt="" />
              <p className=" font-normal text-GlobalPrimary mt-1  text-nowrap absolute bottom-0">
                Select Model
              </p>
            </div>

            {/* Progress Line */}
            {/* <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
                    <div className="w-full border border-GlobalPrimary"></div>
                  </div> */}
            <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
              <div className="w-full border border-[#008C76] h-[6px] bg-[#008C76] rounded-2xl"></div>
            </div>
            <div className="flex flex-col items-center text-center relative h-full">
              <img className="w-8 aspect-square" src={greenTickCircle} alt="" />
              <p className=" font-normal text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
                Upload
              </p>
            </div>

            {/* Progress Line */}
            <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
              <div className="w-full border border-[#008C76] h-[6px] bg-[#008C76] rounded-2xl"></div>
            </div>

            {/* Step 3: Annotate */}
            <div className="flex flex-col items-center text-center relative h-full">
              <img className="w-8 aspect-square" src={greenTickCircle} alt="" />
              <p className=" font-normal text-GlobalPrimary mt-1 absolute text-nowrap bottom-0 flex items-center gap-2">
                <span>Annotation Review</span>

                <img
                  className="w-6 h-6 cursor-pointer"
                  src={question_blue}
                  alt=""
                />
              </p>
            </div>

            {/* Progress Line */}
            <div className="flex-1 w-full h-8 flex justify-center items-center p-1">
              <div className="w-full border border-[#008C76] h-[6px] bg-[#008C76] rounded-2xl"></div>
            </div>

            {/* Step 4: Train */}
            <div className="flex flex-col items-center text-center relative h-full">
              <div className="w-8 h-8 border-[2px] border-GlobalPrimary rounded-full p-1">
                <div className="w-full aspect-square bg-GlobalPrimary rounded-full"></div>
              </div>
              <p className=" font-semibold text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
                Report
              </p>
            </div>
          </div>
          <div className="col-span-5 h-full grid grid-cols-9">
            <div className="col-start-3 col-span-3 grid-cols-7 p-2">
              <button className="w-full h-full rounded-full text-GlobalPrimary border border-GlobalPrimary text-2xl cursor-not-allowed">
                Share Report
              </button>
            </div>
            <div className="col-span-4 p-2">
              <button className="w-full h-full rounded-full bg-GlobalPrimary text-white text-2xl cursor-not-allowed ">
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
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

  return (
    <div className="h-[100dvh] w-full grid grid-rows-11 bg-GlobalBg">
      <Header />
      <CurrentPageHeader />
      <div className="row-span-9 w-full h-full flex flex-col px-10 gap-5 pb-5">
        <div className="flex gap-5 h-9/10">
          <div className="w-1/9 max-h-full h-fit border border-[#8CA9CA] rounded-xl relative">
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
                    className={`w-5/6 min-h-20 h-20 max-h-30 rounded-2xl ${
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
                  <span>{images.length}</span>
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
          <div className="w-8/9  h-full  flex flex-col gap-5 ">
            <div className="w-full h-1/2  flex gap-5">
              <div className="h-full w-4/10  flex flex-col gap-5">
                {/* 1 */}
                <div className="w-full h-1/2 border border-[#8CA9CA] rounded-xl">
                  <div className="h-10 max-h-3/10 bg-gradient-to-b from-[#E2DEDA] to-[#D3E5F8] rounded-t-xl text-xl text-TextColor flex items-center px-5">
                    <h1 className="">Model Information</h1>
                  </div>
                  <div className="h-7/10 w-full grid grid-cols-4 text-TextColor text-base px-5">
                    <div className="col-span-2 h-full flex flex-col justify-end">
                      <h2 className="font-semibold">Model Name:</h2>
                      <p>
                        {selectedModel?.model_name
                          ? selectedModel?.model_name
                          : "unknown"}
                      </p>
                    </div>
                    <div className="col-span-2 h-full flex flex-col justify-end">
                      <h2 className="font-semibold">Project Name:</h2>
                      <p>
                        {selectedModel?.project_name
                          ? selectedModel?.project_name
                          : "unknown"}
                      </p>
                    </div>
                    <div className="col-span-2 h-full flex flex-col justify-end">
                      <h2 className="font-semibold">Created on:</h2>
                      <p>
                        {selectedModel?.create_time ? (
                          <>
                            {new Date(
                              selectedModel.create_time
                            ).toLocaleString()}
                          </>
                        ) : (
                          "unknown"
                        )}
                      </p>
                    </div>
                    <div className="col-span-2 h-full flex flex-col justify-end">
                      <h2 className="font-semibold">Data Type</h2>
                      <p>Images</p>
                    </div>
                  </div>
                </div>
                {/* 2  */}
                <div className="w-full h-1/2 border border-[#8CA9CA] rounded-xl">
                  <div className="h-10 max-h-3/10 bg-gradient-to-b from-[#E2DEDA] to-[#D3E5F8] rounded-t-xl text-xl text-TextColor flex items-center px-5">
                    <h1 className="">Experiment Details</h1>
                  </div>
                  <div className="h-7/10 w-full grid grid-cols-4 text-TextColor text-base px-5">
                    <div className="col-span-2 h-full flex flex-col justify-end">
                      <h2 className="font-semibold">Experiment Name:</h2>
                      <p>
                        {selectedModel?.experiment_name
                          ? selectedModel?.experiment_name
                          : "unknown"}
                      </p>
                    </div>
                    <div className="col-span-2 h-full flex flex-col justify-end">
                      <h2 className="font-semibold">Experiment Date:</h2>
                      <p>
                        {" "}
                        {selectedModel?.create_time ? (
                          <>
                            {new Date(
                              selectedModel.create_time
                            ).toLocaleString()}
                          </>
                        ) : (
                          "unknown"
                        )}
                      </p>
                    </div>
                    <div className="col-span-2 h-full flex flex-col justify-end">
                      <h2 className="font-semibold">Magnification:</h2>
                      <p>50X</p>
                    </div>
                    <div className="col-span-2 h-full flex flex-col justify-end">
                      <h2 className="font-semibold">Dimensions:</h2>
                      <p>32000 - 35000</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full w-6/10  flex gap-5">
                {/* 3 */}
                <div className="w-1/2 h-full border border-[#8CA9CA] rounded-xl pb-2 relative">
                  <h1 className="h-10 max-h-3/10 bg-gradient-to-b from-[#E2DEDA] to-[#D3E5F8] rounded-t-xl text-xl text-TextColor flex items-center px-5">
                    High Density Images
                  </h1>
                  <div className="h-full max-h-9/10 flex flex-col gap-1 px-1 pt-1">
                    <div className="h-3/5 rounded-xl">
                      {[...images].map((image, index) => (
                        <img
                          key={index}
                          ref={(el) => (imageRefs.current[index] = el)}
                          className={`w-full max-h-full rounded-xl ${
                            index === currentIndex ? "" : "hidden"
                          }`}
                          src={image.src}
                          alt=""
                          onClick={() => setCurrentIndex(index)}
                        />
                      ))}
                    </div>
                    <div className="h-2/5 rounded-xl bg-[#CCDDF1] overflow-auto scroll-hide text-sm">
                      {highDensityData.length > 0 ? (
                        <div className="w-full px-3">
                          {highDensityData.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between p-1"
                            >
                              <p>{item.name}</p>
                              <p>{item.value} mm²</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="h-10 absolute w-full top-1/3 flex justify-between px-3">
                    <button
                      onClick={() => {
                        handlePrev();
                      }}
                      className="cursor-pointer"
                    >
                      <img className="h-8" src={circle_left} alt="" />
                    </button>
                    <button
                      onClick={() => {
                        handleNext();
                      }}
                      className="cursor-pointer"
                    >
                      <img className="h-8" src={circle_right} alt="" />
                    </button>
                  </div>
                </div>
                {/* 4 */}
                <div className="w-1/2 h-full rounded-xl">
                  {/* <h1 className="h-10 max-h-3/10 bg-gradient-to-b from-[#E2DEDA] to-[#D3E5F8] rounded-t-xl text-xl text-TextColor flex items-center px-5">
                    Histogram
                  </h1> */}
                  {/* <div className="h-full max-h-9/10">
                    <div className="w-full max-h-3/5 h-3/5 flex justify-start">
                      <img
                        className="w-full max-h-full"
                        src={histogram_image}
                        alt=""
                      />
                    </div>
                    <div className="w-full h-full max-h-2/5 flex flex-col items-start text-GlobalPrimary justify-evenly ps-20">
                      <div className="flex gap-2 justify-center items-center">
                        <div className="h-4 w-4 bg-[#8CA9CA] rounded-sm"></div>
                        <p>Total Area</p>
                      </div>
                      <div className="flex gap-2 justify-center items-center">
                        <div className="h-4 w-4 bg-[#DCB900] rounded-sm"></div>
                        <p>Classname 1</p>
                      </div>
                      <div className="flex gap-2 justify-center items-center">
                        <div className="h-4 w-4 bg-[#19B71F] rounded-sm"></div>
                        <p>Classname 2</p>
                      </div>
                      <div className="flex gap-2 justify-center items-center">
                        <div className="h-4 w-4 bg-[#CE3939] rounded-sm"></div>
                        <p>Classname 3</p>
                      </div>
                    </div>
                  </div> */}
                  <Histogram />
                </div>
              </div>
            </div>
            {/* 5 */}
            <div className="w-full h-1/2 border border-[#8CA9CA] rounded-xl pb-2">
              <h1 className="h-10 max-h-3/10 bg-gradient-to-b from-[#E2DEDA] to-[#D3E5F8] rounded-t-xl text-xl text-TextColor flex items-center px-5">
                Annotation Insights
              </h1>
              <div className="w-full h-full max-h-9/10 flex justify-center items-center">
                <p className="text-3xl text-gray-400">No Data</p>
              </div>
            </div>
          </div>
        </div>
        {/* disclamer  */}
        <div className="h-1/10 ">
          <div className="h-3/5 w-full border border-[#8CA9CA] rounded-xl text-xl flex justify-center items-center bg-[#CCDDF1]">
            <p className="text-TextColor">
              Disclaimer: This specimen analysis report generated is for
              informational purposes only and is not intended for clinical
              diagnosis or professional medical evaluation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
