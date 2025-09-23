import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from "../main";

const Login = () => {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [showPassword,setShowPassword]=useState();
  const [loading,setloading]=useState(false);
  const [err,setErr]=useState("");

  const handleLogin=async(e)=>{
       setloading(true);
      e.preventDefault();
      try {
        let result= await axios.post(`${backendUrl}/api/auth/login`,{email,password});
        console.log(result);
        setloading(false);
        setErr("");
      } catch (error) {
        console.log(error); 
        setloading(false);
        setErr(error?.response?.data.message);
      }
  };



  return (
    <div className="w-full h-[100vh] bg-slate-200 flex  items-center justify-center">
      <div
        className="w-full max-w-[450px] h-[500px] bg-white rounded-lg shadow-lg shadow-gray-400
                        flex flex-col gap-[50px]"
      >
        <div
          className="w-full h-[150px] bg-[#20c7ff] rounded-b-[20%] 
            shadow-lg shadow-gray-400 flex items-center justify-center"
        >
          <h1 className="text-[30px] text-gray-600 text-bold">
            Welcome to <span className="text-white">Goppo</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="w-full flex flex-col items-center justify-center gap-[30px]">
          
          <input
            type="email"
            placeholder="email"
            className="w-[90%] h-[40px] border-2 border-[#20c7ff]
                   shadow-gray-200 shadow-lg px-[10px] py-[10px] rounded-lg outline-none"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          />

        
          <div className="w-[90%] h-[40px] overflow-hidden relative flex ">
            <input
            type={showPassword?`${"text"}`:`${"password"}`}
            placeholder="password"
            className="w-full h-full  border-2 border-[#20c7ff]
            shadow-gray-200 shadow-lg px-[10px] py-[10px] rounded-lg outline-none"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          /> 

           <p className="absolute top-[8px]  right-[10px] text-[#20c7ff] font-semibold cursor-pointer " onClick={ ()=> setShowPassword(!showPassword)}>{showPassword?`Hidden`:`Show`}</p>

          </div>
         {err && <p className="text-red-500">{"*"+err }</p>}
          <button
            className="w-full max-w-[200px]  h-[40px]  px-[10px] 
            py-[10x] bg-[#20c7ff] text-black rounded-lg shadow-gray-400 shadow-lg
            hover:shadow-inner cursor-pointer" disabled={loading}
          >
            
            {loading?"Loading....":"Login"}
          </button>

          <span>
            want to create new account ?
            <Link to={'/signup'}><span className='text-[#20c7ff]'> Signup</span></Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
