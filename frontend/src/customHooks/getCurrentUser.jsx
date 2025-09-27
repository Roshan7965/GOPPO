import { useEffect } from "react";
import { backendUrl } from "../main.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import axios from "axios";

const getCurrentUser = async () => {
  let dispatch = useDispatch();
  let { userData } = useSelector(state => state.user);
  console.log(userData);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let res = await axios.get(`${backendUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (!userData) {
      fetchUser();
    }
  }, [userData]);
};

export default getCurrentUser;
