import knex from "knex";
import knexfile from "../knexfile.js";
import bcrypt from "bcrypt";
const db = knex(knexfile.development);

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Bad request body",
        success: false,
      });
    }

    if (password.length < 8)
      return res
        .status(400)
        .json({
          message: "Password can't be less than 8 characters",
          success: false,
        });

    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exist!",
        success: false,
        created_at: new Date(),
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db("users").insert({
      email,
      name,
      password: hashedPassword,
    });
    return res.status(200).json({ message: "Account created", success: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Failed to create an account!", success: false });
  }
};
