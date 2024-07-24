import knex from "knex";
import knexfile from "../knexfile.js";
import bcrypt from "bcrypt";
const db = knex(knexfile.development);
import jtw from "jsonwebtoken";
import "dotenv/config";

export const loginUserView = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Bad request body.",
    });
  }

  try {
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid Login",
        success: false,
      });
    }

    const SECRET_KEY = process.env.SECRET_KEY;

    const expiresIn = rememberMe ? "7d" : "12h";
    const token = jtw.sign(
      {
        id: user.id,
        email: user.email,
      },
      SECRET_KEY,
      { expiresIn },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({
      success: true,
      token,
      message: rememberMe ? "Logged in for 7d" : "Logged in for 12h",
      email: user.email,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const decodeView = (req, res) => {
  return res.status(200).json({
    decoded: req.user.email,
    success: true,
  });
};
