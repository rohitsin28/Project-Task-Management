import express from "express";
import authRoute from "./auth/authRoute.js";
import projectRoute from "./project/projectRoute.js";
import taskRoute from "./task/taskRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/project", projectRoute);
router.use("/task", taskRoute);

router.use((req, res) => {
  console.warn(
    `404 Page Not found. ${req.url} ${req.method} ${
      req.headers["user-agent"]
    } ${JSON.stringify(req.body || {})}`
  );

  return res.status(404).json({
    success: false,
    msg: "404 Not found",
  });
});

export default router;