import express from 'express';
import { authenticateUser } from '../../middlewares/auth.js';
import { createProject, deleteProject, getProject, updateProject } from '../../controllers/project/projectController.js';

const router = express.Router();

router.post("/create", authenticateUser, createProject);
router.get("/get/:id", authenticateUser, getProject);
router.get("/getAll", authenticateUser, getProject);
router.patch("/update/:id", authenticateUser, updateProject);
router.delete("/delete/:id", authenticateUser, deleteProject);


export default router;