import knex from "knex";
import knexfile from "../knexfile.js";
const db = knex(knexfile.development);
import "dotenv/config";
import bcrypt from "bcrypt";

export const deleteProfile = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required", success: false });
  }

  try {
    const user = await db("users").where({ email }).first();

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    await db("users").where({ email }).del();

    return res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
