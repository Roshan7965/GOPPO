import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {

  const [showPassword,setShowPassword]=useState();
  return (
    <div className="w-full h-[100vh] bg-slate-200 flex  items-center justify-center">
      <div
        className="w-full max-w-[450px] h-[500px] bg-white rounded-lg shadow-lg shadow-gray-400
                        flex flex-col gap-[30px]"
      >
        <div
          className="w-full h-[150px] bg-[#20c7ff] rounded-b-[20%] 
            shadow-lg shadow-gray-400 flex items-center justify-center"
        >
          <h1 className="text-[30px] text-gray-600 text-bold">
            Welcome to <span className="text-white">Goppo</span>
          </h1>
        </div>

        <form className="w-full flex flex-col items-center justify-center gap-[20px] text-gray-700">
          <input
            type="text"
            placeholder="username"
            className="w-[90%] h-[40px] border-2 border-[#20c7ff]
                   shadow-gray-200 shadow-lg px-[10px] py-[10px] rounded-lg outline-none"
          />
          <input
            type="email"
            placeholder="email"
            className="w-[90%] h-[40px] border-2 border-[#20c7ff]
                   shadow-gray-200 shadow-lg px-[10px] py-[10px] rounded-lg outline-none"
          />

          <div className="w-[90%] h-[40px] overflow-hidden relative flex ">
            <input
            type={showPassword?`${"text"}`:`${"password"}`}
            placeholder="password"
            className="w-full h-full  border-2 border-[#20c7ff]
            shadow-gray-200 shadow-lg px-[10px] py-[10px] rounded-lg outline-none"
          /> 

           <p className="absolute top-[8px]  right-[10px] text-[#20c7ff] font-semibold cursor-pointer " onClick={ ()=> setShowPassword(!showPassword)}>{showPassword?`Hidden`:`Show`}</p>

          </div>
          

          <button
            className="w-full max-w-[200px] h-[40px] mt-[10px] px-[10px] 
            py-[10x] bg-[#20c7ff] text-black rounded-lg
            shadow-gray-400 shadow-lg hover:shadow-inner cursor-pointer"
          >
            {" "}
            Sign Up
          </button>

          <span>
            Already have an account ?{" "}
            <Link to={"/login"}>
              <span className="text-[#20c7ff]">Login</span>
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
