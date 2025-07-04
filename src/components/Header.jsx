import mainIcon from "../assets/images/main_icon_white.svg";
import alert from "../assets/images/alert.svg";
import files from "../assets/images/files.svg";
import profile from "../assets/images/profile.svg";
import question_mark from "../assets/images/question_mark.svg";
import ring_round from "../assets/images/ring_round.svg";
import time_round from "../assets/images/time_round.svg";
import logout_round from "../assets/images/logout_round.svg";
import letter_round from "../assets/images/letter_round.svg";
import home_round from "../assets/images/home_round.svg";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../zustand/userStore";
function Header({ clx }) {
  const { setUserdata, resetUserdata } = useUserData();
  const navigate = useNavigate();
  return (
    <div
      className={
        "row-span-1 bg-GlobalPrimary flex justify-between border px-10  " +
        clx
      }
    >
      <div
        className="h-full xl:w-3/12  flex justify-start items-center cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="w-fit h-6" src={mainIcon} alt="" />
      </div>
      <div className="h-full w-4/12 xl:w-2/9 2xl:w-2/12 flex justify-between">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="w-8 xl:w-10 cursor-pointer"
          src={home_round}
          alt=""
        />
        <img
          onClick={() => {
            navigate("/modelsregistrylist");
          }}
          className="w-8 xl:w-10 cursor-pointer"
          src={letter_round}
          alt=""
        />
        <img
          className="w-8 xl:w-10 cursor-pointer"
          onClick={() => {
            navigate("/modelshistory");
          }}
          src={time_round}
          alt=""
        />
        <img
          className="w-8 xl:w-10 cursor-not-allowed"
          src={ring_round}
          alt=""
        />
        <img
          onClick={() => {
            resetUserdata();
            navigate("/login");
          }}
          className="w-8 xl:w-10 cursor-pointer"
          src={logout_round}
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
