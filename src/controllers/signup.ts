import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        alert: {
          title: "Validation Error",
          message: errors.array()[0].msg,
        },
      });
    }

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    await user.save();

    res.status(200).json({
      alert: {
        title: "Signup Successful",
        message: "Ai creat contul.",
      },
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
