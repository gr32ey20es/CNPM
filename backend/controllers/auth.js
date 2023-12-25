import db from "../db.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users RIGHT JOIN roles ON roles."RoleId" = users."RoleId" WHERE "Email" = $1';
    const result = await db.query(query, [email]);

    const data = result.rows;
    console.log(data);
    if (data.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = data[0];
    // Check password
    if (password !== user.Password) {
      return res.status(400).json({ message: "Wrong username or password!" });
    }

    const token = jwt.sign({ id: user.RoleId }, "jwtkey");
    const { password: _, ...userData } = user; // Use destructuring to exclude the "password" property

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};