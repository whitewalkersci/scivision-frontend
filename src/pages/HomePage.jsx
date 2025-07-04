import note_pen from "../assets/images/note_pen.svg";
import note_search from "../assets/images/note_search.svg";
import upload_image from "../assets/images/upload_image.svg";
import image_upload from "../assets/images/image_upload2.svg";
import image_gallery from "../assets/images/image_gallery.svg";
import ellipse from "../assets/images/ellipse.svg";
import magic_wand from "../assets/images/magic_wand.svg";
import pathology from "../assets/images/pathology.svg";
import specimen1 from "../assets/images/specimen1.svg";
import specimen2 from "../assets/images/specimen2.svg";
import close_icon from "../assets/images/close_icon.svg";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../zustand/userStore";

function HomePage() {
  const { user_id } = useUserData();
  const navigate = useNavigate();
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  useEffect(() => {
    if (user_id === "") {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-[100dvh] w-full grid grid-rows-12 relative">
      <Header />
      <div className="row-span-11 p-10 flex flex-col justify-evenly lg:justify-evenly gap-5 lg:gap-5">
        <div className="max-h-10 md:max-h-16 xl:max-h-24 h-24 flex justify-between items-center">
          <h1 className="text-GlobalPrimary text-sm md:text-xl lg:text-2xl">
            Automated Specimen analysis Studio
          </h1>
          <button className="w-72 bg-GlobalPrimary h-full text-TextColor2 font-normal md:text-lg xl:text-2xl rounded-full">
            Camera Integration
          </button>
        </div>

        {/* top section  */}
        <div className="flex flex-col gap-1 h-2/6 lg:h-4/5">
          <p className="text-lg">AI Model Creation and Library</p>
          <div className="grid grid-cols-10 gap-5 2xl:gap-14 h-2/4 lg:h-full">
            <div
              className="col-span-6 lg:col-span-6 border rounded-xl bg-GlobalPrimary text-GlobalBg flex flex-col justify-center items-center gap-7 cursor-pointer"
              onClick={() => {
                navigate("/uploadpagedetails");
              }}
            >
              <div className="aspect-square rounded-full h-2/5 flex flex-col justify-center items-center">
                <img className="w-full aspect-square" src={magic_wand} alt="" />
              </div>
              <p className="text-center text-xs lg:text-lg">GENERATE</p>
            </div>
            {/* <div className="col-span-3 lg:col-span-2 border rounded-xl bg-GlobalPrimary flex justify-center items-center"> */}
            <div
              className="col-span-2 lg:col-span-2 rounded-xl border bg-GlobalPrimary text-GlobalBg flex flex-col justify-center items-center gap-7 cursor-pointer"
              onClick={() => {
                navigate("/modelsregistry");
              }}
            >
              <div className="aspect-square rounded-full h-2/5 flex flex-col justify-center items-center">
                <img
                  className="w-full aspect-square"
                  src={image_upload}
                  alt=""
                />
              </div>
              <p className="text-center text-xs lg:text-lg">UPLOAD</p>
            </div>
            <div className="col-span-2 lg:col-span-2 rounded-xl border border-GlobalPrimary bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex flex-col justify-center items-center gap-7">
              <div className="aspect-square rounded-full h-2/5 border border-GlobalPrimary bg-GlobalBg flex flex-col justify-center items-center">
                <img
                  className="w-4/11 aspect-square"
                  src={image_gallery}
                  alt=""
                />
              </div>
              <p className="text-center text-xs lg:text-lg">ADD TEMPLATES</p>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-5 2xl:gap-14 text-GlobalPrimary">
            <div className="col-span-6 lg:col-span-6 flex justify-center items-start text-center text-lg">
              <p>Create New model from scratch</p>
            </div>
            <div className="col-span-2 lg:col-span-2 flex justify-center items-start text-center text-lg">
              <p>Upload Images to Analyze</p>
            </div>
            <div className="col-span-2 lg:col-span-2 flex justify-center items-start text-center text-lg">
              <p>Explore Templates from Emporium</p>
            </div>
          </div>
        </div>

        {/* bottom section  */}
        <div className="flex flex-col gap-1 h-2/6 lg:h-4/5 justify-start">
          <div className="w-full grid grid-cols-10 gap-5 2xl:gap-14">
            <div className="text-lg col-span-6 lg:col-span-6 w-full flex justify-between">
              <p>Recently Created Models</p>
              <p className="underline">View</p>
            </div>
            <div className="text-lg col-span-4 lg:col-span-4 w-full flex justify-between">
              <p className="">Recently Analysed Specimen</p>
              <p className="underline">View</p>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-5 2xl:gap-14 h-2/4 lg:h-4/5">
            <div className="col-span-2 lg:col-span-2 border rounded-xl border-GlobalPrimary bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex-col flex justify-center items-center gap-4 overflow-hidden">
              <img className="w-full" src={pathology} alt="" />
            </div>
            <div className="col-span-2 lg:col-span-2 rounded-xl border border-GlobalPrimary bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex flex-col justify-center items-center gap-4 overflow-hidden">
              <img className="w-full" src={pathology} alt="" />
            </div>
            <div className="col-span-2 lg:col-span-2 border rounded-xl border-GlobalPrimary bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex-col flex justify-center items-center gap-4 overflow-hidden">
              <img className="w-full" src={pathology} alt="" />
            </div>
            <div className="col-span-2 lg:col-span-2 border rounded-xl border-GlobalPrimary bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex-col flex justify-center items-center gap-4 overflow-hidden">
              <img className="w-full" src={specimen1} alt="" />
            </div>
            <div className="col-span-2 lg:col-span-2 border rounded-xl border-GlobalPrimary bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex-col flex justify-center items-center gap-4 overflow-hidden">
              <img className="w-full" src={specimen2} alt="" />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-5 2xl:gap-14 text-GlobalPrimary">
            <div className="col-span-2 lg:col-span-2 flex justify-center items-start text-center text-md lg:text-lg">
              <p>AI Model name- dd.mm.yyyy</p>
            </div>
            <div className="col-span-2 lg:col-span-2 flex justify-center items-start text-center text-md lg:text-lg">
              <p>AI Model name- dd.mm.yyyy</p>
            </div>
            <div className="col-span-2 lg:col-span-2 flex justify-center items-start text-center text-md lg:text-lg">
              <p>AI Model name- dd.mm.yyyy</p>
            </div>
            <div className="col-span-2 lg:col-span-2 flex justify-center items-start text-center text-md lg:text-lg">
              <p>Project name- dd.mm.yyyy</p>
            </div>
            <div className="col-span-2 lg:col-span-2 flex justify-center items-start text-center text-md lg:text-lg">
              <p>Project name- dd.mm.yyyy</p>
            </div>
          </div>
        </div>
        {/* <div className=" flex flex-col gap-5 h-2/6 lg:h-3/6">
        <div className="w-full grid grid-cols-10 gap-5 2xl:gap-14">
          <p className="text-xl col-span-6 lg:col-span-6 w-full">
            Steps to Create AI Model
          </p>
          <p className="text-xl col-span-4 lg:col-span-4 w-full">
            Created Model Dashboard
          </p>
        </div>
        <div className="grid grid-cols-10 gap-5 2xl:gap-14 h-2/4 lg:h-3/4">
          <div className="col-span-6 lg:col-span-6 border rounded-xl border-GlobalPrimary bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex justify-center items-center relative px-5 lg:px-0">
            <div className="h-full flex flex-col justify-center items-center gap-2">
              <div className="h-2/5 aspect-square rounded-full border border-TextColor bg-GlobalBg flex justify-center items-center relative z-10">
                <img className="w-4/12" src={upload_image} alt="" />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-1">
                <p className="text-xs lg:text-lg font-light">Step 1</p>
                <p className="text-sm lg:text-xl font-normal">UPLOAD</p>
              </div>
            </div>
            <div className="w-2/10 h-1/4 border-t border-dashed"></div>
            <div className="h-full flex flex-col justify-center items-center gap-2">
              <div className=" h-2/5 aspect-square rounded-full border border-TextColor bg-GlobalBg flex justify-center items-center relative z-10">
                <img className="w-4/12 " src={note_pen} alt="" />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-1">
                <p className="text-xs lg:text-lg font-light">Step 2</p>
                <p className="text-sm lg:text-xl font-normal">ANNOTATE</p>
              </div>
            </div>
            <div className="w-2/10 h-1/4 border-t border-dashed"></div>
            <div className="h-full flex flex-col justify-center items-center gap-2">
              <div className="h-2/5 aspect-square rounded-full border border-TextColor bg-GlobalBg flex justify-center items-center relative z-10">
                <img className="w-4/12" src={note_search} alt="" />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-1">
                <p className="text-xs lg:text-lg font-light">Step 3</p>
                <p className="text-sm lg:text-xl font-normal">ANALYZE</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-2 border rounded-xl border-GlobalPrimary bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex-col flex justify-center items-center gap-4">
            <div className="aspect-square rounded-full h-2/5 border border-GlobalPrimary bg-GlobalBg flex justify-center items-center">
              <p className="text-xl lg:text-3xl font-bold text-GlobalPrimary">
                10
              </p>
            </div>
            <p className="text-center text-xs lg:text-lg w-10/12">
              2 Models Created on dd.mm.yyyy
            </p>
          </div>
          <div className="col-span-2 lg:col-span-2 rounded-xl border border-GlobalPrimary bg-gradient-to-b from-[#DDD6CE] to-[#C6E0FF] flex flex-col justify-center items-center gap-4">
            <div className="aspect-square rounded-full h-2/5 border border-GlobalPrimary bg-GlobalBg flex justify-center items-center">
              <p className="text-xl lg:text-3xl font-bold text-GlobalPrimary">
                25
              </p>
            </div>
            <p className="text-center text-xs lg:text-lg w-10/12">
              6 images analysed on dd.mm.yyyy
            </p>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-5 2xl:gap-14 text-GlobalPrimary">
          <div className="col-span-6 lg:col-span-6 flex justify-center items-start text-center text-md lg:text-xl">
            <p>Easy Model Creation with no code and AI efficiency</p>
          </div>
          <div className="col-span-2 lg:col-span-2 flex justify-center items-start text-center text-md lg:text-xl">
            <p>Total Models Created</p>
          </div>
          <div className="col-span-2 lg:col-span-2 flex justify-center items-start text-center text-md lg:text-xl">
            <p>Total Specimen Analysed</p>
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default HomePage;
