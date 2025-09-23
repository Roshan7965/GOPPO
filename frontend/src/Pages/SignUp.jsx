import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../main";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    if (!userName || !email || !password) {
      setErr("All fields are required");
      return; // stop execution
    }

    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${backendUrl}/api/auth/signup`,
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setErr("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error?.response?.data.message);
    }
  };

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

        <form
          className="w-full flex flex-col items-center justify-center gap-[20px] text-gray-700"
          onSubmit={handleSignUp}
        >
          <input
            type="text"
            placeholder="username"
            className="w-[90%] h-[40px] border-2 border-[#20c7ff]
                   shadow-gray-200 shadow-lg px-[10px] py-[10px] rounded-lg outline-none"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="email"
            placeholder="email"
            className="w-[90%] h-[40px] border-2 border-[#20c7ff]
                   shadow-gray-200 shadow-lg px-[10px] py-[10px] rounded-lg outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="w-[90%] h-[40px] overflow-hidden relative flex ">
            <input
              type={showPassword ? `${"text"}` : `${"password"}`}
              placeholder="password"
              className="w-full h-full  border-2 border-[#20c7ff]
            shadow-gray-200 shadow-lg px-[10px] py-[10px] rounded-lg outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <p
              className="absolute top-[8px]  right-[10px] text-[#20c7ff] font-semibold cursor-pointer "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? `Hidden` : `Show`}
            </p>
          </div>

          {err && <p className="text-red-500">{"*" + err}</p>}

          <button
            className="w-full max-w-[200px] h-[40px] mt-[10px] px-[10px] 
            py-[10x] bg-[#20c7ff] text-black rounded-lg
            shadow-gray-400 shadow-lg hover:shadow-inner cursor-pointer"
            disabled={loading}
          >
            {" "}
            {loading ? "Loading...." : "Sign Up"}
          </button>

          <span>
            Already have an account ?{" "}
            <Link to={"/login"}>
              <span className="text-[#20c7ff]">
                {loading ? "Loading...." : "Login"}
              </span>
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
