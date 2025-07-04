import React from "react";
import handimage from "../assets/images/handimage.svg";
import mainIcon from "../assets/images/main_icon.svg";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AxiosInstance from "../axios/AxiosInstance";
import { SmallSpinner } from "./Loader";
const ForgotPasswordEmailSubmission = ({ setShowOtpSection,setEmailId }) => {
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading,setIsLoading]=useState(false)
  const handelPressEnter = (e, index) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit);
    }
  };
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await AxiosInstance.post("/send_otp", {
        email: data.email,
      });
      if (response.data.STATUS === "SUCCESS") {
        setEmailId(data.email)
        setShowOtpSection(true);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <>
      <form
        className="w-full h-4/6 flex flex-col items-center lg:items-start gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img className="w-10/12 max-w-[500px] aspect-8/1" src={mainIcon} />
        <h1 className="text-3xl text-GlobalPrimary font-normal leading-">
          Forgot Password
        </h1>

        <div className="text-GlobalDarkGrey flex flex-col gap-5">
          <div className="w-10/12 ">
            <p className="text-xl flex flex-col">
              <span className="md:text-nowrap">
                Please enter your email address below and we will
              </span>
              <span className="md:text-nowrap">
                send you a verification code to login.
              </span>
            </p>
          </div>
          <div>
            <label className="text-lg ml-1" htmlFor="">
              Email ID
            </label>
            <div className="border w-96 max-w-11/12 h-10 bg-white border-[#CBD5E1] rounded-md">
              <input
                className="outline-none h-full w-11/12 px-2"
                placeholder="EmailID@scivision.com"
                type="email"
                {...register("email", {
                  required: "Email Id is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                autoComplete="off"
                onMouseDown={() => clearErrors("email")}
                onKeyDown={handelPressEnter}
              />
              <img src="" alt="" />
            </div>
            <p className="text-red-400 text-sm ml-1 h-2 mt-2">
              {errors.email ? errors.email.message : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="border bg-GlobalPrimary w-96 text-white text-xl h-12 rounded-full cursor-pointer flex items-center justify-center  "
          >
            {isLoading?<SmallSpinner/>:"Submit"}
          </button>
          <p className="flex text-lg text-GlobalDarkGrey justify-around gap-2 px-2">
            <span className="font-light">Forgot password?</span>
            <span className="font-medium underline cursor-pointer">
              Get Verification email
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordEmailSubmission;
