import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const cookieOptions = {  //cookie is small piece of data,browser stores n sends back on every request.We store the login token in it.
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 1000, // 1 hour
};

const makeToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const registerController = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success)
      return res.status(422).json({
        message: "Validation failed",
        errors: result.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });

    const data = result.data;

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser)
      return res.status(409).json({ message: "User already registered" });

    const password = await bcrypt.hash(data.password, 12);
    const newUser = await User.create({ ...data, password, role: "patient" });

    res.cookie("token", makeToken(newUser), cookieOptions);

    return res.status(201).json({
      message: "User registered successfully",
      user: publicUser(newUser),
    });
  } catch (error) {
    console.log("error in registration", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success)
      return res.status(422).json({ message: "Email and password required" });

    const { email, password } = result.data;

    const user = await User.findOne({ email }).select("+password");
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!isMatch || !user.isActive)
      return res.status(401).json({ message: "Invalid credentials" });

    res.cookie("token", makeToken(user), cookieOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      user: publicUser(user),
    });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("token", cookieOptions);
  return res.status(200).json({ message: "Logged out" });
};

export const meController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isActive)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user: publicUser(user) });
  } catch (error) {
    console.log("error in me", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};