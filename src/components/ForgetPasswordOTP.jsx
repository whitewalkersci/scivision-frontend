import React from "react";
import mainIcon from "../assets/images/main_icon.svg";
import visibility_off from "../assets/images/visibility_off.svg";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AxiosInstance from "../axios/AxiosInstance";
import { useNavigate } from "react-router-dom";

const ForgetPasswordOTP = ({ setShowOtpSection, email }) => {
  const {
    register,
    trigger,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [IsPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const ClearOtpErrors = Array.from({ length: 6 }, (_, i) => `otp${i}`);
  const otpFields = Array.from({ length: 6 }, (_, i) => `otp${i}`);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      setValue(`otp${index}`, value); // update RHF value
      clearErrors(`otp${index}`);
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      setValue(`otp${index}`, ""); // force RHF to update cleared value
      e.target.value = ""; // clear the visual value
    }
  };

  const handleKeyDown = (e, index) => {
    const currentInput = inputsRef.current[index];
    if (e.key === "Backspace") {
      if (currentInput.value === "") {
        if (index > 0) {
          inputsRef.current[index - 1].focus();
        }
      } else {
        e.preventDefault();
        currentInput.value = "";
        setValue(`otp${index}`, "");
      }
    }
  };

  const onSubmit = async (data) => {
    const isValid = await trigger(otpFields);
    if (!isValid) {
      console.log("errors-------->");
      setError("otp1", "Please enter all 6 digit code");
      return; // Stop submission if validation fails return;
    }
    console.log("opt_data-------->", data);

    const otp = otpFields.map((field, index) => data[field]).join("");

    try {
      const response = await AxiosInstance.post("/forgot_password", {
        email: email,
        otp: otp,
        new_password: data.password,
      });
      if (parseInt(response.data.CODE) === 200) {
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.request.status) {
        if (parseInt(error.request.status) === 597) {
          setError("otp1", {
            type: "manual",
            message: "Invalid otp",
          });
        }
        if (parseInt(error.request.status) === 592) {
          setError("password", {
            type: "manual",
            message: "The password entered is incorrect. Please try again.",
          });
        }
      }
    }
  };

  return (
    <>
      <form
        className="w-full h-4/6 flex flex-col items-center lg:items-start gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img className="w-10/12 max-w-[500px] aspect-8/1" src={mainIcon} />
        <h1 className="text-3xl text-GlobalPrimary font-normal leading-">
          Enter Verification Code
        </h1>

        <div className="text-GlobalDarkGrey flex flex-col gap-4 w-3/6">
          <div className="w-10/12 ">
            <p className="text-lg font-light flex flex-col">
              <span className="md:text-nowrap">
                Please enter the code we sent to your email below.
              </span>
              <span className="md:text-nowrap">
                Be careful not to share the code with anyone else.
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-center lg:justify-start">
            <div className="container flex gap-3">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className={`transition-all duration-300 w-14 h-14 m-1 text-2xl text-center border border-GlobalPrimary rounded-sm outline-none ${
                    Object.keys(errors).some((key) => key.startsWith("otp"))
                      ? "border-red-400"
                      : ""
                  }`}
                  {...register(`otp${index}`, {
                    required: "Please enter all 6 digit code",
                    pattern: {
                      value: /^[0-9]$/,
                      message: "Only digits allowed",
                    },
                  })}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onMouseDown={() => clearErrors(ClearOtpErrors)}
                  autoComplete="off"
                />
              ))}
            </div>
            <span className="text-red-400 txt-sm h-4  ml-1 ">
              {Object.keys(errors).some((key) => key.startsWith("otp"))
                ? "Please enter valid 6 digit code"
                : ""}
            </span>
          </div>

          <p className="flex gap-1 ml-1">
            <span>Didn’t receive the code?</span>
            <span className="underline cursor-pointer">
              Resend Verification code
            </span>
          </p>

          <div className="ml-1">
            <label className="text-lg" htmlFor="">
              New Password
            </label>
            <div className="border w-full max-w-11/12 h-12 bg-white border-[#CBD5E1] rounded-md flex justify-center items-center px-1">
              <input
                // value={newPassword}
                // onChange={(e) => setNewPassword(e.target.value)}
                className="outline-none h-full w-11/12 px-2"
                type={IsPasswordVisible ? "text" : "password"}
                placeholder="Enter the New Password to login"
                {...register("password", {
                  required: "New Password is required",
                  minLength: {
                    value: 4,
                    message: "Minimum password length is 4 ",
                  },
                })}
                onMouseDown={() => clearErrors("password")}
                autoComplete="off"
              />
              <button onClick={() => setIsPasswordVisible((prev) => !prev)}>
                <img
                  className="h-4/6 aspect-square cursor-pointer"
                  src={visibility_off}
                  alt=""
                />
              </button>
            </div>
            <p className="text-red-400 text-sm mt-2 h-3 ">
              {errors.password ? errors.password.message : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[45%]  ml-1">
          <div className="w-full grid grid-cols-12  gap-2">
            <button
              type="button"
              onClick={() => setShowOtpSection(false)}
              className="border col-span-6 text-GlobalPrimary text-xl h-12 rounded-full cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="border col-span-6 bg-GlobalPrimary text-white text-xl h-12 rounded-full cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgetPasswordOTP;
