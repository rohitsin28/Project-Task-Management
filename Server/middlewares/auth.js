import jwt from "jsonwebtoken";
import { badRequest, internalServerError } from "../helper/apiResponse.js";
import User from "../models/user/userModal.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Authorization header missing or invalid");
      return res
        .status(401)
        .json({ message: "Authorization token is missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
    req.user = decode;

    const isUserExist = await User.findOne({ _id: req.user.userId });
    if (!isUserExist || isUserExist.isDeleted) {
      return badRequest(res, "User not found or deleted");
    }

    next();
  } catch (error) {
    console.error("authenticateUser error: ", error.message);
    return internalServerError(res, error);
  }
};
