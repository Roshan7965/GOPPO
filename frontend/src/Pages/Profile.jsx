import React, { useRef, useState } from "react";
import { assets } from "../assets/assets.js";
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../main.jsx";
import { setUserData } from "../redux/userSlice.js";

const Profile = () => {
  let { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [name, setName] = useState(userData.name || "");
  let [frontendImage, setFrontendImage] = useState(userData.image || assets.dp);
  let [backendImage, setBackendImage] = useState(null);
  let image = useRef();
  const [saving, setSaving] = useState(false);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const res = await axios.put(`${backendUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });
      setSaving(false);
      dispatch(setUserData(res.data));
    } catch (error) {
      setSaving(false);
      console.log(`profile error ${error}`);
    }
  };

  return (
    <div
      className="w-full h-[100vh]  bg-slate-200 flex flex-col 
    items-center justify-center gap-[10px] "
    >
      <div className="fixed top-[20px] left-[20px]">
        <IoIosArrowRoundBack
          className="w-[40px] h-[40px] text-gray-600 cursor-pointer "
          onClick={() => navigate("/home")}
        />
      </div>
      <div
        className="bg-white rounded-full border-4 border-primary
        shadow-gray-400 shadow-lg relative"
      >
        <div
          className="w-[150px] h-[150px] rounded-full overflow-hidden flex items-center justify-center"
          onClick={() => image.current.click()}
        >
          <img src={frontendImage} alt="dp image" className="h-[100%] " />
        </div>
        <IoCameraOutline
          className="absolute  bottom-3 right-3 text-gray-700  w-[36px] h-[36px]
        bg-primary rounded-full p-2  cursor-pointer"
        />
      </div>
      <form
        action=""
        className="w-[95%] max-w-[450px] flex flex-col items-center justify-center gap-[20px]"
        onSubmit={handleProfile}
      >
        <input
          type="file"
          accept="image/*"
          hidden
          ref={image}
          onChange={handleImage}
        />

        <input
          type="text"
          placeholder="Enter your name"
          className="w-[90%] h-[40px] outline-none border-2 border-primary
          px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200
          shadow-lg text-gray-400 text-[19px]"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          readOnly
          className="w-[90%] h-[40px] outline-none border-2 border-primary
        px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200
        shadow-lg text-gray-400 text-[19px]"
          value={userData?.userName}
        />
        <input
          type="email"
          readOnly
          className="w-[90%] h-[40px] outline-none border-2 border-primary
        px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200
        shadow-lg text-gray-400 text-[19px]"
          value={userData?.email}
        />

        <button
          className="px-[20px] py-[10px] bg-primary rounded-2xl shadow-lg cursor-pointer
        shadow-gray-400 text-[20px] sm:w-[200px] w-[150px] mt-[20px] font-semibold hover:shadow-inner"
          disabled={saving}
        >
          {saving ? "Saving...." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
