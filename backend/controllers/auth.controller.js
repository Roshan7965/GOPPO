import User from "../models/user.model.js";
import genToken from "./token.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const checkUserByUserName = await User.findOne({
      userName,
    });
    if (checkUserByUserName) {
      return res.status(400).json({
        message: "UserName already exit",
      });
    }
    const checkUserByEmail = await User.findOne({
      email,
    });
    if (checkUserByEmail) {
      return res.status(400).json({
        message: "email already exit",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "password length atleast 6 character",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashPassword,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: false, // make true when you deploy the project on render etc paltform
    });

    return res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `sign up error ${error}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does exit " });
    }

    const stroedHashPassword = user.password;

    const isMatch = await bcrypt.compare(password, stroedHashPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
    }
    const token = await genToken(user._id);

    user = await User.findById(user._id).select("-password"); // to remove password 

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: false, // make true when you deploy the project on render etc paltform
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ message: `login is failed ${error}` });
  }
};

export const logout = async (req,res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout failed ${error}` });
  }
};
