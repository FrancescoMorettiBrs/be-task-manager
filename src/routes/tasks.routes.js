import express from "express";
import { getAllTasks, createTask, deleteTask, updateTask, getTaskById } from "../controllers/task.controller.js";

const router = express.Router();

// GET /tasks
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;
