import bcrypt from 'bcryptjs';
import User from '../../models/user/userModal.js';
import { badRequest, success, internalServerError } from '../../helper/apiResponse.js';
import { createToken } from '../../helper/utils.js';

export const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return badRequest(res, 'User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return success(res, 'User created successfully', {
      _id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (!isUserExist)
      return badRequest(res, "User not found or deleted");

    const isPassCorrect = await bcrypt.compare(password, isUserExist.password);
    if (!isPassCorrect)
      return badRequest(res, "Wrong Credentials");

    const token = await createToken(isUserExist._id);
    res.header("Authorization", `Bearer ${token}`);

    const data = {
      _id: isUserExist._id,
      name: isUserExist.name,
      email: isUserExist.email,
      token,
    };

    return success(res, "Login Successfully", data);

  } catch (error) {
    return internalServerError(res, error);
  }
};
