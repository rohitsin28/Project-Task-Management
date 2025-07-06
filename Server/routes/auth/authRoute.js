import express from 'express';
import { userSignUp, userSignIn } from '../../controllers/auth/authController.js';

const router = express.Router();

router.post("/signUp", userSignUp);
router.post("/signIn" ,userSignIn);

export default router;