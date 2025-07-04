import { useRef } from "react";
import handimage from "../assets/images/handimage.svg";
import mainIcon from "../assets/images/main_icon.svg";
import { useState, useEffect } from "react";
import visibility_off from "../assets/images/visibility_off.svg";
import AxiosInstance from "../axios/AxiosInstance";
import ForgotPasswordEmailSubmission from "../components/ForgotPasswordEmailSubmission";
import ForgetPasswordOTP from "../components/ForgetPasswordOTP";
function ForgotPasswordPage() {
  const [emailId, setEmailId] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);

  return (
    <div
      className="w-full bg-GlobalBg flex h-[100dvh]
    "
    >
      {/* image  */}
      <div className="hidden lg:block lg:w-7/12 xl:w-7/12 2xl:w-6/12 relative">
        <img
          className="w-full aspect-square absolute bottom-0"
          src={handimage}
          alt=""
        />
      </div>
      {/* content  */}
      <div className="w-full lg:w-5/12  xl:w-5/12 2xl:w-6/12 h-full flex flex-col justify-center items-center">
        {showOtpSection ? (
          <ForgetPasswordOTP
            setShowOtpSection={setShowOtpSection}
            email={emailId}
          />
        ) : (
          <ForgotPasswordEmailSubmission
            setShowOtpSection={setShowOtpSection}
            setEmailId={setEmailId}
          />
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
