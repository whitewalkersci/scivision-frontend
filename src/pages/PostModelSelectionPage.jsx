import React, { useRef, useState } from "react";
import Header from "../components/Header";
import uploadimage from "../assets/images/uploadimage.svg";
import greenTickCircle from "../assets/images/GreenTickCircle.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingModal } from "../components/ModalComponents";
import AxiosInstance from "../axios/AxiosInstance";
import { useGCSUrlStore, useTrainModelStore } from "../zustand/trainModelStore";
function PostModelSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedModel, setSelectedModel] = useState(
    location.state?.selectedModel || []
  );

  const { setAiModelName, setProjectName, setClassname } = useTrainModelStore();

  const [images, setImages] = useState(location.state?.images || []);
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };
  const fileInputRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const [IsModalOpen, setIsModalOpen] = useState(false);
  const { setUploadGCSData } = useGCSUrlStore();
  const [FileUploadCount, setFileUploadCount] = useState(0);
  const CurrentPageHeader = () => {
    return (
      <div className="row-span-1 w-full px-10">
        <div className=" w-full grid grid-cols-12 px-10 min-h-20 h-10/12 border-b border-b-[#8E8E8E]">
          <div
            className={` ${
              images.length <= 0
                ? "col-span-12 md:col-start-3 md:col-span-8"
                : "col-span-7"
            } flex w-full items-start justify-between xl:px-10 pt-2 xl:pb-1  xl:text-xl`}
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
              <div className="w-8 h-8 border-[2px] border-GlobalPrimary rounded-full p-1">
                <div className="w-full aspect-square bg-GlobalPrimary rounded-full"></div>
              </div>
              <p className=" font-semibold text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
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
          {images.length > 0 && (
            <div className="col-span-5 h-full grid grid-cols-9 text-lg xl:text-xl 2xl:text-2xl">
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
                  Abort Uploading
                </button>
              </div>
              <div className="col-span-4 xl:col-span-5 h-full flex justify-center items-center">
                <button
                  onClick={() => {
                    handleNext();
                  }}
                  disabled={isLoading}
                  className={`bg-GlobalPrimary h-14  w-11/12 rounded-full text-white ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }  flex justify-center items-center`}
                >
                  {isLoading ? <SmallSpinner /> : "Next"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new window.Image();
          img.src = reader.result;
          img.onload = () => resolve({ file, img, annotations: [] });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(setImages);
  };

  const handleNext = async () => {
    setIsModalOpen(true);
    for (const { file } of images) {
      const formData = new FormData();
      formData.append("project_name", selectedModel?.project_name);
      formData.append("image_path", file);
      formData.append("user_id", selectedModel?.user_id);
      formData.append("model_name", selectedModel?.model_name);

      try {
        const res = await AxiosInstance.post("/inference_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status !== 200) {
          throw new Error("Upload failed");
        } else {
          setFileUploadCount((prev) => prev + 1);
        }
      } catch (err) {
        setIsModalOpen(false);
        console.log(err);
        break;
      }
    }
    const gcs_server_rep = await AxiosInstance.post("/inference_upload_GCS", {
      user_id: selectedModel.user_id,
      project_name: selectedModel.project_name,
      model_id: selectedModel.model_name,
    });
    setUploadGCSData(gcs_server_rep.data?.inference_url_dic ?? {});
    setIsModalOpen(false);
    const serializableImages = images.map(({ file, img, annotations }) => ({
      name: file.name,
      type: file.type,
      src: img.src,
      originalHeight: img.naturalHeight,
      originalWidth: img.naturalWidth,
      annotations,
    }));
    // user_id: user_id,
    //             project_name: model?.project_name,
    //             model_name: model?.deployed_model_display_name,
    //             create_time: model?.create_time,
    //             classes: model?.classes,

    setAiModelName(selectedModel?.model_name);
    setProjectName(selectedModel?.project_name);
    setClassname(selectedModel?.classes);
    setIsModalOpen(false);

    if (serializableImages) {
      navigate("/annotationreview", {
        // state: { images: serializableImages, selectedModel: selectedModel },
        state: { images: serializableImages, selectedModel: selectedModel },
      });
    } else {
      console.log("Error while creating `serializableImages`");
    }
  };
  console.log("selected Model", selectedModel);
  return (
    <>
      <div className="h-[100dvh] w-full grid grid-rows-11 bg-GlobalBg">
        <Header />
        <CurrentPageHeader />
        {images.length <= 0 ? (
          <div className="row-span-11 flex justify-center items-center">
            <div className="w-full h-5/6 2xl:h-full  flex flex-col justify-evenly 2xl:justify-center items-center gap-5">
              <div className="w-full flex justify-center items-center text-center">
                <h1 className="md:text-2xl text-GlobalPrimary">
                  Upload batch of images to create your own AI model
                </h1>
              </div>
              <div className="w-10/12 h-3/6 md:h-4/6 md:w-8/12 xl:h-4/6 xl:w-6/12 flex justify-center items-center">
                <img className="h-full" src={uploadimage} alt="" />
              </div>
              <p className="text-lg font-semibold text-GlobalPrimary ">
                Drag and drop file(s) to upload
              </p>

              <div className="w-4/12 flex justify-center gap-5 2xl:gap-10">
                <button
                  onClick={handleUploadClick}
                  className="w-1/2 min-w-32 max-w-60 h-12 bg-GlobalPrimary text-white 2xl:text-xl rounded-full cursor-pointer"
                >
                  Select Files
                </button>
                <button
                  type="button"
                  disabled={true}
                  onClick={handleUploadClick}
                  className="w-1/2 min-w-32 max-w-60 h-12 bg-GlobalPrimary text-white 2xl:text-xl rounded-full cursor-not-allowed"
                >
                  Select Folder
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="row-span-11 flex justify-center items-center h-full">
            <div className="w-full h-11/12 flex flex-col justify-center items-center gap-5">
              <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                <div className="w-full px-10  h-full overflow-auto">
                  <div className="w-full min-h-full grid grid-cols-6 xl:grid-cols-12 gap-5">
                    {images.map((img, index) => (
                      <>
                        <div className="col-span-2 w-full relative flex items-start justify-center p-2">
                          {/* <img
                            className="border rounded-full h-8 bg-white absolute top-2 right-2 cursor-pointer"
                            src={close_icon}
                            alt=""
                            onClick={() => {
                              removeImage(index);
                            }}
                          /> */}
                          <img
                            key={index}
                            src={img.img.src}
                            alt={`Image ${index + 1}`}
                            className="col-span-2 w-full aspect-2/3  xl:aspect-2/3 rounded-2xl border border-GlobalPrimary"
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleUpload}
        />
      </div>
      <LoadingModal
        IsModalOpen={IsModalOpen}
        closeModal={() => setIsModalOpen(close)}
        HeadLine={"Uploading images for Inferencing"}
        BottomLine={"please wait... while we uploading"}
        TotalFileLength={images.length ?? 0}
        FileUploadCount={FileUploadCount}
      />
    </>
  );
}

export default PostModelSelectionPage;
