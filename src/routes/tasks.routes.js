import express from "express";
import { getAllTasks, createTask } from "../controllers/task.controller.js";

const router = express.Router();

// GET /tasks
router.get("/", getAllTasks);
router.post("/", createTask);

export default router;
