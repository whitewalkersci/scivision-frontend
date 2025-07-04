import { useState, useEffect } from "react";
import handimage from "../assets/images/handimage.svg";
import mainIcon from "../assets/images/main_icon.svg";
import visibility_off from "../assets/images/visibility_off.svg";
import AxiosInstance from "../axios/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserData } from "../zustand/userStore";
import { SmallSpinner } from "../components/Loader";
function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { setUserdata } = useUserData();
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const resp = await AxiosInstance.post("/login", {
        username: data.username,
        password: data.password,
      });
      // console.log("Login Request-------->", resp.data);
      if (resp.data.STATUS === "SUCCESS") {
        setUserdata({
          username: data.username,
          role: "admin",
          user_id: resp.data.USERID,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      if (error.request.status) {
        if (parseInt(error.request.status) === 591) {
          setError("username", {
            type: "manual",
            message: "The username entered is incorrect. Please try again.",
          });
        }
        if (parseInt(error.request.status) === 592) {
          setError("password", {
            type: "manual",
            message: "The password entered is incorrect. Please try again.",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handelPressEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit);
    }
  };

  return (
    <div className="w-full bg-GlobalBg flex h-[100dvh]">
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="w-full h-4/6 flex flex-col items-center lg:items-start gap-10"
        >
          {/* main icon  */}
          <img className="w-10/12 max-w-[500px] aspect-8/1" src={mainIcon} />
          <h1 className="text-3xl text-GlobalPrimary font-normal leading-">
            Login
          </h1>
          {/* username and password div  */}
          <div className="text-GlobalDarkGrey flex flex-col gap-4">
            <div>
              <label className="text-lg ml-1" htmlFor="">
                Username
              </label>
              <div className="border w-[25rem] max-w-11/12 h-10 bg-white border-[#CBD5E1] rounded-md px-1">
                <input
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
                  // onClick={() => {
                  //   setLoginResponse("");
                  // }}
                  id="username"
                  className="outline-none h-full w-full px-2"
                  placeholder="Username123"
                  autoComplete="email"
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 4,
                      message: "Username is required",
                    },
                  })}
                  onMouseDown={() => clearErrors("username")}
                  onKeyDown={handelPressEnter}
                />
              </div>
              <p className="text-red-600 text-sm h-4 pt-2 ml-2">
                {errors.username ? errors.username.message : ""}
              </p>
            </div>

            <div>
              <label className="text-lg ml-1" htmlFor="">
                Password
              </label>
              <div className="border w-[24rem] max-w-11/12 h-10 bg-white border-[#CBD5E1] rounded-md flex justify-center items-center px-1">
                <input
                  className="outline-none h-full w-11/12 px-2 "
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  // onClick={() => {
                  //   setLoginResponse("");
                  // }}
                  autoComplete="new-password"
                  placeholder="**************"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  onMouseDown={() => clearErrors("password")}
                  onKeyDown={handelPressEnter}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <img className="h-4/6" src={visibility_off} alt="" />
                </button>
              </div>
            </div>
            <p className="text-red-600 text-sm h-2 ml-2">
              {errors.password ? errors.password.message : ""}
            </p>
          </div>

          {/* login button div  */}
          <div className="flex flex-col gap-2 ">
            <button
              type="submit"
              className="border bg-GlobalPrimary w-full text-white text-xl h-12 rounded-full cursor-pointer flex items-center justify-center"
            >
              {isLoading ? <SmallSpinner /> : "Login"}
            </button>
            <p className="flex text-lg text-GlobalDarkGrey justify-around gap-2 px-2">
              <span className="font-light">Forgot password?</span>
              <span
                onClick={() => {
                  navigate("/forgotpassword");
                }}
                className="font-medium underline cursor-pointer"
              >
                Get Verification email
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
