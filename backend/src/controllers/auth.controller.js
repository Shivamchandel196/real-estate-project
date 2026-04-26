import User from "../Model/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

// SIGN UP
export const signup = async (
  req,
  res,
  next
) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    if (
      !username ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const newUser =
      await User.create({
        username,
        email,
        password:
          hashedPassword,
        avatar:
          "/default_profile.png",
      });

    newUser.password =
      undefined;

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    next(
      errorHandler(
        500,
        error.message
      )
    );
  }
};

// SIGN IN
export const signin = async (
  req,
  res,
  next
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const validUser =
      await User.findOne({
        email,
      });

    if (!validUser) {
      return next(
        errorHandler(
          404,
          "User not found"
        )
      );
    }

    const validPassword =
      bcrypt.compareSync(
        password,
        validUser.password
      );

    if (!validPassword) {
      return next(
        errorHandler(
          401,
          "Invalid credentials"
        )
      );
    }

    const token =
      jwt.sign(
        {
          id:
            validUser._id,
        },
        process.env
          .JWT_SECRET
      );

    const {
      password: pass,
      ...rest
    } = validUser._doc;

    res
      .status(200)
      .cookie(
        "access_token",
        token,
        {
          httpOnly: true,

          // localhost fix
          secure:
            process.env
              .NODE_ENV ===
            "production",

          sameSite:
            process.env
              .NODE_ENV ===
            "production"
              ? "none"
              : "lax",

          maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,
        }
      )
      .json({
        success: true,
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};

// GOOGLE AUTH
export const google = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findOne({
        email:
          req.body.email,
      });

    if (user) {
      const token =
        jwt.sign(
          {
            id:
              user._id,
          },
          process.env
            .JWT_SECRET
        );

      const {
        password: pass,
        ...rest
      } = user._doc;

      return res
        .status(200)
        .cookie(
          "access_token",
          token,
          {
            httpOnly: true,

            secure:
              process.env
                .NODE_ENV ===
              "production",

            sameSite:
              process.env
                .NODE_ENV ===
              "production"
                ? "none"
                : "lax",

            maxAge:
              7 *
              24 *
              60 *
              60 *
              1000,
          }
        )
        .json({
          success: true,
          user: rest,
        });
    }

    const generatedPassword =
      Math.random()
        .toString(36)
        .slice(-8) +
      Math.random()
        .toString(36)
        .slice(-8);

    const hashedPassword =
      bcrypt.hashSync(
        generatedPassword,
        10
      );

    const newUser =
      new User({
        username:
          req.body.name
            .split(" ")
            .join("")
            .toLowerCase() +
          Math.random()
            .toString(36)
            .slice(-4),

        email:
          req.body.email,

        password:
          hashedPassword,

        avatar:
          req.body.photo,
      });

    await newUser.save();

    const token =
      jwt.sign(
        {
          id:
            newUser._id,
        },
        process.env
          .JWT_SECRET
      );

    const {
      password: pass,
      ...rest
    } = newUser._doc;

    return res
      .status(200)
      .cookie(
        "access_token",
        token,
        {
          httpOnly: true,

          secure:
            process.env
              .NODE_ENV ===
            "production",

          sameSite:
            process.env
              .NODE_ENV ===
            "production"
              ? "none"
              : "lax",

          maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,
        }
      )
      .json({
        success: true,
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};

// SIGN OUT
export const signOut = async (
  req,
  res,
  next
) => {
  try {
    res.clearCookie(
      "access_token"
    );

    return res.status(200).json({
      success: true,
      message:
        "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};