import express from "express";
import { getAllTasks } from "../controllers/task.controller.js";

const router = express.Router();

// GET /tasks
router.get("/", getAllTasks);

export default router;
