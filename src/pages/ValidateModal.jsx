import React, { useRef, useState } from "react";
import uploadimage from "../assets/images/uploadimage.svg";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios/AxiosInstance";
import { useGCSUrlStore, useTrainModelStore } from "../zustand/trainModelStore";
import Header from "../components/Header";
import close_icon from "../assets/images/close_icon.svg";
import { useUserData } from "../zustand/userStore";
import { LoadingModal } from "../components/ModalComponents";

function ValidateModal() {
  const navigate = useNavigate();
  const { user_id } = useUserData();
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const { project_name, ai_model_name, creation_date, data_type } =
    useTrainModelStore();
  const {setUploadGCSData}=useGCSUrlStore()
  const [projectName, setProjectName] = useState(project_name);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [FileUploadCount,setFileUploadCount]=useState(0)

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

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleNext = async () => {
    setIsModalOpen(true);
    console.log("i am here 1");
    // await handleSubmit();
    // if (!projectName || images.length === 0) {
    //   console.log("No projectName");
    //   return;
    // }
    
    for (const { file } of images) {
      const formData = new FormData();
      formData.append("project_name", projectName);
      formData.append("image_path", file);
      formData.append("model_id", ai_model_name);
      formData.append("user_id", user_id);

      try {
        const res = await AxiosInstance.post("/val_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status !== 200) {
          throw new Error("Upload failed");
        }else{
          setFileUploadCount((prev)=>prev+1)
        }
      } catch (err) {
        setIsModalOpen(false);
        console.log(err);
        break;
      }
    }
    const gcs_server_rep = await AxiosInstance.post("/val_upload_GCS", {
      user_id,
      project_name,
      model_id: ai_model_name,
    });

    if (!gcs_server_rep.data) {
      console.error("gcs_server_rep error from validate_model");
    }
    
    console.log("images------>", images);
    setUploadGCSData(gcs_server_rep.data.val_url_dic)
    const serializableImages = images.map(({ file, img, annotations }) => ({
      name: file.name,
      type: file.type,
      src: img.src,
      originalHeight: img.naturalHeight,
      originalWidth: img.naturalWidth,
      annotations,
    }));
    setIsModalOpen(false);
    if (serializableImages) {
      navigate("/validationannotation", {
        state: { images: serializableImages },
      });
      
    } else {
      console.log("Error while creating `serializableImages`");
    }
  };

  const CurrentPageHeader = () => {
    return (
      <div className="row-span-1 w-full grid grid-cols-12 px-10 h-full">
        <div className="col-span-9 flex w-full items-start justify-between px-10 pt-2 text-2xl">
          {/* Step 1: Upload */}
          <div className="flex flex-col items-center text-center h-full relative">
            <div className="w-10 h-10 border-4 border-GlobalPrimary rounded-full p-1">
              <div className="w-full aspect-square bg-GlobalPrimary rounded-full"></div>
            </div>
            <p className=" font-normal text-GlobalPrimary mt-1  text-nowrap absolute bottom-0">
              Upload
            </p>
          </div>

          {/* Progress Line */}
          <div className="flex-1 h-2 rounded-full bg-gray-400 mx-2 relative top-[20%]"></div>
          <div className="flex flex-col items-center text-center relative h-full">
            <div className="w-10 h-10 border-4 border-GlobalPrimary rounded-full p-1"></div>
            <p className=" font-semibold text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
              Vision of Interest
            </p>
          </div>

          {/* Progress Line */}
          <div className="flex-1 h-2 rounded-full bg-gray-400 mx-2 relative top-[20%]"></div>

          {/* Step 3: Annotate */}
          <div className="flex flex-col items-center text-center relative h-full">
            <div className="w-10 h-10 border-4 border-GlobalPrimary rounded-full p-1"></div>
            <p className=" font-semibold text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
              Annotate
            </p>
          </div>

          {/* Progress Line */}
          <div className="flex-1 h-2 rounded-full bg-gray-400 mx-2 relative top-[20%]"></div>

          {/* Step 4: Train */}
          <div className="flex flex-col items-center text-center relative h-full">
            <div className="w-10 h-10 border-4 border-GlobalPrimary rounded-full"></div>
            <p className=" font-normal text-GlobalPrimary mt-1 absolute text-nowrap bottom-0">
              Train
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="h-[100dvh] w-full grid grid-rows-11 bg-GlobalBg">
        {images.length > 0 ? (
          <>
            <Header />
            <div className="row-span-10 flex justify-center items-center h-full">
              <div className="w-full h-11/12 flex flex-col justify-center items-center gap-5">
                <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                  <div className="w-full px-28  h-full  overflow-auto">
                    <div className="w-full min-h-full grid grid-cols-10 gap-10 p-10">
                      {images.map((img, index) => (
                        <>
                          <div className="col-span-2 w-full relative">
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
                              className="col-span-2 w-full aspect-3/4 rounded-2xl border"
                            />
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleNext();
                    }}
                    className="h-14 bg-GlobalPrimary text-2xl text-white font-semibold rounded-full w-40 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Header />
            <div className="row-span-10 px-4 ">
              <div className="w-full h-20 flex items-center justify-start border-b border-GlobalPrimary">
                <h1 className="w-full text-start text-4xl text-GlobalPrimary">
                  Let’s Validate Your Model
                </h1>
              </div>
              <div className="w-full flex justify-evenly items-center h-20">
                <div className="text-xl">
                  <p>Model Name:</p>
                  <p className="font-light">{ai_model_name}</p>
                </div>
                <div className="text-xl">
                  <p>Project Name:</p>
                  <p className="font-light">{project_name}</p>
                </div>
                <div className="text-xl">
                  <p>Data Type:</p>
                  <p className="font-light">{data_type}</p>
                </div>
                <div className="text-xl">
                  <p>Creation Date:</p>
                  <p className="font-light">{creation_date}</p>
                </div>
              </div>
              <div className="w-full h-5/6 flex flex-col justify-center items-center gap-2">
                <div className="w-full flex justify-center">
                  <h1 className="text-3xl text-GlobalPrimary font-light">
                    Upload batch of images to create your own AI model
                  </h1>
                </div>
                <div className="h-4/6 w-2/6 flex justify-center items-center">
                  <img className="h-full" src={uploadimage} alt="" />
                </div>
                <p className="text-lg font-semibold text-GlobalPrimary ">
                  Drag and drop file(s) to upload
                </p>

                <div className="w-5/12 flex justify-center gap-6">
                  <button
                    onClick={handleUploadClick}
                    className="w-1/2 h-12 bg-GlobalPrimary text-white text-xl rounded-full cursor-pointer"
                  >
                    Select Files
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="w-1/2 h-12 bg-GlobalPrimary text-white text-xl rounded-full cursor-pointer"
                  >
                    Select Folder
                  </button>
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleUpload}
            />
          </>
        )}

        {/* <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleUpload}
      /> */}
      </div>
      <LoadingModal
        IsModalOpen={IsModalOpen}
        closeModal={() => setIsModalOpen(close)}
        HeadLine={"Uploading Images for Validation data"}
        BottomLine={"please wait... while we uploading"}
        TotalFileLength={images.length??0}
        FileUploadCount={FileUploadCount}
      />
    </>
  );
}

export default ValidateModal;

